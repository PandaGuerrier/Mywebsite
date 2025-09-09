'use client'

import React, { useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Navbar from '../components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@/app/hooks/useTheme'
import LogoAnimated from '@/app/components/animations/LogoAnimated'


const HomeLayout = ({children}: {
  children: React.ReactNode
}) => {
  const [isLoad, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [])

  return (
      <NextUIProvider className="w-full h-full text-foreground bg-transparent cursor-default">
        <AnimatePresence mode="popLayout" initial={isLoad}>
          <ThemeProvider>
              {
                isLoad ? (
                    <>
                      <motion.div
                          initial={{y: -300, opacity: 0}}
                          animate={{y: 0, opacity: 1}}
                          exit={{y: -300, opacity: 0}}
                          transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                          }}
                          key="transition"
                      >
                        <Navbar/>
                      </motion.div>

                      {children}
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full bg-black">
                      <LogoAnimated />
                    </div>
                )
              }
          </ThemeProvider>
        </AnimatePresence>
      </NextUIProvider>

  )
}

export default HomeLayout