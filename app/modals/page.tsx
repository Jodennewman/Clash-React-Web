'use client'

import { Suspense } from 'react'
import NextLayout from '../components/layout/NextLayout'
import { DynamicVSModalShowcase } from '../components/dynamic'

export default function ModalsPage() {
  return (
    <NextLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading modal showcase...</div>}>
        <DynamicVSModalShowcase />
      </Suspense>
    </NextLayout>
  )
}