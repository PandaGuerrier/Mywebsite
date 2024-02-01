'use client'

import React, { useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Navbar from '../components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import LogoAnimated from '@/app/components/animations/LogoAnimated'
import { UserProvider } from '@/app/hooks/useUser'
import { ThemeProvider } from '@/app/hooks/useTheme'
import AnimatedCursor from 'react-animated-cursor'

const HomeLayout = ({children}: {
  children: React.ReactNode
}) => {
  const [isLoad, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2500)
  }, [])

  return (
      <NextUIProvider className="w-full h-full text-foreground bg-transparent cursor-none">
        <AnimatePresence mode="popLayout" initial={isLoad}>
          <ThemeProvider>
            <UserProvider>
              <AnimatedCursor
                  innerSize={8}
                  outerSize={9}
                  color='37, 99, 235'
                  outerAlpha={0.2}
                  innerScale={0.7}
                  outerScale={5}
                  clickables={[
                    'a',
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="number"]',
                    'input[type="submit"]',
                    'input[type="image"]',
                    'label[for]',
                    'select',
                    'textarea',
                    'button',
                    '.link',
                    {
                      target: '.about',
                      innerSize: 12,
                      outerSize: 12,
                      color: '255, 255, 255',
                      outerAlpha: 0.3,
                      innerScale: 0.7,
                      outerScale: 5
                    }
                  ]}
              />
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
                      <div className="flex-row justify-center items-center text-center">
                        <LogoAnimated/>
                      </div>
                    </div>
                )
              }
            </UserProvider>
          </ThemeProvider>
        </AnimatePresence>
      </NextUIProvider>

  )
}

export default HomeLayout