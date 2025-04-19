'use client'

import { Suspense } from 'react'
import NextLayout from '../components/layout/NextLayout'
import { DynamicDebugPage } from '../components/dynamic'

export default function DebugPageWrapper() {
  return (
    <NextLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading debug page...</div>}>
        <DynamicDebugPage />
      </Suspense>
    </NextLayout>
  )
}