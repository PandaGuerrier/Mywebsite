
import React from 'react'
import { InfiniteMovingCards } from '@/app/components/ui/infinite-moving-cards'

export default function TestimonialsComponent() {

  const testimonials = [
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
      title: 'Community Manager for crypto\'s projects',
      rating: 5
    }
  ]

  return (
      <>
        <div
            className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <span className={'font-bold text-md'}>
              What my customers say
            </span>
          <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
          />
        </div>
      </>

  )
}