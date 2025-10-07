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

  const joinMeeting = () => {
    const url = values.link?.trim()
    if (!url) {
      toast.error('Please paste a meeting link')
      return
    }
    try {
      // Allow both absolute and relative meeting links
      router.push(url)
      setMeetingState(undefined)
    } catch (e) {
      toast.error('Invalid meeting link')
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
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push('/recording')}
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
              rows={3}
              placeholder="What's this meeting about?"
              className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 border border-dark2 focus:border-blue1 focus:outline-none focus:ring-2 focus:ring-blue1/20 transition-all duration-200 resize-none"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              value={values.description}
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
              minDate={new Date()}
              placeholderText="Select date & time"
              className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 border border-dark2 focus:border-blue1 focus:outline-none focus:ring-2 focus:ring-blue1/20 transition-all duration-200"
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

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoinMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join a Meeting"
        handleClick={joinMeeting}
        buttonIcon="/icons/user.png"
        buttonText="Join"
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base font-normal leading-[22px] text-sky-2">
            Paste invitation link
          </label>
          <input
            type="text"
            placeholder="https://your-domain/meeting/123..."
            className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 border border-dark2 focus:border-blue1 focus:outline-none focus:ring-2 focus:ring-blue1/20 transition-all duration-200"
            value={values.link}
            onChange={(e) => setValues({ ...values, link: e.target.value })}
          />
        </div>
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
