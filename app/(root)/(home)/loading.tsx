import React from 'react'

const CardSkeleton = () => (
  <div className="rounded-xl bg-dark2 p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-9 w-9 rounded bg-dark3" />
      <div className="space-y-2">
        <div className="h-5 w-40 bg-dark3 rounded" />
        <div className="h-3 w-64 bg-dark3 rounded" />
      </div>
    </div>
    <div className="h-20 w-full bg-dark3 rounded" />
    <div className="mt-4 flex gap-3">
      <div className="h-8 w-16 bg-dark3 rounded" />
      <div className="h-8 w-24 bg-dark3 rounded" />
    </div>
  </div>
)

export default function Loading() {
  return (
    <section className="flex size-full flex-col gap-8 text-white">
      <header className="flex items-center gap-4">
        <div className="h-9 w-9 rounded bg-dark3 animate-pulse" />
        <div className="space-y-2">
          <div className="h-7 w-48 bg-dark3 rounded animate-pulse" />
          <div className="h-4 w-72 bg-dark3 rounded animate-pulse" />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  )
}
