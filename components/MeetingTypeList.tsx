'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, descending, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import { title } from 'process'

const MeetingTypeList = () => {
  const router = useRouter();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  });
  const [callDetails, setcallDetails] = useState<Call>();

  const [meetingState, setmeetingState] = useState<
    'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
if(!values.dateTime){
  toast("Please select a date and time")
}

      if (!values.dateTime) {
        toast.error("Please select a date and time");
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call');

      const startAt = values.dateTime.toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: { description }
        }
      });

      router.push(`/meeting/${id}`);
      toast("Meeting Created")
    } catch (error) {
      console.error(error);
      toast("Failed to create meeting");
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/plus.png"
        title="New Meeting"
        description="Start an Instant meeting"
        handleClick={() => setmeetingState('isInstantMeeting')}
        className="bg-orange"
      />
      <HomeCard
        img="/icons/calendar.png"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setmeetingState('isScheduleMeeting')}
        className="bg-blue1"
      />
      <HomeCard
        img="/icons/recording.png"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => setmeetingState('isJoinMeeting')}
        className="bg-purple"
      />
      <HomeCard
        img="/icons/user.png"
        title="Join Meeting"
        description="Via invitation Link"
        handleClick={() => setmeetingState('isJoinMeeting')}
        className="bg-yellow"
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setmeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        buttonIcon="/icons/plus.png"
      />
    </section>
  );
};

export default MeetingTypeList;