'use client'

import { Suspense } from 'react'
import NextLayout from '../components/layout/NextLayout'
import { DynamicApplicationFormWrapper } from '../components/dynamic'

export default function ApplicationFormPage() {
  return (
    <NextLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading application form...</div>}>
        <DynamicApplicationFormWrapper />
      </Suspense>
    </NextLayout>
  )
}