<<<<<<< HEAD
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
=======
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCall } from '@stream-io/video-react-sdk'
>>>>>>> ab6eac1e5c5ab385e9460daa1ed39baebde6d0b2
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
<<<<<<< HEAD
import { LayoutList, Loader, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
=======
import { LayoutList, Loader, Users, Grid3x3, Maximize2, MonitorUp, ChevronUp } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
>>>>>>> ab6eac1e5c5ab385e9460daa1ed39baebde6d0b2
import EndCallButton from './EndCallButton'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
<<<<<<< HEAD
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setshowParticipants] = useState(false)
  const Router = useRouter();
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return
  <Loader/>
=======
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)
  const call = useCall();
  const callingState = call?.state.callingState;
>>>>>>> ab6eac1e5c5ab385e9460daa1ed39baebde6d0b2

  if(callingState !== CallingState.JOINED) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1c1c1c]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader className="h-10 w-10 animate-spin text-blue-500" />
            <div className="absolute inset-0 h-10 w-10 animate-ping rounded-full bg-blue-500/20" />
          </div>
          <p className="text-base font-medium text-gray-300">Joining meeting...</p>
        </div>
      </div>
    );
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }

  const layoutOptions = [
    { label: 'Gallery View', value: 'grid' as CallLayoutType, icon: Grid3x3 },
    { label: 'Speaker View', value: 'speaker-left' as CallLayoutType, icon: Maximize2 },
    { label: 'Sidebar View', value: 'speaker-right' as CallLayoutType, icon: MonitorUp }
  ]

  return (
    <section className='relative h-screen w-full overflow-hidden bg-[#1c1c1c]'>
      {/* Main Content Area */}
      <div className='relative flex size-full items-center justify-center'>
        <div className={cn(
          'flex size-full items-center justify-center transition-all duration-300',
          showParticipants ? 'mr-[280px]' : 'mr-0'
        )}>
          <div className="w-full h-full">
            <CallLayout />
          </div>
        </div>

        {/* Participants Sidebar - Zoom/Meet Style */}
        <div className={cn(
          'absolute right-0 top-0 h-full w-[280px] bg-[#232323] border-l border-[#3c3c3c] transition-transform duration-300 ease-out z-10',
          showParticipants ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
              <h3 className="text-sm font-semibold text-white">Participants</h3>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={18} className="rotate-90" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls onLeave={() => Router.push('/') }  />
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
=======
      {/* Control Bar - Zoom/Meet Style */}
      <div className='absolute bottom-0 left-0 right-0 z-20'>
        <div className='bg-[#1c1c1c] border-t border-[#3c3c3c]'>
          <div className='mx-auto max-w-screen-xl px-6 py-4'>
            <div className='flex items-center justify-between'>
              {/* Left Section - Meeting Info (Optional) */}
              <div className="flex-1 flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Secure connection</span>
                </div>
>>>>>>> ab6eac1e5c5ab385e9460daa1ed39baebde6d0b2
              </div>

              {/* Center Section - Main Controls */}
              <div className='flex items-center justify-center gap-2'>
                <CallControls />
                
                {/* Layout Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger className='group flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg hover:bg-[#3c3c3c] transition-colors'>
                    <div className="flex items-center justify-center h-6">
                      <LayoutList size={20} className='text-white' />
                    </div>
                    <span className="text-[10px] text-gray-300 font-medium">View</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className='border-[#3c3c3c] bg-[#2d2d2d] text-white shadow-2xl min-w-[200px] mb-2'
                    align="end"
                  >
                    {layoutOptions.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.value}>
                          <DropdownMenuItem
                            className={cn(
                              'cursor-pointer hover:bg-[#3c3c3c] focus:bg-[#3c3c3c] py-3 px-3',
                              layout === item.value && 'bg-[#0b5cff]/10 text-[#1da1f2]'
                            )}
                            onClick={() => setLayout(item.value)}
                          >
                            <div className="flex items-center gap-3 w-full">
                              <Icon size={18} className={layout === item.value ? 'text-[#1da1f2]' : 'text-gray-400'} />
                              <span className="text-sm">{item.label}</span>
                              {layout === item.value && (
                                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#1da1f2]" />
                              )}
                            </div>
                          </DropdownMenuItem>
                          {index < layoutOptions.length - 1 && (
                            <DropdownMenuSeparator className='bg-[#3c3c3c]' />
                          )}
                        </div>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Participants Toggle */}
                <button 
                  onClick={() => setShowParticipants((prev) => !prev)}
                  className={cn(
                    'group flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors relative',
                    showParticipants 
                      ? 'bg-[#0b5cff] hover:bg-[#0952e0]' 
                      : 'hover:bg-[#3c3c3c]'
                  )}
                >
                  <div className="flex items-center justify-center h-6">
                    <Users size={20} className='text-white' />
                  </div>
                  <span className="text-[10px] text-white font-medium">People</span>
                  {showParticipants && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#0b5cff] border-2 border-[#1c1c1c]" />
                  )}
                </button>

                {/* Stats Button */}
                <div className="flex flex-col items-center justify-center">
                  <CallStatsButton />
                </div>
              </div>

              {/* Right Section - End Call */}
              <div className="flex-1 flex items-center justify-end gap-2">
                {!isPersonalRoom && <EndCallButton />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeetingRoom