import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Application Form | Vertical Shortcut',
  description: 'Apply for the Vertical Shortcut program and start your journey to mastering short-form video content.',
}

export default function ApplicationFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}