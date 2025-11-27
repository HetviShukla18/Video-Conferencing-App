"use client"

import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useMemo, useState } from 'react'
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useParams, useSearchParams } from 'next/navigation';

const Meeting = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();
  const [isSetupComplete, setisSetComplete] = useState(false);
  
  // Only call useGetCallById if client is available
  const { call, isCallLoading } = useGetCallById(client ? (id as string) : '');

  // Fallback call instance for personal/new rooms when query didn't find one yet
  const fallbackCall = useMemo(() => {
    if (!client || !id) return undefined;
    try {
      return client.call('default', id as string);
    } catch (e) {
      return undefined;
    }
  }, [client, id]);

  // Show loading while authentication or Stream client is loading
  if(!isLoaded || !client || isCallLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no existing call was found, proceed with a call reference so MeetingSetup can create it on join
  const effectiveCall = call ?? fallbackCall;
  if (!effectiveCall) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Unable to initialize meeting</h2>
          <p className="text-gray-600">Please try again or check your connection.</p>
        </div>
      </div>
    );
  }

  return (
    <main className='h-screen w-full'>
      <StreamCall call={effectiveCall}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setisSetComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
