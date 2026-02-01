'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, CardFooter, Button, Chip } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal'
import { Project } from '@/types/Project'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface ProjectCardProps {
  project: Project
  index: number
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const t = useTranslations('projects')
  const date = new Date(project.created_at)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Card
          isPressable
          onPress={onOpen}
          className="group h-[380px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-pink-400/50 transition-all duration-300 hover:shadow-lg"
        >
          <CardBody className="p-0 overflow-hidden">
            {/* Image container - fixed height */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {project?.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl opacity-30">🚀</span>
                </div>
              )}
              {/* Tags overlay */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    size="sm"
                    variant="flat"
                    className="bg-black/50 text-white text-xs backdrop-blur-sm"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Content - fixed height */}
            <div className="p-5 h-[140px] flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
                {project.description}
              </p>
            </div>
          </CardBody>

          <CardFooter className="pt-0 px-5 pb-5">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-gray-400">
                {date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}
              </span>
              <span className="text-xs text-pink-500 font-medium group-hover:translate-x-1 transition-transform">
                {t('readMore')} →
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="blur"
        classNames={{
          base: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
          header: "border-b border-gray-200 dark:border-gray-800",
          body: "py-6",
          footer: "border-t border-gray-200 dark:border-gray-800",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                  <Chip size="sm" variant="flat" className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                    {date.getFullYear()}
                  </Chip>
                </div>
                <p className="text-sm text-gray-500 font-normal">{project.description}</p>
              </ModalHeader>
              <ModalBody className="max-h-[60vh] overflow-y-auto">
                {project?.image && (
                  <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  {project.text}
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      variant="bordered"
                      className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                    >
                      #{tag}
                    </Chip>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose} className="w-full">
                  {t('close')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
