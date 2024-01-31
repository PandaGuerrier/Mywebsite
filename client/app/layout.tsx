import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { useState } from 'react'
import { getNulledUser, User } from '@/types/User'
import { UserContext } from './hooks/useUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Panda',
  description: 'Panda is my personal website',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white dark:bg-black"}>
            <Toaster />
            {children}
      </body>
    </html>
  )
}
