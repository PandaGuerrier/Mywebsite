'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getClientSession } from '@/functions/getClientSession/getClientSession'
import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { deleteClientSession } from '@/functions/deleteClientSession/deleteClientSession'

const DashboardLayout = ({children}: { children: React.ReactNode }) => {

  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  useEffect(() => {
    (async () => {
      const {error, user} = await getClientSession()

      console.log(error?.message)

      if (error || !user || !user.role || user.role !== 'admin') {
        router.push('/')
        return
      } else {
        setIsAuthenticated(true)
      }

    })()
  }, [router])
  return (
      <NextUIProvider>
        {!isAuthenticated ? <div> Loading... </div> :
            <div>
              <header className="flex gap-4">
                <p className="font-bold"> navigation </p>
                <Button href='/dashboard' className="text-pink-700">Dashboard</Button>
                <Button href={'/settings'} className="text-pink-700">Settings</Button>
                <button onClick={() => signOut().then(() => router.push('/'))}> Sign Out</button>
              </header>

              {children}
            </div>
        }

      </NextUIProvider>
  )
}

async function signOut() {
  await deleteClientSession()
}

export default DashboardLayout