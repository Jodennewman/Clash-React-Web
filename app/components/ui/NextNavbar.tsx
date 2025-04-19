'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className = '' }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link
      href={href}
      className={`px-4 py-2 transition-all duration-300 ${isActive ? 'text-theme-accent font-semibold' : 'text-theme-text hover:text-theme-accent'} ${className}`}
    >
      {children}
    </Link>
  )
}

export function NextNavbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-theme-bg-primary/90 shadow-theme-md backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-theme-accent to-theme-accent-secondary bg-clip-text text-transparent">
            Vertical Shortcut
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/example">Example</NavLink>
          <NavLink href="/modals">Modals</NavLink>
          <NavLink href="/marble-buttons">Buttons</NavLink>
          <NavLink href="/application-form">Apply</NavLink>
        </div>
        
        <Link
          href="/application-form"
          className="hidden md:block px-5 py-2 rounded-full bg-theme-accent text-white font-medium transition hover:bg-theme-accent-secondary hover-bubbly-sm"
        >
          Apply Now
        </Link>
        
        <button
          className="md:hidden text-theme-text hover:text-theme-accent"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  )
}