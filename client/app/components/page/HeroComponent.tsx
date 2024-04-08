import AnnounceComponent from '@/app/components/AnnounceComponent'
import { Button, Link } from '@nextui-org/react'
import React from 'react'
import { Spotlight } from '@/app/components/ui/Spotlight'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'
import { BackgroundBeams } from '@/app/components/ui/background-beams'

export default function HeroComponent() {
  return (
    <>
      <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#3b82f6"
      />
      <div className={'h-full w-full z-20 bg-transparent '}>
        <div className="flex justify-center items-center h-full w-full z-20 ">
          <div className="text-center space-y-5 z-20">
            <div className={'flex w-full justify-center'}>
              <AnnounceComponent message={'New website !'}/>
            </div>
            <div>
              <h1 className={'text-5xl md:text-8xl text-black dark:text-white'}><TextGenerateEffect
                  words={'Panda Guerrier'}/>
              </h1>
              <h2 className={'text-gray-300 text-xl md:text-3xl'}><span
                  className={'bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text'}>
                    French developer
                  </span>
              </h2>
            </div>

            <div className={'mt-52 space-x-5'}>
              <Link href={'#about'}>
                <Button variant={'flat'} color={'primary'} radius="full">
                  Show more
                </Button>
              </Link>

              <Link href={'#contact'}>
                <Button variant={'ghost'} color={'primary'} radius="full">
                  Contact me
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <BackgroundBeams/>

      </div>
    </>

  )
}