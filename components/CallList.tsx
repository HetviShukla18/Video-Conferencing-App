// @its-nocheck
'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk';
import { Call } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import { Play } from 'next/font/google';
import { Loader } from 'lucide-react';


export const CallList = ({ type  }: {type: 'ended' |
     ' upcoming' | 'recordings '}) => {
      const { endedCalls, upcomingCalls, callrecordings,
        isLoading  } = useGetCalls();
        const router = useGetCalls();
        const [recordings, setRecordings] =
        useState<CallRecording[]>([])
        
        const {toast} = useToast();
         const getCalls = () => {
          switch (type) {
            case 'ended':
              return endedCalls;
            case 'recordings ':
              return recordings;
            case ' upcoming':
              return upcomingCalls;
            default:
              return [];
          }
        }
          const getNoCallsMessage = () => {
          switch (type) {
            case 'ended':
              return 'No Previous Calls';
            case 'recordings ':
              return 'No Recordings';
            case ' upcoming':
              return 'No Upcoming Calls';
            default:
              return ' ';
          }
        }
        useEffect(() => {
          const fetchRecordings = async () => {
            try {
              const callData = await Promise.all(callrecordings.
              map((meeting) => meeting.queryRecordings()))

              const recordings = callData
              .filter(call => call.recordings.length > 0)
              .flatMap(call => call.recordings)

              setRecordings(recordings);
              
            } catch (error) {
              toast({ title: 'Try again later'})
            }
            

          }
          if (type === 'recordings ') fetchRecordings();
        }, [type, callrecordings])



        const calls = getCalls();
        const noCallsMessage = getNoCallsMessage();

        if(isLoading) return <Loader />


  return (
    <div className="grid-cols-1 gap-5
    xl:grid-cols-2">
      {calls && calls.length > 0 ? calls.map((meeting:
      Call| CallRecording) => (
        <MeetingCard 
         key={(meeting as Call).id}
         title={(meeting as Call).state?.custom?.
          description?.substring(0, 26) || meeting?.
          filename?.substring(0, 20) || 'Personal Meeting'}
         
         date={meeting.state?.startsAt.toLocaleString
          () || meeting.start_time.toLocaleString()}
         icon={
          type=== 'ended'
          ? '/icons/previous.svg'
          : type === ' upcoming'
          ? '/icons/upcoming.svg'
          : '/icons/recording.svg'
         }
         isPreviousMeeting={type === 'ended'}
        buttonIcon1={
          type === 'recordings '
         ? '/icons/play.svg'
        : undefined
}
         buttonText={type === 'recordings ' ? 'Play' : 
          'start'}
         handleClick={type === 'recordings ' ? () =>
          router.push('${meeting.url}') : () => router.
          push('/meeting/${meeting.id')
         }
         link={
          type === 'recordings '
          ? meeting.url
          : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
}

         
        
         />

      )) :(
        <h1>{noCallsMessage}</h1>
      ) }

    </div>
  )
}

export default CallList