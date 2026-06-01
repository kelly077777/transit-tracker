import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TfL Live Tracker',
  description: 'Real-time London transit tracker powered by TfL API',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
