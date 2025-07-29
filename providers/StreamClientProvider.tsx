"use client";
import { tokenProvider } from "@/actions/stream.action";
import { useUser } from "@clerk/nextjs";
import {
    StreamVideo,
    StreamVideoClient,
  } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  // Create a client-side token provider that uses the user from Clerk
  const createClientTokenProvider = (userId: string) => {
    return async () => {
      try {
        // Call the server action with the user ID
        const response = await fetch('/api/stream/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to get token');
        }

        const { token } = await response.json();
        return token;
      } catch (error) {
        console.error('Client token provider error:', error);
        throw error;
      }
    };
  };
  
const StreamVideoProvider = ( {children}: {children:ReactNode}) => {
    const [videoClient, setVideoClient]= useState<StreamVideoClient>();
    const [error, setError] = useState<string | null>(null);
    const {user , isLoaded}= useUser();

    useEffect(() => {
        // Reset error state
        setError(null);
        
        console.log('StreamVideoProvider useEffect triggered', {
            isLoaded,
            hasUser: !!user,
            userId: user?.id,
            hasApiKey: !!apiKey,
            clerkPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        });
        
        if (!isLoaded) {
            console.log('Clerk is still loading...');
            return;
        }
        
        if (!user) {
            console.log('No user found in StreamVideoProvider');
            setError('User not found');
            return;
        }
        
        if (!apiKey) {
            console.error('Stream API key is missing. Please check your environment variables.');
            setError('Stream API key is missing');
            return;
        }

        try {
            console.log('Creating Stream video client...', {
                userId: user.id,
                userName: user.username || user.id,
                hasImage: !!user.imageUrl
            });
            
            const client = new StreamVideoClient({
                apiKey,
                user: {
                    id: user.id,
                    name: user.username || user.id,
                    image: user.imageUrl,
                },
                tokenProvider: createClientTokenProvider(user.id),
            });

            console.log('Stream video client created successfully');
            setVideoClient(client);
        } catch (error) {
            console.error('Failed to create Stream video client:', error);
            setError(`Failed to create video client: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, [user, isLoaded]);

    // Show error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md">
                    <h2 className="text-xl font-semibold text-red-500 mb-2">Stream Provider Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="text-sm text-gray-500 space-y-2">
                        <p>Please check:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Environment variables are set correctly</li>
                            <li>You are signed in to the application</li>
                            <li>Clerk configuration is working</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // Show loading state
    if(!videoClient) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-600">Initializing Stream Video...</p>
                    {!isLoaded && <p className="text-sm text-gray-500">Loading authentication...</p>}
                </div>
            </div>
        );
    }

    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;