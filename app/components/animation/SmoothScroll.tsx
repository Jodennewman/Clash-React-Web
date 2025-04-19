'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isBrowser } from '../../lib/client-utils'

// Register plugins (this is safe to call multiple times)
if (isBrowser()) {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
}

interface SmoothScrollProps {
  children: ReactNode
  enabled?: boolean
  speed?: number
  smoothTouch?: boolean
  effects?: boolean
  wrapperClass?: string
  contentClass?: string
}

/**
 * SmoothScroll component for Next.js
 * Implements ScrollSmoother for smooth scrolling with proper cleanup
 */
export function SmoothScroll({
  children,
  enabled = true,
  speed = 1,
  smoothTouch = false,
  effects = true,
  wrapperClass = '',
  contentClass = '',
}: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!isBrowser() || !enabled || !wrapperRef.current || !contentRef.current) return
    
    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: speed,
      smoothTouch,
      effects,
      ignoreMobileResize: true,
      normalizeScroll: true,
    })
    
    // Cleanup function
    return () => {
      smoother.kill()
      // Also kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false))
    }
  }, [enabled, speed, smoothTouch, effects])
  
  // Skip smooth scrolling setup on server
  if (!isBrowser()) {
    return <div className={contentClass}>{children}</div>
  }
  
  return (
    <div ref={wrapperRef} id="smooth-wrapper" className={`${wrapperClass}`}>
      <div ref={contentRef} id="smooth-content" className={`${contentClass}`}>
        {children}
      </div>
    </div>
  )
}