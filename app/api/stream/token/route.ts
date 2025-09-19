import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated using Clerk auth() helper
    const { userId: authUserId, sessionId } = await auth();
    // Debug log for authenticated user ID
    console.log('[token] Authenticated userId:', authUserId, 'sessionId:', sessionId);
    
    if (!authUserId) {
      return NextResponse.json({ error: 'Unauthorized - No authenticated user found' }, { status: 401 });
    }

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Stream API keys are missing' }, { status: 500 });
    }

    // Create Stream client and generate token using the authenticated user ID
    const client = new StreamClient(apiKey, apiSecret);
    const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(authUserId, exp, issued);

    console.log('[token] Generated token:', token);
    return NextResponse.json({ token });
  } catch (error) {
    console.error('[token] Token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' }, 
      { status: 500 }
    );
  }
} 