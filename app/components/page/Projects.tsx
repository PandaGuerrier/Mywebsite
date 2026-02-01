'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/types/Project'
import { useTranslations } from 'next-intl'
import { ProjectCard } from '@/app/components/ui/project-card'
import { Button } from '@nextui-org/react'

export default function Projects() {
  const t = useTranslations('projects')
  const [filter, setFilter] = useState<'all' | 'student' | 'personal'>('all')

  const projects: Project[] = [
    {
      title: t('exprefrei.title'),
      description: t('exprefrei.description'),
      created_at: '2024-09-01',
      text: (
        <div className="space-y-4">
          <p>{t('exprefrei.text.intro')}</p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-pink-500">{t('exprefrei.text.feature1Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('exprefrei.text.feature1Text')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-500">{t('exprefrei.text.feature2Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('exprefrei.text.feature2Text')}</p>
            </div>
          </div>
          <p className="italic text-gray-500">{t('exprefrei.text.conclusion')}</p>
        </div>
      ),
      tags: ['student', 'react', 'nextjs'],
      image: null,
      category: 'student'
    },
    {
      title: t('conodia.title'),
      description: t('conodia.description'),
      created_at: '2021-02-16',
      text: (
        <div className="space-y-4">
          <p>{t('conodia.text.intro')}</p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-pink-500">{t('conodia.text.feature1Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('conodia.text.feature1Text')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-500">{t('conodia.text.feature2Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('conodia.text.feature2Text')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-500">{t('conodia.text.feature3Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('conodia.text.feature3Text')}</p>
            </div>
          </div>
          <p className="italic text-gray-500">{t('conodia.text.conclusion')} 👾</p>
        </div>
      ),
      tags: ['minecraft', 'java', 'discord'],
      image: '/images/conodia.png',
      category: 'personal'
    },
    {
      title: t('mineral.title'),
      description: t('mineral.description'),
      created_at: '2022-01-16',
      text: (
        <div className="space-y-4">
          <p>
            {t('mineral.text.intro').split('Baptiste Parmentier')[0]}
            <a href="https://github.com/LeadcodeDev" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
              Baptiste Parmentier
            </a>
            {t('mineral.text.intro').split('Baptiste Parmentier')[1]}
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-pink-500">{t('mineral.text.feature1Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('mineral.text.feature1Text')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-500">{t('mineral.text.feature2Title')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{t('mineral.text.feature2Text')}</p>
            </div>
          </div>
          <p className="italic text-gray-500">{t('mineral.text.conclusion')} ⚡</p>
        </div>
      ),
      tags: ['dart', 'discord', 'framework'],
      image: '/images/mineral.png',
      category: 'personal'
    }
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  const filters = [
    { key: 'all', label: t('all') },
    { key: 'student', label: t('student') },
    { key: 'personal', label: t('personal') },
  ] as const

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <Button
              key={f.key}
              size="sm"
              variant={filter === f.key ? 'flat' : 'light'}
              onPress={() => setFilter(f.key)}
              className={`px-5 ${
                filter === f.key
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {f.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500">Aucun projet dans cette catégorie</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
