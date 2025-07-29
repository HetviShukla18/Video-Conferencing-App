import React, { Children, ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import AuthGuard from '@/components/AuthGuard'

const RootLayout= ({children}: {children: ReactNode}) => {
  return (
    <AuthGuard>
      <div>
        <main>
          <StreamVideoProvider>
          {children}
          </StreamVideoProvider>
        </main>
      </div>
    </AuthGuard>
  )
}

export default RootLayout

