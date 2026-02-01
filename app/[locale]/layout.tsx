import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className + " bg-white dark:bg-black cursor-default"}>
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <Toaster />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
