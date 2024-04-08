import React, { useEffect } from 'react'
import { PinContainer } from '@/app/components/ui/3d-pin'
import { LampContainer } from '@/app/components/ui/lamp'
import { motion } from 'framer-motion'
import { Project } from '@/types/Project'
import { getProjects } from '@/functions/getProjects/getProjects'
import { Tabs } from '@/app/components/ui/tabs'
import { Link } from '@nextui-org/react'
import { capitalizeFirstLetter } from '@/utils/str'
import Image from 'next/image'

export default function Projects() {
  const [projects, setProjects] = React.useState([] as Project[])
  const [tags] = React.useState<Set<string>>(new Set() as Set<string>)
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    (async () => {
      const fetchedProjects = await getProjects(false)
      setProjects(fetchedProjects)
      const allTags = fetchedProjects.map((project) => project.tags).flat().map(tag => tag.replaceAll('{', '').replaceAll('}', '').replaceAll('"', ''))

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
              className="w-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-900 to-slate-950">
            <p>All projects</p>
            <div className={'grid md:grid-cols-2 gap-y-10 md:gap-y-4 justify-center mt-5'}>
              {projects.map((project) => (
                  <div className={'p-5'}>
                    <PinContainer
                        title={project.title}
                        project={project}
                    >
                      <div
                          className="flex flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] min-h-[20rem]">

                        <div className="flex flex-1 w-full rounded-lg mt-4 ">
                          {project?.image && (
                              <Image
                                  src={project.image}
                                  alt="blog thumbnail"
                                  height="400"
                                  width="400"
                                  className="mb-10 object-cover w-full rounded-md"
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

                        <Link href={'/projects/' + project.id} target={'_blank'} className={'w-full md:hidden'}>
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
                  className="w-full rounded-2xl py-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-900 to-slate-950">
                <p className={"text-center md:text-left"}>{capitalizeFirstLetter(tag)} projects</p>
                <div className={'grid md:grid-cols-2 gap-4 justify-center mt-5'}>
                  {projects.filter((project) => project.tags.includes(tag)).map((project) => (
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
                <LampContainer className={'mt-24'}>
                  <motion.h1
                      initial={{opacity: 0.5, y: 100}}
                      whileInView={{opacity: 1, y: 0}}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut'
                      }}
                      className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                  >
                    Here my projects

                  </motion.h1>
                </LampContainer>
                <div className={'-mt-24 flex justify-center'}>
                  <div className="[perspective:1000px] relative flex flex-col md:max-w-5xl mx-auto md:w-full  items-start justify-start my-40">
                    <Tabs tabs={tabs}/>
                  </div>
                </div>
              </>
          )
        }

      </div>
  )
}