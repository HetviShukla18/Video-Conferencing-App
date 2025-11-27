"use client"

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface MeetingSetupProps {
  setIsSetupComplete: (value: boolean) => void;
}

const MeetingSetup: React.FC<MeetingSetupProps> = ({ setIsSetupComplete }) => {
  const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false)

  const call = useCall();

  if(!call) {
    throw new Error('usecall must be used within StreamCall component')
  }

  useEffect(() => {
    if(isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center
    justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input 
          type="checkbox"
          checked={isMicCamToggleOn}
          onChange={(e)=> setisMicCamToggleOn(e.target.checked)} />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5'
      onClick={async ()=>{
        try {
          await call.join({ create: true });
          setIsSetupComplete(true);
        } catch (err: any) {
          console.error('Failed to join call:', err);
          toast.error(err?.message || 'Failed to join the meeting');
        }
      }}>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup 