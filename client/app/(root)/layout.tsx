'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClientSession } from '@/functions/getClientSession/getClientSession'
import { NextUIProvider } from '@nextui-org/react'
import Navbar from '../components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import { getNulledUser, User } from '@/types/User'
import LogoAnimated from '@/app/components/animations/LogoAnimated'

const HomeLayout = ({children}: { children: React.ReactNode }) => {
  const router = useRouter()
  const [getUser, setUser] = useState<User>(getNulledUser())
  const [isLoad, setLoading] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    (async () => {
      const user = await getClientSession()
      if (user) {
        setUser(user)
      }
      setTimeout(() => {
        setLoading(true)
      }, 1000)
    })()
  }, [router])

  const modifiedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { user : getUser, setUser: setUser });
    }
    return child;
  });



  if (!isLoad) {
    return (
        <div className="flex justify-center items-center h-full bg-slate-900">
          <div className="flex-row justify-center items-center text-center">
             <LogoAnimated />
          </div>
        </div>
    )
  } else {
    return (
        <NextUIProvider className="w-full h-full text-foreground bg-black ">
          <AnimatePresence mode="popLayout" initial={isLoad}>
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
              <Navbar user={getUser} setUser={setUser} theme={theme} setTheme={setTheme}/>
            </motion.div>
            {modifiedChildren}
          </AnimatePresence>
        </NextUIProvider>
    )
  }
}

export default HomeLayout