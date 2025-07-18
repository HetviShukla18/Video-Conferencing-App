import React, { Children, ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'


const RootLayout= ({children}: {children: ReactNode}) => {
  return (
    <div>
      <main>
        <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
      </main>
    </div>
  )
}


export default RootLayout

