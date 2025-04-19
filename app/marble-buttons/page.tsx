'use client'

import { Suspense } from 'react'
import NextLayout from '../components/layout/NextLayout'
import { DynamicAnimatedButtonsDemo } from '../components/dynamic'

export default function MarbleButtonsPage() {
  return (
    <NextLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading animated buttons demo...</div>}>
        <DynamicAnimatedButtonsDemo />
      </Suspense>
    </NextLayout>
  )
}