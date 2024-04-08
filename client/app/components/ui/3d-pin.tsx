'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Button, Card, CardBody, Link } from '@nextui-org/react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Project } from '@/types/Project'
import Image from 'next/image'
import { CardFooter } from '@nextui-org/card'

export const PinContainer = ({children, title, href, className, containerClassName, project}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  project: Project
}) => {
  const [transform, setTransform] = useState('translate(-50%,-50%) rotateX(0deg)')
  const {isOpen, onOpen, onOpenChange } = useDisclosure()

  const onMouseEnter = () => {
    setTransform('translate(-50%,-50%) rotateX(40deg) scale(0.8)')
  }
  const onMouseLeave = () => {
    setTransform('translate(-50%,-50%) rotateX(0deg) scale(1)')
  }

  const date = new Date(project.created_at)


  return (
      <>
        <Link
            onPress={() => {
              onOpen()
            }}
        >
          <div
              className={cn(
                  'relative group/pin z-50  cursor-pointer',
                  containerClassName
              )}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
          >
            <div
                style={{
                  perspective: '1000px',
                  transform: 'rotateX(70deg) translateZ(0deg)'
                }}
                className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
            >
              <div
                  style={{
                    transform: transform
                  }}
                  className="absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden max-h-96"
              >
                <div className={cn(' relative z-50 ', className)}>{children}</div>
              </div>
            </div>
            <PinPerspective title={title} href={href}/>
          </div>
        </Link>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"
            size="5xl"
            className={"bg-transparent"}
            backdrop={"opaque"}

        >
          <ModalContent>
            {(onClose) => (
                <div className={"md:mt-24 md:flex md:space-x-5 bg-transparent"}>
                  <Card className="hidden md:block max-w-full h-full">
                    <CardBody className="h-full space-y-2">
                      {project?.image && (
                          <Image
                              src={project.image}
                              alt="blog thumbnail"
                              height={200}
                              width={250}
                              className="object-cover rounded-md w-full"
                          />
                      )}
                      <h3 className="max-w-xs text-center font-bold  text-base text-slate-100">
                        {project.title} - {date.toLocaleDateString()}
                      </h3>
                      <div className="text-base text-center font-normal">
                        <span className="text-slate-500 ">
                          {project.description}
                        </span>
                      </div>
                    </CardBody>
                  </Card>

                  <div className="w-full">
                    <Card className="max-w-full max-h-[800px] mb-14 h-full">
                      <div className={"md:hidden space-y-5"}>
                        {project?.image && (
                            <Image
                                src={project.image}
                                alt="blog thumbnail"
                                height={200}
                                width={250}
                                className="object-cover rounded-md w-full"
                            />
                        )}
                        <h3 className="text-center font-bold text-base text-slate-100">
                          {project.title} - {date.toLocaleDateString()}
                        </h3>
                        <div className="text-base text-center font-normal">
                        <span className="text-slate-500 ">
                          {project.description}
                        </span>
                        </div>
                      </div>
                      <CardBody className="overflow-auto">
                        <div dangerouslySetInnerHTML={{__html: project.text}}/>
                      </CardBody>
                      <CardFooter className={"my-2"}>
                        <Button onPress={onClose} fullWidth>
                          Close
                        </Button>
                      </CardFooter>

                    </Card>
                  </div>
                </div>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}

export const PinPerspective = ({
                                 title,
                                 href
                               }: {
  title?: string;
  href?: string;
}) => {
  return (
      <motion.div
          className="pointer-events-none  w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
        <div className=" w-full h-full -mt-7 flex-none  inset-0">
          <div className="absolute top-0 inset-x-0  flex justify-center">
            <Link
                href={href}
                className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 "
            >
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>

              <span
                  className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
            </Link>
          </div>

          <div
              style={{
                perspective: '1000px',
                transform: 'rotateX(70deg) translateZ(0)'
              }}
              className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
          >
            <>
              <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: '-50%',
                    y: '-50%'
                  }}
                  animate={{
                    opacity: [0, 1, 0.5, 0],
                    scale: 1,

                    z: 0
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: 0
                  }}
                  className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
              <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: '-50%',
                    y: '-50%'
                  }}
                  animate={{
                    opacity: [0, 1, 0.5, 0],
                    scale: 1,

                    z: 0
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: 2
                  }}
                  className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
              <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: '-50%',
                    y: '-50%'
                  }}
                  animate={{
                    opacity: [0, 1, 0.5, 0],
                    scale: 1,

                    z: 0
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: 4
                  }}
                  className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
            </>
          </div>

          <>
            <motion.div
                className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]"/>
            <motion.div
                className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  "/>
            <motion.div
                className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]"/>
            <motion.div
                className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 "/>
          </>
        </div>
      </motion.div>
  )
}