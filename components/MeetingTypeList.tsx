'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import ReactDatePicker from 'react-datepicker'

import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined
  >()

  const { user } = useUser()
  const client = useStreamVideoClient()

  const createMeeting = async () => {
    if (!client || !user) return

    try {
      if (!values.dateTime) {
        toast.error('Please select a date and time')
        return
      }

      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if (!call) throw new Error('Failed to create call')

      const startAt = values.dateTime.toISOString()
      const description = values.description || 'Instant meeting'

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: { description },
        },
      })

      setCallDetails(call)
      router.push(`/meeting/${id}`)
      toast.success('Meeting Created')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create meeting')
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Cards */}
      <HomeCard
        img="/icons/plus.png"
        title="New Meeting"
        description="Start an Instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange"
      />
      <HomeCard
        img="/icons/calendar.png"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-blue1"
      />
      <HomeCard
        img="/icons/recording.png"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => setMeetingState('isJoinMeeting')}
        className="bg-purple"
      />
      <HomeCard
        img="/icons/user.png"
        title="Join Meeting"
        description="Via invitation Link"
        handleClick={() => setMeetingState('isJoinMeeting')}
        className="bg-yellow"
      />

      {/* Schedule Meeting Modal */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          buttonIcon="/icons/plus.png"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <textarea
              className="rounded bg-dark-3 p-2 focus-visible:ring-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date: Date | null) => {
                if (date) {
                  setValues({ ...values, dateTime: date })
                }
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast.success('Link copied')
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        buttonIcon="/icons/plus.png"
      />
    </section>
  )
}

export default MeetingTypeList
