'use client'

import { Suspense } from 'react'
import NextLayout from '../components/layout/NextLayout'
import { DynamicVSExampleComponent } from '../components/dynamic'

export default function ExamplePage() {
  return (
    <NextLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading example component...</div>}>
        <DynamicVSExampleComponent />
      </Suspense>
    </NextLayout>
  )
}