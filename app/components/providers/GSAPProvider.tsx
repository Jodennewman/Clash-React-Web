'use client'

import { ReactNode, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
    
    // Configure GSAP
    ScrollTrigger.config({
      ignoreMobileResize: true,
    })
    
    return () => {
      // Clean up ScrollTrigger on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false))
      
      // Kill any active animations
      gsap.killTweensOf('*')
    }
  }, [])
  
  return <>{children}</>
}