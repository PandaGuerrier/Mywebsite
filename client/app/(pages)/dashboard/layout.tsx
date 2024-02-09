'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Link, NextUIProvider } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import LogoAnimated from '@/app/components/animations/LogoAnimated'
import { UserContext, UserProvider } from '@/app/hooks/useUser'
import { ThemeProvider } from '@/app/hooks/useTheme'
import AnimatedCursor from 'react-animated-cursor'
import { toast } from 'sonner'
import { getClientSession } from '@/functions/getClientSession/getClientSession'
import SideBar from '@/app/components/dashboard/SideBar'

const DashLayout = ({children}: {
  children: React.ReactNode
}) => {
  const {user, setUser} = useContext(UserContext)
  return (
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
        </motion.div>
        {
          user && user.is_admin ? (
              <div className={"h-full w-full"}>
                <SideBar>
                  {children}
                </SideBar>
              </div>
          ) : (
              <div className="flex justify-center items-center h-full bg-black">
                <div className="text-center ">
                  <p>
                    Not authorized
                  </p>
                  <Link href={"/"}>
                    Go back
                  </Link>
                </div>
              </div>
          )
        }
      </>
  )
}

export default DashLayout