"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { PhoneOff, Loader2 } from 'lucide-react';

const EndCallButton = () => {
  const [isEnding, setIsEnding] = useState(false);
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const LocalParticipant = useLocalParticipant();

  const isMeetingOwner = LocalParticipant &&
    call?.state.createdBy && LocalParticipant.userId ===
    call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    try {
      setIsEnding(true);
      await call.endCall();
      router.push('/');
    } catch (error) {
      console.error('Error ending call:', error);
      setIsEnding(false);
    }
  };

  return (
    <button
      onClick={handleEndCall}
      disabled={isEnding}
      className="group flex items-center gap-2 px-4 py-2 bg-[#ea4335] hover:bg-[#d33426] disabled:bg-[#ea4335]/50 rounded-lg transition-all duration-200 font-medium text-sm text-white disabled:cursor-not-allowed"
    >
      {isEnding ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Ending...</span>
        </>
      ) : (
        <>
          <PhoneOff size={18} />
          <span>End call for everyone</span>
        </>
      )}
    </button>
  )
}

export default EndCallButton