# Analytics Setup Guide

## Overview
Your BossyEmail app now has comprehensive analytics tracking for visits, sign-ups, log-ins, sales, and more. All data is stored securely and accessible through a beautiful admin dashboard.

## What's Tracked

### User Actions
- **Page Views**: Every page visit is tracked
- **Sign Ups**: Email, Google, Apple, Facebook sign-ups
- **Sign Ins**: All authentication methods
- **Trial Starts**: When users begin their 14-day trial
- **Email Generation**: Every email generated with length and tone
- **Email Copied**: When users copy emails to clipboard
- **Templates Used**: Template usage by category
- **Favorites Added**: When users favorite templates

### Business Metrics
- **Checkout Started**: When users click to subscribe
- **Checkout Completed**: Successful subscriptions
- **Checkout Canceled**: Abandoned checkouts
- **Revenue**: Tracked from Stripe (today, 7 days, 30 days, total)
- **Conversion Rate**: Checkout completion rate

## Accessing Analytics

### Admin Dashboard
1. Make sure your user account has `isAdmin: true` in Clerk's public metadata
2. Navigate to: `/admin/analytics`
3. View real-time stats, trends, and revenue data

### Setting Admin Access
In Clerk Dashboard:
1. Go to Users → Select your user
2. Edit Public Metadata
3. Add: `{ "isAdmin": true }`
4. Save

## Data Storage

- **Location**: `/data/analytics.json` (automatically created)
- **Format**: JSON array of events
- **Retention**: Last 100,000 events (auto-trimmed)
- **Privacy**: User IDs are stored but can be anonymized

## Google Analytics Integration

All events are also sent to Google Analytics (if configured):
- Set `NEXT_PUBLIC_GA_ID` in your `.env` file
- Events appear in GA4 dashboard
- Custom events are tracked with properties

## API Endpoints

### Track Event
```
POST /api/analytics/track
Body: { event, properties, userId, timestamp }
```

### Get Stats (Admin Only)
```
GET /api/analytics/stats
Returns: Overview, daily breakdown, revenue, events
```

## Adding New Tracking

To track a new event:

```typescript
import { analytics } from '@/lib/analytics'

// Track custom event
analytics.trackEvent('custom_event', {
  property1: 'value1',
  property2: 'value2'
})
```

## Revenue Tracking

Revenue is automatically pulled from Stripe:
- Real-time payment data
- Filtered by date ranges
- Includes all successful payments
- Shows in admin dashboard

## Daily Access

The analytics dashboard shows:
- **Today's Stats**: Real-time metrics
- **Yesterday Comparison**: Day-over-day changes
- **7-Day Trend**: Weekly performance
- **30-Day Overview**: Monthly insights
- **Revenue Breakdown**: By period
- **Daily Table**: Last 7 days detailed view

## Privacy & Security

- Analytics data is stored locally (file-based)
- Only admins can access the dashboard
- User IDs are stored but can be anonymized
- No sensitive data is logged
- GDPR-friendly (can be extended)

## Next Steps

1. **Set Admin Access**: Add `isAdmin: true` to your Clerk user
2. **Visit Dashboard**: Go to `/admin/analytics`
3. **Monitor Daily**: Check stats each morning
4. **Export Data**: (Coming soon) Export to CSV/JSON

## Troubleshooting

**Dashboard shows "No analytics data"**
- Check that events are being tracked (check browser console)
- Verify `/data/analytics.json` exists
- Ensure you have admin access

**Revenue not showing**
- Verify Stripe API key is set
- Check Stripe webhook is working
- Ensure payments are marked as "succeeded"

**Events not tracking**
- Check browser console for errors
- Verify `/api/analytics/track` endpoint is accessible
- Check network tab for failed requests
