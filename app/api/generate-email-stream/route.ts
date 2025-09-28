import { NextRequest } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get user's subscription status
    const user = await clerkClient.users.getUser(userId);
    const subscription = user.privateMetadata.subscription as any;
    const emailUsageCount = user.privateMetadata.emailUsageCount as number || 0;
    const isAdmin = user.publicMetadata?.isAdmin === true;

    // Admins bypass usage/subscription check
    if (!isAdmin && emailUsageCount >= 3 && (!subscription || subscription.status !== 'active')) {
      return new Response('You have reached your free email limit. Please subscribe to continue.', { status: 403 });
    }

    const { prompt, tone, recipient, sender } = await req.json();
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

    // Update usage count if user is not subscribed
    if (!subscription || subscription.status !== 'active') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          emailUsageCount: emailUsageCount + 1,
        },
      });
    }

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
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}
