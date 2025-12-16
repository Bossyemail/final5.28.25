import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';
import { checkRateLimit, detectAbuse, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's subscription status
    const user = await clerkClient.users.getUser(userId);
    const subscription = user.unsafeMetadata?.subscription as any;
    const isAdmin = user.publicMetadata?.isAdmin === true || 
                    user.emailAddresses?.some(email => email.emailAddress === 'aylen@bossyemail.com') === true;

    // Check if user has active subscription or is in trial period
    const hasAccess = isAdmin || 
      (subscription && (subscription.status === 'active' || subscription.status === 'trialing'));

    // Users must have active subscription or be in trial to use the generator
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Start your 14-day free trial to generate unlimited emails. No charge during trial.' },
        { status: 403 }
      );
    }

    // Rate limiting (admins have higher limits)
    const endpoint = '/api/generate-email';
    const rateLimitConfig = isAdmin 
      ? { maxRequests: 500, windowMs: 60 * 60 * 1000 } // Admins: 500/hour
      : RATE_LIMITS[endpoint];
    
    const rateLimit = checkRateLimit(userId, endpoint, rateLimitConfig);
    
    if (!rateLimit.allowed) {
      const resetTime = new Date(rateLimit.resetAt).toLocaleTimeString();
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. You've reached the maximum of ${rateLimitConfig.maxRequests} emails per hour. Please try again after ${resetTime}.` 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitConfig.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
          }
        }
      );
    }

    // Abuse detection
    if (detectAbuse(userId, endpoint)) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down and try again in a few minutes.' },
        { status: 429 }
      );
    }

    // Check request size (limit to 10KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }

    const body = await req.json();
    const { prompt, tone, recipient, sender } = body;

    // Input validation and sanitization
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt.' }, { status: 400 });
    }

    // Limit prompt length to prevent abuse
    if (prompt.length > 2000) {
      return NextResponse.json({ error: 'Prompt is too long. Please keep it under 2000 characters.' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedPrompt = prompt.trim().slice(0, 2000);
    const sanitizedTone = (tone && typeof tone === 'string') ? tone.trim().slice(0, 50) : 'professional';
    const sanitizedRecipient = (recipient && typeof recipient === 'string') ? recipient.trim().slice(0, 100) : 'client';
    const sanitizedSender = (sender && typeof sender === 'string') ? sender.trim().slice(0, 200) : '';
    
    const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key.' }, { status: 500 });
  }

  const systemPrompt = `You are BossyEmail, an AI assistant for real estate professionals. Write smart, punchy, and sometimes witty emails. Use the requested tone: ${sanitizedTone}. The recipient is a ${sanitizedRecipient}. The sender is: ${sanitizedSender}.`;

  const userPrompt = `Prompt: ${sanitizedPrompt}\n\nGenerate a relevant subject line and a full email body. The sender is: ${sanitizedSender}. Return as JSON: { "subject": "...", "body": "..." }`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 400,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    return NextResponse.json({ error: 'OpenAI API error.' }, { status: 500 });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  // Log the raw content for debugging
  console.log("OpenAI raw content:", content);

  let json;
  try {
      json = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      return NextResponse.json({ error: 'Invalid response from OpenAI.' }, { status: 500 });
    }

    // No need to track usage count - unlimited during trial and subscription

    return NextResponse.json(json);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
} 