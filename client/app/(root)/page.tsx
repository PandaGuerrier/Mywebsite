'use client'
import React from 'react'
import AnnounceComponent from '@/app/components/AnnounceComponent'
import Spline from '@splinetool/react-spline'
import BlurBallComponent from '@/app/components/BlurBall'
import { Button, Link } from '@nextui-org/react'

export default function Home() {
  const [word, setWord] = React.useState('')
  const words = [
    'dart',
    'web',
    'bot'
  ]

  // do a scribe effect
  React.useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setWord(words[i])
      i++
      if (i === words.length) {
        i = 0
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
      <>
        <div
            className="absolute inset-0 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-10"></div>
        <BlurBallComponent className={'bg-[#3b82f6] left-[10%] md:left-[80%] top-[250px] z-20'}/>
        <Spline scene="https://prod.spline.design/bd6OMccTZXFXYKqw/scene.splinecode"
                className={'absolute flex justify-center z-10 top-[-50px] md:top-[-150px] h-[50px] w-[50px] spline'}/>
        <div className={'h-full w-full z-20 bg-transparent '}>
          <div className="flex justify-center items-center h-full w-full z-20 ">
            <div className="text-center space-y-5 z-20">
              <div className={'flex w-full justify-center'}>
                <AnnounceComponent message={'New website !'}/>
              </div>
              <div>
                <h1 className={'text-5xl md:text-8xl text-black dark:text-white'}>Panda Guerrier</h1>
                <h2 className={'text-gray-300 text-xl md:text-3xl'}>French <span
                    className={'bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text'}>{word}</span> developper
                </h2>
              </div>

              <div className={"mt-52 space-x-5"}>
                <Link href={"#creations"}>
                  <Button variant={"flat"} color={"primary"} radius="full">
                    Show more
                  </Button>
                </Link>

                <Link href={"#creations"}>
                  <Button variant={"ghost"} color={"primary"} radius="full">
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
