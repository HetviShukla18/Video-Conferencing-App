'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

const Navabar = () => {
  return (
    <nav className='flex-between fixed z-50
     w-full bg-dark1 px-4 lg:px-10
    '>

      <Link href="/" className="flex items-center gap-1">
        <Image src="/icons/logo.png" 
        alt="ZinkUp" 
        width={32}
        height={32} 
        className='max-sm:size-10'
        />
        <p className='text-[26px] font-bold text-white max-sm:hidden'>ZinkUp</p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className='rounded-md bg-blue1 px-4 py-2 text-white hover:opacity-90'>
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
          <MobileNav/>
      </div>
    </nav>
  )
}

export default Navabar
