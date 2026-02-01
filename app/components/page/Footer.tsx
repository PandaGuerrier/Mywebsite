'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SocialNetwork from '@/app/components/page/SocialNetwork'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const actualYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-pink-500 mb-2">
              {t('portfolio')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Social */}
          <SocialNetwork className="flex gap-4" />
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500"
        >
          <span>{t('madeWith')}</span>
          <span className="hidden md:block">•</span>
          <span>{t('copyright', { year: actualYear })}</span>
        </motion.div>
      </div>
    </footer>
  )
}
