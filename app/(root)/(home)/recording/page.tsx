import React from 'react'
import Image from 'next/image'
import { CallList } from '@/components/CallList'

const Recording = () => {
  return (
    <section className="flex size-full flex-col gap-8 text-white">
      <header className="flex items-center gap-4">
        <Image src="/icons/recordings.svg" alt="Recordings" width={36} height={36} />
        <div>
          <h1 className="text-3xl font-bold leading-tight">Recordings</h1>
          <p className="text-sm text-gray-300">Your saved meeting recordings</p>
        </div>
      </header>

      <CallList type="recordings" />
    </section>
  )
}

export default Recording