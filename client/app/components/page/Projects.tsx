import React, { useEffect, useRef } from 'react'
import { PinContainer } from '@/app/components/ui/3d-pin'
import { LampContainer } from '@/app/components/ui/lamp'
import { motion } from 'framer-motion'
import { Project } from '@/types/Project'
import { getProjects } from '@/functions/getProjects/getProjects'
import { Tabs } from '@/app/components/ui/tabs'
import { Button, Link } from '@nextui-org/react'
import { capitalizeFirstLetter } from '@/utils/str'

export default function Projects() {
  const [projects, setProjects] = React.useState([] as Project[])
  const [tags, setTags] = React.useState<Set<string>>(new Set() as Set<string>)
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    (async () => {
      const fetchedProjects = await getProjects(true)
      setProjects(fetchedProjects)
      const allTags = fetchedProjects.map((project) => project.tags).flat().map(tag => tag.replaceAll('{', '').replaceAll('}', '').replaceAll('"', ''))

      allTags.forEach((tag) => tags.add(tag))
      console.log(tags)
      setIsLoaded(true)
    })()
  }, [])

  const tabs = [
    {
      title: 'All',
      value: 'all',
      content: (
          <div className="w-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-900 to-slate-950">
            <p>All projects</p>
            <div className={'grid md:grid-cols-2 gap-4 justify-center mt-5'}>
              {projects.map((project) => (
                  <div className={'p-5'}>
                    <PinContainer
                        title="/ui.aceternity.com"
                        href={'/projects/' + project.id}
                    >
                      <div
                          className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                          Aceternity UI
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Customizable Tailwind CSS and Framer Motion Components.
            </span>
                        </div>
                        <div
                            className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"/>
                        <Link href={'/projects/' + project.id} target={"_blank"} className={"w-full md:hidden"}>
                          <Button fullWidth variant={'flat'} color={'primary'} radius="full" className={'mt-5'}>
                            Read more
                          </Button>
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
              <div className="w-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-900 to-slate-950">
                <p>{capitalizeFirstLetter(tag)} projects</p>
                <div className={'grid md:grid-cols-2 gap-4 justify-center mt-5'}>
                  {projects.filter((project) => project.tags.includes(tag)).map((project) => (
                      <div className={'p-5'}>
                        <PinContainer
                            title="/ui.aceternity.com"
                            href={'/projects/' + project.id}
                        >
                          <div
                              className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                              Aceternity UI
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Customizable Tailwind CSS and Framer Motion Components.
            </span>
                            </div>
                            <div
                                className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"/>
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
      <div className={"-mb-[40%]"}>
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
                <div className={'-mt-24 flex justify-center'} >
                  <div className="[perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
                    <Tabs tabs={tabs} />
                  </div>
                </div>
              </>
          )
        }

      </div>
  )
}