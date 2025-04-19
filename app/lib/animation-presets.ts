'use client'

import { gsap } from 'gsap'
import { isBrowser } from './client-utils'

/**
 * Animation presets for common animations
 * Ready to use with GSAP
 */

export const fadeIn = {
  opacity: 0,
  y: 15,
  duration: 0.6,
  ease: 'power2.out',
}

export const fadeInUp = {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power2.out',
}

export const fadeInDown = {
  opacity: 0,
  y: -30,
  duration: 0.8,
  ease: 'power2.out',
}

export const fadeInLeft = {
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: 'power2.out',
}

export const fadeInRight = {
  opacity: 0,
  x: 30,
  duration: 0.8,
  ease: 'power2.out',
}

export const scaleIn = {
  opacity: 0,
  scale: 0.8,
  duration: 0.7,
  ease: 'back.out(1.7)',
}

export const popIn = {
  opacity: 0,
  scale: 0.5,
  duration: 0.5,
  ease: 'back.out(1.7)',
}

export const bubblePop = {
  scale: 0.9,
  duration: 0.4,
  yoyo: true,
  repeat: 1,
  ease: 'power1.inOut',
}

// VS-specific animations
export const vsEntrance = {
  opacity: 0,
  y: 20,
  scale: 0.97,
  duration: 0.8,
  ease: 'power2.out',
}

export const vsButtonHover = {
  y: -4,
  scale: 1.02,
  duration: 0.3,
  ease: 'back.out(1.5)',
}

export const vsButtonPress = {
  scale: 0.95,
  duration: 0.2,
  ease: 'power2.in',
}

export const vsCardHover = {
  y: -8,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  duration: 0.4,
  ease: 'power2.out',
}

// Utility to get device-appropriate animation settings
export function getDeviceAnimationSettings(animation: any, isMobile: boolean) {
  if (!isMobile) return animation
  
  // Create a copy to not modify the original
  const mobileAnimation = { ...animation }
  
  // For mobile, reduce durations and distances
  if ('duration' in mobileAnimation) {
    mobileAnimation.duration = mobileAnimation.duration * 0.8
  }
  
  if ('x' in mobileAnimation) {
    mobileAnimation.x = mobileAnimation.x * 0.7
  }
  
  if ('y' in mobileAnimation) {
    mobileAnimation.y = mobileAnimation.y * 0.7
  }
  
  return mobileAnimation
}

// ScrollTrigger defaults
export const defaultScrollTriggerConfig = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none none',
}

export const repeatScrollTriggerConfig = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'restart none none reset',
}

// Timeline utility for staggered animations
export function createStaggerTimeline(
  elements: string | gsap.TweenTarget,
  animation: gsap.TweenVars = fadeIn,
  stagger = 0.1
) {
  if (!isBrowser()) return null
  
  const tl = gsap.timeline()
  tl.from(elements, {
    ...animation,
    stagger,
  })
  
  return tl
}