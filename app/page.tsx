'use client'

import '../src/styles/index.css'
import '../src/styles/modulehud.css'
import '../src/styles/custom-text.css'
import { Suspense, useEffect } from 'react'
import NextLayout from './components/layout/NextLayout'

// Import and register image mappers
import { registerThumbnails } from '../src/utils/thumbnailMapper'
import { registerWithImageMapper } from '../src/utils/importImages'
import { addPublicImage } from '../src/utils/imageMap'

// Import dynamic component for the homepage
import dynamic from 'next/dynamic'

// Dynamically import the App component
const DynamicApp = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-theme-gradient">
      <div className="p-8 text-center">
        <div className="text-2xl font-bold text-theme-text mb-4">Loading Vertical Shortcut...</div>
        <div className="animate-pulse w-24 h-24 rounded-full bg-theme-accent mx-auto"></div>
      </div>
    </div>
  )
})

// Use client directive for client-side components
export default function Home() {
  // Register images and thumbnails on the client side
  useEffect(() => {
    registerThumbnails()
    registerWithImageMapper(addPublicImage)
  }, [])

  return (
    <NextLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-theme-gradient">
          <div className="p-8 text-center">
            <div className="text-2xl font-bold text-theme-text mb-4">Loading Vertical Shortcut...</div>
            <div className="animate-pulse w-24 h-24 rounded-full bg-theme-accent mx-auto"></div>
          </div>
        </div>
      }>
        <DynamicApp />
      </Suspense>
    </NextLayout>
  )
} 