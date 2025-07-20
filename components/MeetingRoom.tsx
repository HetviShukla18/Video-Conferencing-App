import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setshowParticipants] = useState(false)

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right" />

      default:
        break;
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className={cn('flex size-full items-center', showParticipants ? 'max-w-[calc(100%-300px)]' : 'max-w-[1000px]')}>
          <CallLayout />
        </div>
        {showParticipants && (
          <div className='h-[calc(100vh-86px)] ml-2 w-[300px]'>
            <CallParticipantsList onClose={() => setshowParticipants(false)} />
          </div>
        )}
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
        <CallControls />
        <DropdownMenu>

          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d]
          px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-dark1 bg-dark1 text-white'>
            {[
              { label: 'Grid', value: 'grid' },
              { label: 'Speaker Left', value: 'speaker-left' },
              { label: 'Speaker Right', value: 'speaker-right' }
            ].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => setlayout(item.value as CallLayoutType)}
                >
                  {item.label}
                </DropdownMenuItem>
                {index < 2 && <DropdownMenuSeparator className='border-dark1' />}
              </div>
            ))}
       </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setshowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d]
          px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  )
}

export default MeetingRoom