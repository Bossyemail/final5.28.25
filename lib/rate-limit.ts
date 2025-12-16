// Rate limiting utility to prevent abuse
import fs from 'fs';
import path from 'path';

const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', 'rate-limits.json');

interface RateLimitEntry {
  userId: string;
  endpoint: string;
  count: number;
  resetAt: number;
  lastRequest: number;
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readRateLimits(): Record<string, RateLimitEntry> {
  ensureDataDir();
  if (!fs.existsSync(RATE_LIMIT_FILE)) {
    return {};
  }
  try {
    const data = fs.readFileSync(RATE_LIMIT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function writeRateLimits(limits: Record<string, RateLimitEntry>) {
  ensureDataDir();
  try {
    fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2));
  } catch (error) {
    console.error('Error writing rate limits:', error);
  }
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // Time window in milliseconds
}

// Default rate limits
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/generate-email': {
    maxRequests: 100, // 100 emails per hour
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  '/api/generate-email-stream': {
    maxRequests: 100, // 100 emails per hour
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  '/api/analytics/track': {
    maxRequests: 1000, // 1000 events per hour
    windowMs: 60 * 60 * 1000, // 1 hour
  },
};

export function checkRateLimit(
  userId: string,
  endpoint: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const limits = readRateLimits();
  const key = `${userId}:${endpoint}`;
  const now = Date.now();
  
  let entry = limits[key];
  
  // Reset if window has passed
  if (!entry || entry.resetAt < now) {
    entry = {
      userId,
      endpoint,
      count: 0,
      resetAt: now + config.windowMs,
      lastRequest: now,
    };
  }
  
  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }
  
  // Increment count
  entry.count += 1;
  entry.lastRequest = now;
  limits[key] = entry;
  
  // Clean up old entries (older than 24 hours)
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  Object.keys(limits).forEach(k => {
    if (limits[k].resetAt < oneDayAgo) {
      delete limits[k];
    }
  });
  
  writeRateLimits(limits);
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

// Check for suspicious activity patterns
export function detectAbuse(userId: string, endpoint: string): boolean {
  const limits = readRateLimits();
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  
  // Check for rapid-fire requests (more than 10 in 1 minute)
  const recentRequests = Object.values(limits)
    .filter(entry => 
      entry.userId === userId && 
      entry.endpoint === endpoint &&
      entry.lastRequest > oneMinuteAgo
    );
  
  if (recentRequests.length > 10) {
    return true; // Potential abuse detected
  }
  
  return false;
}
