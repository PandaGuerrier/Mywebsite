import AnnounceComponent from '@/app/components/AnnounceComponent'
import { Button, Link } from '@nextui-org/react'
import React from 'react'
import { Spotlight } from '@/app/components/ui/Spotlight'
import TextPressure from '../ui/text-pressure'

export default function HeroComponent() {
  return (
    <>
      <div
          className="absolute inset-0 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
      <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#3b82f6"
      />
      <div className={'h-full w-full'}>
        <div className="flex justify-center items-center h-full w-full ">
          <div className="text-center space-y-5 z-20">
            <div className={'flex w-full justify-center'}>
              <AnnounceComponent message={'New portofolio !'}/>
            </div>
            <div className={'w-[480px] flex flex-col items-center space-y-5'}>
              <TextPressure
                  text="Panda Guerrier"
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
      </div>
    </>

  )
}