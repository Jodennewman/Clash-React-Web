'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { isBrowser, runOnClient } from '../../lib/client-utils'
import { createGSAPContext, createScrollTrigger } from '../../lib/gsap-utils'

/**
 * Detects if the user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (!isBrowser()) return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Detects the current device type
 * @returns object containing device detection flags
 */
function useDeviceDetection() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })

  useEffect(() => {
    if (!isBrowser()) return

    const checkDevice = () => {
      const width = window.innerWidth
      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return device
}

interface AnimationWrapperProps {
  children: ReactNode
  className?: string
  animation?: 'fade-in' | 'slide-up' | 'scale-in' | 'none'
  scrollTrigger?: boolean
  threshold?: number
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
  start?: string
  markers?: boolean
  id?: string
}

/**
 * AnimationWrapper component for easy GSAP animations in Next.js
 */
export function AnimationWrapper({
  children,
  className = '',
  animation = 'fade-in',
  scrollTrigger = false,
  threshold = 0.3,
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  once = true,
  start = 'top 80%',
  markers = false,
  id,
  ...props
}: AnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { isMobile } = useDeviceDetection()
  
  // Skip animations for users with reduced motion preference
  const shouldAnimate = !prefersReducedMotion && animation !== 'none'
  
  // On mobile, ensure animations are less intensive
  const mobileDuration = isMobile ? duration * 0.8 : duration
  const mobileDelay = isMobile ? delay * 0.5 : delay
  
  useGSAP(() => {
    if (!shouldAnimate || !containerRef.current) return
    
    // Define animation based on type
    const getAnimation = () => {
      switch (animation) {
        case 'fade-in':
          return {
            opacity: 0,
            y: 10,
            duration: mobileDuration,
            delay: mobileDelay,
            ease: 'power2.out',
          }
        case 'slide-up':
          return {
            opacity: 0,
            y: 30,
            duration: mobileDuration,
            delay: mobileDelay,
            ease: 'power2.out',
          }
        case 'scale-in':
          return {
            opacity: 0,
            scale: 0.95,
            duration: mobileDuration,
            delay: mobileDelay,
            ease: 'back.out(1.4)',
          }
        default:
          return {}
      }
    }
    
    const animProps = getAnimation()
    const elements = containerRef.current.children
    
    if (scrollTrigger) {
      // Create a scroll-triggered animation
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: once ? 'play none none none' : 'restart none none reset',
            markers: markers && process.env.NODE_ENV === 'development',
            id,
          },
        })
        
        tl.from(elements, {
          ...animProps,
          stagger,
        })
      }, containerRef)
      
      return () => ctx.revert()
    } else {
      // Create a standard animation
      const ctx = gsap.context(() => {
        gsap.from(elements, {
          ...animProps,
          stagger,
        })
      }, containerRef)
      
      return () => ctx.revert()
    }
  }, [animation, scrollTrigger, threshold, delay, duration, stagger, once, start, markers, shouldAnimate, mobileDuration, mobileDelay, id])
  
  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  )
}

/**
 * ScrollAnimationSection component for triggering animations on scroll
 */
export function ScrollAnimationSection({
  children,
  className = '',
  animation = 'fade-in',
  ...props
}: AnimationWrapperProps) {
  return (
    <AnimationWrapper
      className={className}
      animation={animation}
      scrollTrigger={true}
      threshold={0.1}
      once={true}
      {...props}
    >
      {children}
    </AnimationWrapper>
  )
}