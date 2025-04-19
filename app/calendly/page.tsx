'use client'

import { Suspense } from 'react'
import NextLayout from '../components/layout/NextLayout'
import { DynamicCalendlyDemo } from '../components/dynamic'

export default function CalendlyPage() {
  return (
    <NextLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="p-8 text-center">
            <div className="text-xl font-bold text-theme-text mb-4">Loading Calendly Integration...</div>
            <div className="animate-pulse w-24 h-24 rounded-full bg-theme-accent mx-auto"></div>
          </div>
        </div>
      }>
        <DynamicCalendlyDemo />
      </Suspense>
    </NextLayout>
  )
}