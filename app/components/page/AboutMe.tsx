'use client'

import { Button, Image, Link } from '@nextui-org/react'
import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedTooltip } from '@/app/components/ui/animated-tooltip'
import SocialNetwork from '@/app/components/page/SocialNetwork'
import { useTranslations } from 'next-intl'

export default function AboutMe() {
  const t = useTranslations('about')
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

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Jules Lofficial
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Photo & Social */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col items-center"
          >
            <div className="relative mb-6">
              <Image
                src="https://res.cloudinary.com/dqsvycncf/image/upload/v1749829039/IMG_6309_1_1_jngvgj.png"
                alt="Jules Lofficial"
                className="rounded-2xl w-64 h-64 object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            </div>
            <SocialNetwork className="flex justify-center gap-4" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-6"
          >
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                {t('intro')} <span className="font-bold text-pink-500">Jules</span>
                {t('description1', { age })}
              </p>
              <p>{t('description2')}</p>
              <p>
                {t('description3')} <Link href="https://discord.gg/M2cSPjK4SG" target="_blank" className="text-pink-500 hover:underline">Mineral</Link>.
              </p>
              <p>{t('description4')}</p>
            </div>

            {/* Tech Stack */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 mb-6">{t('stacks')}</p>
              <div className="flex flex-row items-center justify-start gap-2">
                <AnimatedTooltip items={technos} />
              </div>
            </div>

            {/* CTA */}
            <Link href="#contact" className="block">
              <Button
                size="lg"
                className="w-full md:w-auto bg-pink-500 text-white"
              >
                {t('contactMe')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
