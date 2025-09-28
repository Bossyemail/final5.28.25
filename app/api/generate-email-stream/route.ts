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

    // Create a readable stream
    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const pump = async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        };

        pump();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}
