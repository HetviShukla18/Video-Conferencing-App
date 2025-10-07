// @ts-nocheck
'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk';
import { Call } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import MeetingCard from './MeetingCard';
import { Loader, Video, Calendar, Clock } from 'lucide-react';

export const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callrecordings, isLoading } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return '';
    }
  };

  const getEmptyStateConfig = () => {
    switch (type) {
      case 'ended':
        return {
          icon: Clock,
          title: 'No Previous Calls',
          description: 'Your past meetings will appear here'
        };
      case 'recordings':
        return {
          icon: Video,
          title: 'No Recordings',
          description: 'Recording sessions will be saved here'
        };
      case 'upcoming':
        return {
          icon: Calendar,
          title: 'No Upcoming Calls',
          description: 'Schedule a meeting to get started'
        };
      default:
        return {
          icon: Video,
          title: 'No Calls',
          description: ''
        };
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callrecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter(call => call.recordings.length > 0)
          .flatMap(call => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: 'Failed to fetch recordings. Please try again later.' });
      }
    };

    if (type === 'recordings') fetchRecordings();
  }, [type, callrecordings, toast]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  const emptyState = getEmptyStateConfig();
  const EmptyIcon = emptyState.icon;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-10 h-10 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Loading calls...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {calls && calls.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {calls.map((meeting: Call | CallRecording, idx: number) => (
            <MeetingCard
              key={
                (meeting as any).id ??
                (meeting as any).url ??
                (meeting as any).filename ??
                `${(meeting as any).start_time}-${idx}`
              }
              title={
                (meeting as Call).state?.custom?.description?.substring(0, 26) ||
                (meeting as any).filename?.substring(0, 20) ||
                'No description'
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as any).start_time?.toLocaleString()
              }
              icon={
                type === 'ended'
                  ? '/icons/previous.svg'
                  : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
              }
              isPreviousMeeting={type === 'ended'}
              buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
              buttonText={type === 'recordings' ? 'Play' : 'Start'}
              handleClick={
                type === 'recordings'
                  ? () => router.push(`${(meeting as any).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
              link={
                type === 'recordings'
                  ? (meeting as any).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="p-4 rounded-full bg-white shadow-lg">
              <EmptyIcon className="w-12 h-12 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {emptyState.title}
              </h3>
              <p className="text-sm text-gray-500">
                {emptyState.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallList;