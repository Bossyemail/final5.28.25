import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's subscription status
    const user = await clerkClient.users.getUser(userId);
    const subscription = user.privateMetadata.subscription as any;
    const emailUsageCount = user.privateMetadata.emailUsageCount as number || 0;

    // Check if user has reached free limit and doesn't have an active subscription
    if (emailUsageCount >= 3 && (!subscription || subscription.status !== 'active')) {
      return NextResponse.json(
        { error: 'You have reached your free email limit. Please subscribe to continue.' },
        { status: 403 }
      );
    }

  const { prompt, tone, recipient, sender } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key.' }, { status: 500 });
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

    // Update usage count if user is not subscribed
    if (!subscription || subscription.status !== 'active') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          emailUsageCount: emailUsageCount + 1,
        },
      });
    }

    return NextResponse.json(json);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
} 