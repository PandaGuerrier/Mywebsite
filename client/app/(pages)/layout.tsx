'use client'

import React, { useContext, useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import LogoAnimated from '@/app/components/animations/LogoAnimated'
import { UserContext, UserProvider } from '@/app/hooks/useUser'
import { ThemeProvider } from '@/app/hooks/useTheme'
import AnimatedCursor from 'react-animated-cursor'
import { toast } from 'sonner'
import { getClientSession } from '@/functions/getClientSession/getClientSession'

const DashLayout = ({children}: {
  children: React.ReactNode
}) => {
  const [isLoad, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2500)
  }, [])

  return (
      <NextUIProvider className="w-full h-full text-foreground bg-transparent">
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
                          className={"h-full w-full"}
                      >
                        {children}
                      </motion.div>
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

export default DashLayout