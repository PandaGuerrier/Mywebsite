import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Panda',
  description: 'Panda is my personal website',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white dark:bg-black cursor-default"}>
            <Toaster />
            {children}
      </body>
    </html>
  )
}
