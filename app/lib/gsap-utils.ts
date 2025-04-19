'use client'

import { MutableRefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Observer } from 'gsap/Observer'
import { isBrowser } from './client-utils'

// Register plugins if in browser environment
if (isBrowser()) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer)
  
  // Configure default settings
  ScrollTrigger.config({
    ignoreMobileResize: true,
  })
}

/**
 * Creates a GSAP animation context and handles cleanup
 * @param fn Animation function
 * @param scopeRef Ref object to scope animations to
 * @returns Cleanup function
 */
export function createGSAPContext(
  fn: () => void,
  scopeRef: MutableRefObject<HTMLElement | null>
): () => void {
  if (!isBrowser() || !scopeRef.current) return () => {}
  
  const ctx = gsap.context(fn, scopeRef)
  
  return () => {
    ctx.revert()
  }
}

/**
 * Creates a simple animation with proper browser checks
 * @param target Target selector or element
 * @param animation Animation properties
 * @param scopeRef Optional ref for scoping
 * @returns Animation instance or undefined
 */
export function createAnimation(
  target: string | Element,
  animation: gsap.TweenVars,
  scopeRef?: MutableRefObject<HTMLElement | null>
) {
  if (!isBrowser()) return undefined
  
  if (scopeRef) {
    return gsap.context(() => {
      return gsap.to(target, animation)
    }, scopeRef)
  }
  
  return gsap.to(target, animation)
}

/**
 * Creates a ScrollTrigger animation with proper browser checks
 * @param params ScrollTrigger parameters
 * @returns ScrollTrigger instance or undefined
 */
export function createScrollTrigger(params: ScrollTrigger.Vars) {
  if (!isBrowser()) return undefined
  
  return ScrollTrigger.create(params)
}

/**
 * Utility to kill all ScrollTrigger instances
 */
export function killAllScrollTriggers() {
  if (!isBrowser()) return
  
  ScrollTrigger.getAll().forEach(trigger => trigger.kill(false))
}

/**
 * Create a ScrollSmoother instance with proper browser checks
 * @param params ScrollSmoother parameters
 * @returns ScrollSmoother instance or undefined
 */
export function createScrollSmoother(params: any) {
  if (!isBrowser()) return undefined
  
  return ScrollSmoother.create(params)
}

/**
 * Theme-aware animation using CSS variables
 * @param target Target selector or element
 * @param propertyName CSS variable name (without the -- prefix)
 * @param defaultValue Fallback value if CSS variable not found
 * @param additionalProps Additional animation properties
 * @param scopeRef Optional ref for scoping
 */
export function themeAwareAnimation(
  target: string | Element,
  propertyName: string,
  defaultValue: string | number,
  additionalProps: gsap.TweenVars = {},
  scopeRef?: MutableRefObject<HTMLElement | null>
) {
  if (!isBrowser()) return undefined
  
  const styles = getComputedStyle(document.documentElement)
  const value = styles.getPropertyValue(`--theme-${propertyName}`) || defaultValue
  
  return createAnimation(
    target,
    { ...additionalProps, [propertyName]: value },
    scopeRef
  )
}