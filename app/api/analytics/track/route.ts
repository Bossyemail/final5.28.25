import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import fs from 'fs';
import path from 'path';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';

// Simple file-based storage for analytics (in production, use a database)
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read analytics data
function readAnalytics() {
  ensureDataDir();
  if (!fs.existsSync(ANALYTICS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analytics:', error);
    return [];
  }
}

// Write analytics data
function writeAnalytics(data: any[]) {
  ensureDataDir();
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing analytics:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    
    // Rate limiting for analytics tracking
    if (userId) {
      const endpoint = '/api/analytics/track';
      const rateLimit = checkRateLimit(userId, endpoint, RATE_LIMITS[endpoint]);
      
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
    }

    // Validate event data
    if (!body.event || typeof body.event !== 'string') {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
    }

    // Limit properties size
    if (body.properties && typeof body.properties === 'object') {
      const propsStr = JSON.stringify(body.properties);
      if (propsStr.length > 5000) {
        return NextResponse.json({ error: 'Event properties too large' }, { status: 400 });
      }
    }
    
    const event = {
      ...body,
      userId: userId || 'anonymous',
      timestamp: body.timestamp || Date.now(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      hour: new Date().getHours(),
    };

    // Read existing analytics
    const analytics = readAnalytics();
    
    // Add new event
    analytics.push(event);
    
    // Keep only last 100,000 events (prevent file from growing too large)
    const trimmedAnalytics = analytics.slice(-100000);
    
    // Write back
    writeAnalytics(trimmedAnalytics);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
