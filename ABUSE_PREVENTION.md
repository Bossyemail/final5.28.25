# Abuse Prevention & Security Measures

## Overview
Your BossyEmail app now has comprehensive protection against abuse, scraping, and excessive usage.

## Protection Measures

### 1. Rate Limiting
**Email Generation:**
- **Regular Users**: 200 emails per day (generous for legitimate use)
- **Admins**: 1,000 emails per day
- **Analytics Tracking**: 5,000 events per day

**How it works:**
- Tracks requests per user per endpoint
- Daily limits reset at midnight (24-hour rolling window)
- Returns HTTP 429 (Too Many Requests) when exceeded
- Includes helpful error messages with reset time
- Limits are designed to allow normal usage while preventing abuse

### 2. Abuse Detection
**Rapid-Fire Protection:**
- Detects more than 10 requests in 1 minute
- Automatically blocks suspicious activity
- Returns 429 error with clear message

### 3. Input Validation & Sanitization
**Prompt Limits:**
- Maximum 2,000 characters per prompt
- Automatic trimming and sanitization
- Type validation (prevents injection attacks)

**Request Size Limits:**
- Maximum 10KB per request
- Prevents large payload attacks
- Returns HTTP 413 (Payload Too Large)

### 4. Anti-Scraping Protection
**Bot Detection:**
- Blocks known scrapers/crawlers from API endpoints
- Allows legitimate bots (Googlebot, Bingbot) for SEO
- User-agent validation in middleware

**Robots.txt:**
- Blocks all bots from `/api/` endpoints
- Blocks bots from `/admin/` and `/dashboard/`
- Allows search engines on public pages only

### 5. Authentication Requirements
**All API Endpoints:**
- Require valid Clerk authentication
- User must be signed in
- Subscription/trial status checked

### 6. Subscription Gating
**Access Control:**
- Only active subscribers or trial users can generate emails
- Admins have unlimited access
- Clear error messages for unauthorized users

## Rate Limit Configuration

You can adjust limits in `/lib/rate-limit.ts`:

```typescript
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/generate-email': {
    maxRequests: 200,  // Change this number (emails per day)
    windowMs: 24 * 60 * 60 * 1000, // 24 hours (1 day)
  },
  // ...
};
```

## Monitoring Abuse

**Check Rate Limit Data:**
- File: `/data/rate-limits.json`
- Contains per-user request counts
- Auto-cleans entries older than 24 hours

**Analytics Dashboard:**
- View unusual patterns in `/admin/analytics`
- Monitor email generation spikes
- Track user behavior

## Error Messages

Users see friendly error messages:
- "Rate limit exceeded. You've reached the maximum of 100 emails per hour. Please try again after [time]."
- "Too many requests. Please slow down and try again in a few minutes."
- "Prompt is too long. Please keep it under 2000 characters."

## Admin Override

Admins (`aylen@bossyemail.com` or users with `isAdmin: true`):
- Higher rate limits (500/hour)
- Not subject to rapid-fire detection
- Can still be rate-limited if needed

## Additional Protections

1. **Request Logging**: All API requests logged with user ID, timestamp, duration
2. **Input Sanitization**: All user inputs trimmed and length-limited
3. **Type Validation**: Strict type checking prevents malformed requests
4. **Error Handling**: Graceful error responses prevent information leakage

## Future Enhancements

Consider adding:
- IP-based rate limiting (for unauthenticated requests)
- CAPTCHA for suspicious activity
- Email verification for new accounts
- Two-factor authentication for admins
- Database-backed rate limiting (for production scale)

## Testing

To test rate limiting:
1. Generate 100+ emails quickly
2. Should see rate limit error after 100th request
3. Wait 1 hour or adjust limits for testing

## Production Recommendations

For production, consider:
1. **Redis-based rate limiting** (instead of file-based)
2. **Cloudflare Rate Limiting** (additional layer)
3. **DDoS Protection** (via hosting provider)
4. **Monitoring Alerts** (for abuse patterns)
5. **Automatic Suspension** (for repeated abuse)
