import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    // Debug log for user IDs
    console.log('Request userId:', userId);
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Stream API keys are missing' }, { status: 500 });
    }

    // Verify the user is authenticated
    const { userId: authUserId } = await auth();
    // Debug log for authenticated user ID
    console.log('Authenticated userId:', authUserId);
    
    if (!authUserId || authUserId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Stream client and generate token
    const client = new StreamClient(apiKey, apiSecret);
    const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(userId, exp, issued);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' }, 
      { status: 500 }
    );
  }
} 