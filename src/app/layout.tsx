import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Speech Practice | Master Your Pitch',
  description: 'Practice public speaking with customizable timers and audio recording',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  )
}