'use client'

import React, { useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Navbar from '../components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import { UserProvider } from '@/app/hooks/useUser'
import { ThemeProvider } from '@/app/hooks/useTheme'

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
            <UserProvider>

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
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400"/>
                        </div>
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