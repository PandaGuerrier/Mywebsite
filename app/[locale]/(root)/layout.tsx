'use client'

import React, { useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Navbar from '@/app/components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@/app/hooks/useTheme'
import LogoAnimated from '@/app/components/animations/LogoAnimated'


const HomeLayout = ({children}: {
  children: React.ReactNode
}) => {
  const [isLoad, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <NextUIProvider className="w-full h-full text-foreground bg-transparent cursor-default">
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {!isLoad ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed inset-0 flex justify-center items-center bg-black z-50"
            >
              <LogoAnimated />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeIn' }}
            >
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: 0.1
                }}
              >
                <Navbar />
              </motion.div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </NextUIProvider>
  )
}

export default HomeLayout
