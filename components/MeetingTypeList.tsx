'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, descending, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'NPM RU
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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

      {! callDetails ?(
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setmeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
        buttonIcon="/icons/plus.png"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal 
            6leading-[22px] text-sky-2 ">Add a 
            description</label>
            <textarea className="border-none bg-dark-3 
            focus-visible: ring-0
            focus visible: ring offset"
            onChange={(e) =>{
              setvalues({...values, description: e.target.value})
            }}
            />

          </div >
          <div className='flex w-full flex-col gap-2.5'>
            <label className="text-base text-normal 
            6leading-[22px] text-sky-2 ">Select Date and
             Time</label>
             <ReactDatePicker
             selected={values.dateTime}
             onChange={(date) => setvalues({... values,
              dateTime:date! }) }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2
              focus:outline-none"

             />
          </div>
        </MeetingModal>
      ):(
           <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setmeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() =>{
          navigator.clipboard.writeText(meetingLink);
         toast({title: 'Link copied'})
        }}
        image='/icons/checked.svg'
        buttonIcon="/icons/copy.svg"
        buttonText='Copy Meeting Link'

        buttonIcon="/icons/plus.png"
      />
      )}

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