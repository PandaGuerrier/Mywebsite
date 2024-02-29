'use client'
import React from 'react'
import HeroComponent from '@/app/components/page/HeroComponent'
import TestimonialsComponent from '@/app/components/page/TestimonialsComponent'
import AboutMe from '@/app/components/page/AboutMe'
import Projects from '@/app/components/page/Projects'
import ContactForm from '@/app/components/page/ContactForm'
import Footer from '@/app/components/page/Footer'

export default function Home() {
  return (
      <>
        <div className="absolute inset-0 h-full w-full bg-white dark:bg-black ">
          <HeroComponent/>
          <TestimonialsComponent/>
          <AboutMe/>
          <Projects />
          <ContactForm />
          <Footer />
        </div>
      </>
  )
}
