'use client'

import { Button, Link } from '@nextui-org/react'
import React from 'react'
import { Spotlight } from '@/app/components/ui/Spotlight'
import TextPressure from '../ui/text-pressure'
import { useTranslations } from 'next-intl'

export default function HeroComponent() {
  const t = useTranslations('hero')

  return (
    <>
      <div
          className="absolute inset-0 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
      <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#FF99AF"
      />
      <div className={'h-full w-full'}>
        <div className="flex justify-center items-center h-full w-full ">
          <div className="text-center space-y-5 z-20">
            <div className={'w-[480px] flex flex-col items-center space-y-5'}>
              <TextPressure
                  text="Jules Lofficial"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={80}
              />
              <h2 className={'text-gray-400 text-xl md:text-3xl'}>
                <span className={'text-pink-400'}>
                  {t('subtitle')}
                </span>
              </h2>
            </div>

            <div className={'mt-52 space-x-5'}>
              <Link href={'#about'}>
                <Button variant={'flat'} className="bg-pink-500 text-white" radius="full">
                  {t('showMore')}
                </Button>
              </Link>

              <Link href={'#contact'}>
                <Button variant={'bordered'} className="border-pink-500 text-pink-500" radius="full">
                  {t('contactMe')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
