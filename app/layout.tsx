import '../src/app/globals.css'
import { ThemeProvider } from '../src/components/ui/theme-provider'
import { GSAPProvider } from './components/providers/GSAPProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vertical Shortcut',
  description: 'The premium 10-week program for founders and creators to generate consistent leads and revenue with short-form video.',
  openGraph: {
    title: 'Vertical Shortcut | Master Short-Form Content',
    description: 'The premium 10-week program for founders and creators to generate consistent leads and revenue with short-form video.',
    images: '/vs-og-image.png',
    url: 'https://clashcreation.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertical Shortcut | Master Short-Form Content',
    description: 'Unlock the secrets to viral short-form video and drive real business results. Join the premium 10-week program.',
    images: '/vs-twitter-card.png',
  },
  keywords: 'short-form video, content creation, viral video, Tik Tok, YouTube, Instagramsocial media marketing, lead generation, business growth, creator economy, video marketing',
  authors: [{ name: 'Clash Creation' }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="icon" type="image/svg+xml" href="/vs-logo-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          @media (max-width: 767px) {
            html {
              overflow-x: hidden;
              width: 100%;
            }
            
            body {
              overflow-x: hidden;
              width: 100%;
              margin: 0;
              padding: 0;
              position: relative;
            }
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <GSAPProvider>
            {children}
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 