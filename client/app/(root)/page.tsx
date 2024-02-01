'use client'
import React, { useEffect } from 'react'
import AnnounceComponent from '@/app/components/AnnounceComponent'
import Spline from '@splinetool/react-spline'
import BlurBallComponent from '@/app/components/BlurBall'
import { Button, Card, CardBody, Link, Image } from '@nextui-org/react'
import { Glow, GlowCapture } from '@codaworks/react-glow'
import { CardFooter } from '@nextui-org/card'

export default function Home() {
  const [word, setWord] = React.useState('')

  const words = [
    'dart',
    'web',
    'bot'
  ]

  useEffect(() => {
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

  const age = Math.floor((Date.now() - new Date('2007-07-22').getTime()) / 31536000000)
  const list = [
    {
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
      price: '$5.50'
    },
    {
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
      price: '$3.00'
    },
    {
      title: 'Raspberry',
      img: '/images/fruit-3.jpeg',
      price: '$10.00'
    },
    {
      title: 'Lemon',
      img: '/images/fruit-4.jpeg',
      price: '$5.30'
    },
    {
      title: 'Avocado',
      img: '/images/fruit-5.jpeg',
      price: '$15.70'
    },
    {
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00'
    },
    {
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50'
    },
    {
      title: 'Watermelon',
      img: '/images/fruit-8.jpeg',
      price: '$12.20'
    }
  ]

  return (
      <>

        <div
            className="absolute inset-0 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-10">
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

                <div className={'mt-52 space-x-5'}>
                  <Link href={'#creations'}>
                    <Button variant={'flat'} color={'primary'} radius="full">
                      Show more
                    </Button>
                  </Link>

                  <Link href={'#creations'}>
                    <Button variant={'ghost'} color={'primary'} radius="full">
                      Contact me
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={'w-full h-full bg-gray-950 py-4 z-50 mt-24'}>
            <h1 className={'text-white text-3xl md:text-6xl justify-center text-center z-20'}><span
                className={'about bg-clip-content'}>About me</span></h1>
            <div className={'flex w-full h-full justify-center'}>
              <div className={'md:flex justify-center items-center md:px-5 text-center md:text-left'}>
                <div className={'md:w-2/3 h-full p-5'}>
                  <Spline scene="https://prod.spline.design/TGz4KrueCX0ui0UT/scene.splinecode"/>
                </div>
                <div className={' px-4 justify-end w-screen space-y-5'}>
                  <p className={'flex text-lg justify-center md:w-3/4 '}>
                    Hey, my name is Jules, and I'm {age} years old. Since I was very young, I've been passionate about
                    computers. Three years ago, I discovered programming, a pivotal moment in my life, thanks to my
                    project Conodia. This project was a real eye-opener for me, allowing me to dive deep into
                    programming and explore all its possibilities. My enthusiasm for computer science keeps growing, and
                    I'm always on the lookout for new challenges to tackle in this fascinating field.
                  </p>
                  <p>
                    Get a look at my <Link href={'#creations'}>creations</Link> !
                  </p>
                </div>

              </div>
            </div>
            <GlowCapture>

            <div className="flex gap-4">
              {list.map((item, index) => (
                    <Glow color={"purple"}>
                      <Card shadow="sm" key={index} isPressable onPress={() => console.log('item pressed')} className={"glow:bg-glow/20 glow:border-glow"}>
                        <CardBody className="overflow-visible p-0">
                          <Image
                              shadow="sm"
                              radius="lg"
                              width="100%"
                              alt={item.title}
                              className="w-full object-cover h-[140px]"
                              src={item.img}
                          />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                          <b>{item.title}</b>
                          <p className="text-default-500">{item.price}</p>
                        </CardFooter>
                      </Card>
                    </Glow>


              ))}
            </div>
            </GlowCapture>
          </div>
        </div>

      </>
  )
}
