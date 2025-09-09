import { Button, Image, Link } from '@nextui-org/react'
import React from 'react'
import { TracingBeam } from '@/app/components/ui/tracing-beam'
import { AnimatedTooltip } from '@/app/components/ui/animated-tooltip'
import SocialNetwork from '@/app/components/page/SocialNetwork'

export default function AboutMe() {
  const age = Math.floor((Date.now() - new Date('2007-07-22').getTime()) / 31536000000)

  const technos = [
    {
      id: 0,
      name: 'Dart',
      color: '#0175C2',
      icon: 'https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg'
    },
    {
      id: 1,
      name: 'React',
      color: '#61DAFB',
      icon: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg'
    },
    {
      id: 2,
      name: 'AdonisJs',
      color: '#220052',
      icon: 'https://www.vectorlogo.zone/logos/adonisjs/adonisjs-icon.svg'
    },
    {
      id: 3,
      name: 'TailwindCSS',
      color: '#38B2AC',
      icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
    },
    {
      id: 4,
      name: 'Next.js',
      color: '#000000',
      icon: 'https://upload.vectorlogo.zone/logos/nextjs/images/60eff509-53dd-4280-92e7-7318fa02e934.svg'
    },
    {
      id: 5,
      name: 'PostgreSQL',
      color: '#336791',
      icon: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg'
    },
    {
      id: 6,
      name: 'Java',
      color: '#007396',
      icon: 'https://www.vectorlogo.zone/logos/java/java-icon.svg'
    },
    {
      id: 7,
      name: 'TypeScript',
      color: '#3178C6',
      icon: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg'
    }
  ]

  const dummyContent = [
    {
      title: 'Jules Lofficial',
      description: (
          <div>
            <div className={"flex flex-col md:block items-center justify-center space-y-2 md:space-y-0 md:justify-normal md:w-1/2 "}>
              <SocialNetwork className={"flex justify-center p-5"} />
              <Image
                  src="https://res.cloudinary.com/dqsvycncf/image/upload/v1749829039/IMG_6309_1_1_jngvgj.png"
                  className={"md:float-left rounded-lg mr-5 flex justify-center"}
              />
            </div>


            <div className={'text-lg md:text-lg mt-5 space-y-2'}>
              <p>
                Hey, my name is <span className={"bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"}>Jules</span>, I am a {age} years old french developer. I am passionate about programming and I
                am   always looking for new challenges.
              </p>
              <p>
                It all started when I was 12 years old, I discovered the world of programming and I immediately fell in
                love with it. I started with Javascript, with create Discord bot, and then I discovered the world of development with Java,
                Dart, etc..

                I love to create new things, I'm was working on a minecraft server called Conodia but it close, and I'm also in a Discord's bot framework project called <Link href={"https://discord.gg/M2cSPjK4SG"} target={"_blank"}>Mineral</Link>.
              </p>
              <p>
                I am currently studying at a high school in France, and here my goal is to become a software engineer. I
                am also a freelancer and I am always looking for new projects to work on.
              </p>
              <p className={'mt-5'}>
                Here what are my lovelies stacks:

                <div className="flex flex-row items-center justify-center my-10 w-full space-x-5">
                  <AnimatedTooltip items={technos}/>
                </div>
              </p>
              <Link href={'#contact'} className={'w-full'}>
                <Button fullWidth variant={'flat'} color={'primary'} radius="full" className={'mt-5'}>
                  Contact me
                </Button>
              </Link>
            </div>
          </div>
      ),
      badge: 'About Me',
      image: null
    },
    /*{
      title: 'Conodia',
      description: (
          <div className={'text-md md:text-lg'}>
            <p>
              Conodia is a minecraft Pvp Faction, I am the founder and the developer of the server. I am currently
              working on the development of the server and I am looking for new staff to join this aventure !.
              It's a project that I started in 2021 and I am still working on it, I want to be a famous minecraft server
              but the minecraft community is going to die, so we had a big change: be a modded minecraft server.
            </p>
            <Link href={'https://discord.gg/conodia'} target={'_blank'} className={'w-full'}>
              <Button fullWidth variant={'flat'} color={'primary'} radius="full" className={'mt-5'}>
                Join us
              </Button>
            </Link>
          </div>
      ),
      badge: 'Project',
      image:
          'https://conodia.fr/storage/img/logofond.png'
    }*/
  ]

  return (
      <div>
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {dummyContent.map((item, index) => (
                <div key={`content-${index}`} className="mb-10">
                  <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    {item.badge}
                  </h2>

                  <p className={'text-xl mb-4'}>
                    {item.title}
                  </p>

                  <div className="text-sm  prose prose-sm dark:prose-invert">
                    {item?.image && (
                        <Image
                            src={item.image}
                            alt="blog thumbnail"
                            height="1000"
                            width="1000"
                            className="rounded-lg mb-10 object-cover"
                        />
                    )}
                    {item.description}
                  </div>
                </div>
            ))}
          </div>
      </div>

  )
}