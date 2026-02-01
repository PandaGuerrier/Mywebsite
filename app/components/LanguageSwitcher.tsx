'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant={locale === 'fr' ? 'flat' : 'light'}
        color={locale === 'fr' ? 'primary' : 'default'}
        onPress={() => switchLocale('fr')}
        className="min-w-unit-10 px-2"
      >
        FR
      </Button>
      <Button
        size="sm"
        variant={locale === 'en' ? 'flat' : 'light'}
        color={locale === 'en' ? 'primary' : 'default'}
        onPress={() => switchLocale('en')}
        className="min-w-unit-10 px-2"
      >
        EN
      </Button>
    </div>
  )
}
