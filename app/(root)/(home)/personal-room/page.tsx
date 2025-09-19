<<<<<<< HEAD
'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { Description } from '@radix-ui/react-dialog'
import { title } from 'process'
import React from 'react'
import { start } from 'repl'

const Table =({ title, Description} : {title: 
  string, Description: string}) => (
    <div className="flex flex-col items-start gap-2 
    xl:flex-row">
      <h1 className="text-base font-medium text-sky-1
      lg:text-xl xl:min-w-32>{title}:</h1>
      <h1 className="truncate text-sm font-bold sm:max-w-[320px]">
        {description}
      </h1>
      
  
</h1>


  )

const PersonalRoom = () => {
  const { user } = useUser()
  const meetingId = user?.id;

   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

   const startRoom = async () => {


   }



  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-3xl font-bold'>
      Personal Room
    </h1>
    <div className='flex w-full flex-col gap-8
    xl:max-w-[900px]'>
      <Table  title="Topic" Description={`${user?.
      username}'s meeting Room`} />
      <Table  title="Meeting ID" Description=
      {meetingId!} />
      <Table  title="Invite Link" Description=
      {meetingLink} />
    </div>
    <div className='flex-gap-5'>
      <Button className="bg-blue-1" onClick={startRoom}>
        Start Meeting
      </Button>
      <Button className="bg-dark-3" onClick={() =>{
        
      }}>

      </Button>

    </div>
   </section>
=======
"use client";

import React, { useMemo } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

const PersonalRoom = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  const roomId = useMemo(() => user?.id ?? '', [user?.id]);
  const inviteLink = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return roomId ? `${origin}/meeting/${roomId}?personal=true` : '';
  }, [roomId]);

  if (!isLoaded) {
    return (
      <section className='flex size-full items-center justify-center text-white'>
        <p>Loading...</p>
      </section>
    );
  }

  if (!isSignedIn || !roomId) {
    return (
      <section className='flex size-full items-center justify-center text-white'>
        <p>Please sign in to access your personal room.</p>
      </section>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success('Personal room link copied');
    } catch (e) {
      toast.error('Failed to copy link');
    }
  };

  const handleJoin = async () => {
    const url = `/meeting/${roomId}?personal=true`;
    try {
      console.log('[PersonalRoom] Navigating to', url);
      await router.push(url);
      // Some Next.js versions ignore awaiting push; add a microtask to ensure state flush
      setTimeout(() => {
        // no-op
      }, 0);
    } catch (e) {
      console.warn('[PersonalRoom] router.push failed, falling back to location.assign', e);
      if (typeof window !== 'undefined') {
        window.location.assign(url);
      }
    }
  };

  return (
    <section className='flex size-full flex-col gap-6 text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>

      <div className='rounded-md bg-dark1 p-4'>
        <p className='mb-2 text-sm text-gray-300'>Your Room ID</p>
        <div className='flex items-center justify-between rounded-md bg-dark2 p-3'>
          <span className='truncate'>{roomId}</span>
          <button onClick={handleCopy} className='ml-3 rounded-md bg-blue1 px-3 py-1 hover:opacity-90'>Copy Link</button>
        </div>
        <p className='mt-2 break-all text-xs text-gray-400'>{inviteLink}</p>
      </div>

      <div className='flex gap-3 items-center'>
        <Link href={`/meeting/${roomId}?personal=true`} className='rounded-md bg-green-600 px-4 py-2 hover:bg-green-700'>
          Start / Join Personal Room
        </Link>
        <button type="button" onClick={handleJoin} className='rounded-md bg-dark2 px-4 py-2 hover:bg-dark1'>Try Programmatic Nav</button>
      </div>
    </section>
>>>>>>> 0ca0798 (.)
  )
}

export default PersonalRoom