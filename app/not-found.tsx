'use client'

import Link from 'next/link'
import NextLayout from './components/layout/NextLayout'
import { ScrollAnimationSection } from './components/animation/AnimationWrapper'

/**
 * Custom 404 page for Next.js
 */
export default function NotFound() {
  return (
    <NextLayout>
      <div className="container mx-auto px-4 py-16 min-h-[80vh] flex flex-col items-center justify-center">
        <ScrollAnimationSection animation="scale-in" className="text-center w-full max-w-2xl">
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-theme-accent to-theme-accent-secondary rounded-full blur opacity-25"></div>
            <div className="relative bg-theme-bg-primary rounded-full p-8 inline-block">
              <h1 className="text-9xl font-bold text-theme-accent">404</h1>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text mb-4">
            Page Not Found
          </h2>
          
          <p className="text-theme-text-secondary text-lg mb-8">
            We couldn't find the page you were looking for. The page may have been moved, 
            deleted, or never existed in the first place.
          </p>
          
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-theme-accent text-white font-medium transition hover:bg-theme-accent-secondary hover-bubbly-sm"
            >
              Go Home
            </Link>
            
            <Link
              href="/debug"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-theme-bg-secondary text-theme-text font-medium transition hover:bg-theme-bg-accent hover-bubbly-sm"
            >
              Debug Page
            </Link>
          </div>
        </ScrollAnimationSection>
      </div>
    </NextLayout>
  )
}