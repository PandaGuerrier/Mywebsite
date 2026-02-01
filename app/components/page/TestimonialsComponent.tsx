'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Testimonial {
  type: string
  quote: string
  name: string
  title: string
  rating: number
}

const TestimonialCard = ({ item, index }: { item: Testimonial; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex-shrink-0 w-[320px] md:w-[380px] p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-pink-400/50 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
        {item.type}
      </span>
      <div className="flex gap-0.5">
        {[...Array(item.rating)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-sm">★</span>
        ))}
      </div>
    </div>

    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
      "{item.quote}"
    </p>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
        {item.name.charAt(0)}
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{item.title}</p>
      </div>
    </div>
  </motion.div>
)

export default function TestimonialsComponent() {
  const t = useTranslations('testimonials')

  const testimonials: Testimonial[] = [
    {
      type: 'Discord bot',
      quote: 'Great discord developer I highly recommend!',
      name: 'Hysteriox',
      title: 'Hypenetwork founder',
      rating: 5
    },
    {
      type: 'Website',
      quote: 'Very good developer managed to meet my expectations within a reasonable time and frankly a superb job for his first time with this language.',
      name: 'Ravens',
      title: 'French graphic designer',
      rating: 5
    },
    {
      type: 'Discord bot',
      quote: 'Fast, efficient, attentive, nothing to say for the work provided by Panda!',
      name: 'VIpexx',
      title: 'Founder of Shamaria',
      rating: 5
    },
    {
      type: 'Discord bot',
      quote: 'Panda Guerrier demonstrated professionalism throughout my order; Excellent quality bot, I recommend.',
      name: 'Apotros',
      title: 'Founder of team building: EtherBT',
      rating: 5
    },
    {
      type: 'Other',
      quote: 'Jules is always attentive and very invested in his work. He masters a lot of tools and allowed us to have a simple and efficient discord server, I recommend!',
      name: 'Pohypes',
      title: 'Community Manager',
      rating: 5
    }
  ]

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

        <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={`${item.name}-${index}`} item={item} index={index % testimonials.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
