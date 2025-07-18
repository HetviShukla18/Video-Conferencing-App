"use client"

import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingRoom';

const Meeting = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setisSetComplete] = useState(false);

  return (
    <main className='h-screen w-full'>
      <StreamCall>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
