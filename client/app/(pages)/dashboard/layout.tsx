'use client'

import React, { useContext } from 'react'
import { Link } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { UserContext } from '@/app/hooks/useUser'
import SideBar from '@/app/components/dashboard/SideBar'

const DashLayout = ({children}: {
  children: React.ReactNode
}) => {
  const { user} = useContext(UserContext)
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