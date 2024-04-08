import React, { ReactNode, useContext, useState } from 'react'
import { UserContext } from '@/app/hooks/useUser'
import LogoAnimated from '@/app/components/animations/LogoAnimated'
import { Button, Link } from '@nextui-org/react'
import { getNulledUser } from '@/types/User'
import { deleteClientSession } from '@/functions/deleteClientSession/deleteClientSession'

export default function SideBar({ children }: { children: ReactNode }) {
  const { user, setUser } = useContext(UserContext)
  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState('Home')

  const links = [
    {
      name: 'Home',
      path: '/dashboard'
    },
    {
      name: 'Projects',
      path: '/dashboard/projects'
    },
    {
      name: 'Users',
      path: '/dashboard/users'
    },
    {
      name: 'Settings',
      path: '/dashboard/settings'
    },
  ]

  const handleLogout = async () => {
    await deleteClientSession()
    setUser(getNulledUser())
  }

  return (
      <div className={"fixed w-full bg-white dark:bg-black md:flex"}>




        <div className={"hidden md:block h-full max-h-screen border border-transparent border-r-gray-500"}>
            <div className={"flex justify-center items-center"}>
              <div className={"items-center"}>
              <div>
                <LogoAnimated className={"h-[100px] w-[100px]"} />
              </div>
              <h1 className={"text-white text-xl text-center"}>Dashboard</h1>
              </div>
            </div>
            <div className={"h-full mt-52"}>
              <div className={"flex justify-center w-full px-3 items-center"}>
                <div className={"space-y-5 items-center"}>
                  {links.map((link, index) => (
                      <Link href={link.path} key={index} className={"w-full"}>
                        <Button fullWidth  onClick={() => setSelected(link.name)} variant={selected == link.name ? "shadow" : "light"} color={"primary"} >
                          {link.name}
                        </Button>
                      </Link>
                  ))}
                </div>
              </div>

              <div className={"h-full items-end mt-[250px] py-5"}>
                <div className={"flex justify-center h-fit w-full place-items-end items-end"}>
                  <div className={"space-y-5 items-center w-full border border-transparent border-t-gray-500"}>
                    <p className={"text-xs text-center mt-2"}>
                      Connecté en tant que {user.email}
                    </p>

                    <div className={"flex space-x-5 px-2"}>
                      <Link href={"/"} className={"w-full"}>
                        <Button fullWidth  onClick={handleLogout} variant={"light"} color={"danger"} >
                          Déconnexion
                        </Button>
                      </Link>
                      <Link href={"/"} className={"w-full"}>
                        <Button fullWidth  variant={"light"} color={"primary"} >
                          Accueil
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
              </div>
          </div>
        <div className={"w-full h-screen overflow-auto"}>
          <div className={"border border-transparent border-b-gray-500 p-4 w-full bg-black"}>
            <h1 className={"text-2xl text-center"}>Bienvenue sur ton dashboard ma couille, {user.username}</h1>
            <div className={"md:hidden w-full h-[50px] bg-gray-950 mb-5 p-4"}>
              <Button fullWidth onClick={() => setOpen(!isOpen)}>Open nav</Button>
            </div>

            {
                isOpen && (
                    <div className={"md:hidden w-full h-full space-y-5 bg-black"}>
                      {links.map((link, index) => (
                          <Link href={link.path} key={index} className={"w-full"}>
                            <Button fullWidth  onClick={() => setSelected(link.name)} variant={selected == link.name ? "solid" : "bordered"} color={"primary"} >
                              {link.name}
                            </Button>
                          </Link>
                      ))}
                    </div>
                )
            }
          </div>
          <div className={"h-screen w-full text-foreground p-4 py-52 md:py-24"}>
            {children}
          </div>

        </div>
      </div>
  )
}