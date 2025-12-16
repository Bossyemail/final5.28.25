import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's subscription status
    const user = await clerkClient.users.getUser(userId);
    const subscription = user.unsafeMetadata?.subscription as any;
    const isAdmin = user.publicMetadata?.isAdmin === true;

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

    // No need to track usage count - unlimited during trial and subscription

    return NextResponse.json(json);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
} 