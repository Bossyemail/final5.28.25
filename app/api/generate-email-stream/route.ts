import { NextRequest } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';
import { checkRateLimit, detectAbuse, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
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
      return new Response('Start your 14-day free trial to generate unlimited emails. No charge during trial.', { status: 403 });
    }

    // Rate limiting (admins have higher limits)
    const endpoint = '/api/generate-email-stream';
    const rateLimitConfig = isAdmin 
      ? { maxRequests: 1000, windowMs: 24 * 60 * 60 * 1000 } // Admins: 1000/day
      : RATE_LIMITS[endpoint];
    
    const rateLimit = checkRateLimit(userId, endpoint, rateLimitConfig);
    
    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetAt);
      const resetTime = resetDate.toLocaleDateString() + ' at ' + resetDate.toLocaleTimeString();
      return new Response(
        `Daily limit reached. You've generated ${rateLimitConfig.maxRequests} emails today. Your limit resets on ${resetTime}.`,
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
      return new Response('Too many requests. Please slow down and try again in a few minutes.', { status: 429 });
    }

    // Check request size (limit to 10KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024) {
      return new Response('Request too large.', { status: 413 });
    }

    const body = await req.json();
    let { prompt, tone, recipient, sender } = body;

    // Input validation and sanitization
    if (!prompt || typeof prompt !== 'string') {
      return new Response('Invalid prompt.', { status: 400 });
    }

    // Limit prompt length to prevent abuse
    if (prompt.length > 2000) {
      return new Response('Prompt is too long. Please keep it under 2000 characters.', { status: 400 });
    }

    // Sanitize inputs
    prompt = prompt.trim().slice(0, 2000);
    tone = (tone && typeof tone === 'string') ? tone.trim().slice(0, 50) : 'professional';
    recipient = (recipient && typeof recipient === 'string') ? recipient.trim().slice(0, 100) : 'client';
    sender = (sender && typeof sender === 'string') ? sender.trim().slice(0, 200) : '';
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response('Missing OpenAI API key.', { status: 500 });
    }

    const systemPrompt = `You are BossyEmail, an AI assistant for real estate professionals. Write smart, punchy, and sometimes witty emails. Use the requested tone: ${tone}. The recipient is a ${recipient}. The sender is: ${sender}.`;

    const userPrompt = `Prompt: ${prompt}\n\nGenerate a relevant subject line and a full email body. The sender is: ${sender}. Return as JSON: { "subject": "...", "body": "..." }`;

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
        stream: true,
      }),
    });

    if (!response.ok) {
      return new Response('OpenAI API error.', { status: 500 });
    }

    // No need to track usage count - unlimited during trial and subscription

    // Create a readable stream that properly handles OpenAI streaming
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.error('No response body from OpenAI');
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process chunks that might contain multiple SSE events
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.substring(6);
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }
                try {
                  const json = JSON.parse(data);
                  const content = json.choices?.[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(new TextEncoder().encode(content));
                  }
                } catch (e) {
                  console.error('Failed to parse SSE data:', e);
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming read error:', error);
          controller.error(error);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-RateLimit-Limit': rateLimitConfig.maxRequests.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetAt.toString(),
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}
