import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Panda',
  description: "Jules LOFFICIAL, développeur web Full stack, envoyez votre demande de contact si vous souhaitez que l'on travaille ensemble !",
  keywords: ['panda', 'personal', 'website', 'jules lofficial', 'pandaguerrier', 'panda guerrier', 'lofficial', 'jules'],
  authors: {
    name: 'Jules Lofficial',
  },
  verification : {
    google: 'google-site-verification=8b1c7d2f3e4f5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p',
    yandex: 'yandex-verification: 1234567890abcdef',
    me: 'https://pandaguerrier.fr',
  },
  twitter: {
    site: '@pandaguerrier',
    description: 'Panda is my personal website !',
  },
  assets: ['https://res.cloudinary.com/dqsvycncf/image/upload/v1749829039/IMG_6309_1_1_jngvgj.png', "https://pandaguerrier.fr/_next/image?url=%2Fimages%2Fconodia.png&w=256&q=75", "https://pandaguerrier.fr/_next/image?url=%2Fimages%2Fmineral.png&w=256&q=75"],
  icons: [
    {
      url: 'https://res.cloudinary.com/dqsvycncf/image/upload/v1749829039/IMG_6309_1_1_jngvgj.png',
      sizes: '192x192',
      type: 'image/png',
    },
  ],

}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white dark:bg-black cursor-default"}>
            <Analytics />
            <Toaster />
            {children}
      </body>
    </html>
  )
}
