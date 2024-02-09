'use client'
import React, { useEffect } from 'react'
import AnnounceComponent from '@/app/components/AnnounceComponent'
import Spline from '@splinetool/react-spline'
import BlurBallComponent from '@/app/components/BlurBall'
import { Button, Card, CardBody, Link, Image } from '@nextui-org/react'
import { Glow, GlowCapture } from '@codaworks/react-glow'
import { CardFooter } from '@nextui-org/card'
import { getProjects } from '@/functions/getProjects/getProjects'
import { Project } from '@/types/Project'
import { Tooltip } from '@rewind-ui/core'

export default function Home() {
  const [word, setWord] = React.useState('')
  const [projects, setProjects] = React.useState([] as Project[])

  const words = [
    'dart',
    'web',
    'bot'
  ]

  const technos = [
    {
      name: 'Dart',
      color: '#0175C2',
      icon: 'https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg'
    },
    {
      name: 'React',
      color: '#61DAFB',
      icon: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg'
    },
    {
      name: 'AdonisJs',
      color: '#220052',
      icon: 'https://www.vectorlogo.zone/logos/adonisjs/adonisjs-icon.svg'
    },
    {
      name: 'TailwindCSS',
      color: '#38B2AC',
      icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
    },
    {
      name: 'Next.js',
      color: '#000000',
      icon: 'https://upload.vectorlogo.zone/logos/nextjs/images/60eff509-53dd-4280-92e7-7318fa02e934.svg'
    },
    {
      name: 'PostgreSQL',
      color: '#336791',
      icon: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg'
    },
    {
      name: 'Java',
      color: '#007396',
      icon: 'https://www.vectorlogo.zone/logos/java/java-icon.svg'
    },
    {
      name: 'TypeScript',
      color: '#3178C6',
      icon: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg'
    }
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

  useEffect(() => {
    (async () => {
      const projects = await getProjects(false)
      console.log(projects)
      setProjects(projects as Project[])
    })()
  }, [])

  const age = Math.floor((Date.now() - new Date('2007-07-22').getTime()) / 31536000000)

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
                    programming and explore all its possibilities. My enthusiasm for computer science keeps growing,
                    and
                    I'm always on the lookout for new challenges to tackle in this fascinating field.
                  </p>
                  <p>
                    Get a look at my <Link href={'#creations'}>creations</Link> !
                  </p>
                  <GlowCapture>

                    <h1 className={'mb-3 text-2xl'}>My Stacks</h1>
                    <div className={'flex gap-4'}>
                      {
                        technos.map((item, index) => (
                            <Tooltip content={item.name} key={index}>
                              <Glow color={item.color}>
                                <div className={'flex w-[60px] h-[60px] justify-center items-center bg-gray-800 glow:bg-glow/10 border border-gray-500 glow:border-glow rounded-md'}>
                                  <Image src={item.icon} width={45} height={45} alt={item.name}/>
                                </div>
                              </Glow>
                            </Tooltip>
                        ))
                      }
                    </div>
                  </GlowCapture>

                </div>
              </div>
            </div>
            <GlowCapture>
              <div className={"flex justify-center w-full p-8"}>
                <Glow color="purple">
                  <div className={"glow:text-glow text-4xl text-blue-600"}>
                    Zone under construction
                  </div>
                </Glow>
              </div>

              <div className="hidden flex gap-4">
                {projects.map((item, index) => (
                    <Glow color={item.color}>
                      <Card className="w-[400px] glow:bg-glow/10 border border-gray-500 glow:border-glow pt-5">
                        <div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-sm">{item.description}</p>
                        </div>

                        <CardFooter className="text-small w-full">
                          <Link href={'/projects/' + item.id} className={'w-full'}>
                            <Button fullWidth color="primary" variant="flat" radius="full">
                              Go to {item.title}
                            </Button>
                          </Link>
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
