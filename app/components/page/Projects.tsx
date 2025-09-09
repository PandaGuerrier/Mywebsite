import React, { useEffect } from 'react'
import { PinContainer } from '@/app/components/ui/3d-pin'
import { Project } from '@/types/Project'
import { Tabs } from '@/app/components/ui/tabs'
import { Link } from '@nextui-org/react'
import { capitalizeFirstLetter } from '@/utils/str'
import Image from 'next/image'
import SplitText from '@/app/components/ui/split-text'

export default function Projects() {
  const projects = [
    {
      title: 'Conodia',
      description: 'Conodia is a collaborative minecraft server with a lot of features',
      created_at: '2021-02-16 07:56:58',
      text: (
          <div>
            <p>
              The <strong>Conodia</strong> project is an innovative Minecraft server designed and developed by Jules
              Lofficial. This project stands out for its technical complexity and high level of customization, offering
              a
              unique experience for players. Here are its main features:
            </p>
            <ol>
              <li>
                <strong>Complete and Custom Development:</strong>
                <br/>
                Jules created <strong>all the Minecraft plugins</strong> for the server, introducing more than 95
                commands
                available from the very beginning. These plugins were custom-built to meet the specific needs of the
                server.
              </li>
              <li>
                <strong>Advanced Technology and Integration:</strong>
                <br/>
                A <strong>RESTful web API</strong> and a <strong>WebSocket system</strong> were developed to connect the
                Minecraft server to Discord bots. This allows seamless interaction between the game and the Discord
                platform,
                enhancing communication and community management.
              </li>
              <li>
                <strong>Successful Launch:</strong>
                <br/>
                At its launch, the server recorded <strong>over 95 players</strong> connected simultaneously,
                demonstrating
                the project's initial popularity.
              </li>
              <li>
                <strong>Wide Range of Features:</strong>
                <br/>
                Conodia is characterized by a rich variety of commands and features designed to enhance the players'
                experience and provide maximum customization.
              </li>
            </ol>
            <p>
              This project reflects not only Jules' technical skills (in programming and server management) but also his
              ability to create a fun and immersive experience for a gaming community. 👾
            </p>
          </div>
      ),
      tags: ['minecraft', 'discord'],
      image: '/images/conodia.png'
    },
        {
      title: 'Mineral',
      description: "Mineral is a team for creation of bot discord's framework",
      created_at: '2022-01-16 07:56:58',
      text: (
          <div>
            <p>
              The <strong>Mineral</strong> project is an application development initiative where
              {' '}
              <a href="https://github.com/LeadcodeDev" target="_blank" rel="noopener noreferrer" className={"text-blue-600"}>
                Baptiste Parmentier
              </a>{' '}
              and Jules Lofficial
              worked together. This project focuses on creating advanced Discord bots using Dart, built with a custom
              framework. Here are its main highlights:
            </p>
            <ol>
              <li>
                <strong>Collaborative Expertise:</strong>
                <br/>
                Jules and Baptiste collaborated to develop Discord bots with tailored features and robust functionality.
                These
                bots are created using Dart, ensuring efficient and scalable performance.
              </li>
              <li>
                <strong>Custom Framework:</strong>
                <br/>
                The project leverages a unique framework specifically designed for Discord bot development. This
                framework
                enables faster development cycles and ensures compatibility with Discord's evolving ecosystem.
              </li>
              <li>
                <strong>Focus on Innovation:</strong>
                <br/>
                The Mineral project emphasizes creating bots that go beyond standard functionality, bringing innovative
                solutions to user interactions and server management.
              </li>
            </ol>
            <p>
              This project showcases Jules' and Baptiste's ability to leverage modern technologies and programming
              languages
              like Dart to build tools that enrich the Discord community experience. ⚡
            </p>
          </div>
      ),
          tags: ['dart', 'discord'],
          image: '/images/mineral.png'
        }
  ] as Project[]
  const [tags] = React.useState<Set<string>>(new Set() as Set<string>)
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    (async () => {
      const allTags = projects.map((project) => project.tags).flat().map(tag => tag.replaceAll('{', '').replaceAll('}', '').replaceAll('"', ''))

      allTags.forEach((tag) => tags.add(tag))

      setIsLoaded(true)
    })()
  }, [])

  const tabs = [
    {
      title: 'All',
      value: 'all',
      content: (
          <div
                  className="w-full rounded-2xl py-10 md:px-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 dark:from-gray-900 dark:to-slate-950 dark:border-transparent">
            <p className={"text-center md:text-left text-black dark:text-white"}>All projects</p>
            <div className={'grid md:grid-cols-2 gap-4 justify-center mt-5'}>
              {projects.map((project) => (
                  <div className={'p-5'}>
                    <PinContainer
                        title={project.title}
                        project={project}
                    >
                      <div
                          className="flex flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] min-h-[20rem]">

                        <div className="flex flex-1 w-full rounded-lg mt-4 max-w-xl">
                          {project?.image && (
                              <Image
                                  src={project.image}
                                  alt="blog thumbnail"
                                  height={200}
                                  width={250}
                                  className="mb-10 object-cover rounded-md w-full"
                              />
                          )}
                        </div>
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                        {project.title}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                              {project.description}
                            </span>
                        </div>

                        <Link className={'w-full md:hidden'}>
                          Read more
                        </Link>
                      </div>
                    </PinContainer>
                  </div>
              ))}
            </div>
          </div>
      )
    },
    ...Array.from(tags).map((tag) => (
        {
          title: capitalizeFirstLetter(tag),
          value: tag,
          content: (
              <div
                  className="w-full rounded-2xl py-10 md:px-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 dark:from-gray-900 dark:to-slate-950 dark:border-transparent">
                <p className={"text-center md:text-left text-black dark:text-white"}>{capitalizeFirstLetter(tag)} projects</p>
                <div className={'grid md:grid-cols-2 gap-4 justify-center mt-5'}>
                  {projects.filter((project) => project.tags.includes(tag)).map((project) => (
                      <div className={'p-5'}>
                        <PinContainer
                            title={project.title}
                            project={project}
                        >
                          <div
                              className="flex flex-col p-4 tracking-tight dark:text-slate-100/50 sm:basis-1/2 w-[20rem] min-h-[20rem]">

                            <div className="flex flex-1 w-full rounded-lg mt-4 max-w-xl">
                              {project?.image && (
                                  <Image
                                      src={project.image}
                                      alt="blog thumbnail"
                                      height={200}
                                      width={250}
                                      className="mb-10 object-cover rounded-md w-full"
                                  />
                              )}
                            </div>
                            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-800 dark:text-slate-100">
                              {project.title}
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-400 dark:text-slate-500">
                              {project.description}
                            </span>
                            </div>

                            <Link className={'w-full md:hidden'}>
                              Read more
                            </Link>
                          </div>
                        </PinContainer>
                      </div>
                  ))}
                </div>
              </div>
          )
        }))
  ]

  return (
      <div className={''}>
        {
          !isLoaded ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-400"/>
              </div>
          ) : (
              <>
                <SplitText
                    text="Here's my projects"
                    className="text-3xl md:text-8xl font-semibold text-center w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-200"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                />
                <div className={'-mt-24 flex justify-center'}>
                  <div className="[perspective:1000px] relative flex flex-col md:max-w-5xl mx-auto md:w-full items-start justify-start my-40">
                    <Tabs tabs={tabs}/>
                  </div>
                </div>
              </>
          )
        }

      </div>
  )
}