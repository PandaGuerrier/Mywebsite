import React from 'react'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import AuthModal from '@/app/components/auth/AuthModal'
import ThemeComponent from '@/app/components/ThemeComponent'
import { deleteClientSession } from '@/functions/deleteClientSession/deleteClientSession'
import { User } from '@/types/User'

type Props = {
  user: User
  setUser: any,
  theme: string,
  setTheme: any
}
export default function NavBar({ user, setUser, theme, setTheme }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [linkEnable, setLinkEnabled] = React.useState(0)

  const links = [
    {
      name: "Accueil",
      link: "/",
    },
    {
      name: "Créations",
      link: "#creations"
    },
    {
      name: "Contact",
      link: "#contact"
    }
  ]
  
  async function signOut() {
    await deleteClientSession()
    setUser({} as any)
  }

  return (
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="fixed dark:bg-black">
        <NavbarContent>
          <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">PANDA</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {
           links.map((item, index) => (
               <NavbarItem isActive={linkEnable === index} key={item.name}>
                 <Link color={linkEnable === index ? 'primary' : 'foreground'} href={item.link} aria-current="page" onClick={() => setLinkEnabled(index)}>
                   {item.name}
                 </Link>
               </NavbarItem>
           ))
          }
        </NavbarContent>
        <NavbarContent justify="end">
          {user.isConnected ?
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="faded">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Connecté en tant que </p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Paramètres</DropdownItem>
                {
                    user.role === 'admin' ?
                      <DropdownItem key="dashboard">Dashboard admin</DropdownItem>
                        :
                        <DropdownItem key="d" className={"hidden"}>Dashboard admin</DropdownItem>
                }
                <DropdownItem key="logout" color="danger" onClick={signOut}>
                  Déconnexion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </> :
          <>
            <AuthModal user={user} setUser={setUser} selectedStr="login" />
          </>
          }
          <ThemeComponent setTheme={setTheme} theme={theme}  />

        </NavbarContent>
        <NavbarMenu>
          {links.map((item, index) => (
              <NavbarMenuItem key={`${item.name}-${index}`}>
                <Link
                    color={
                      linkEnable === index ? 'primary' : 'foreground'
                    }
                    className="w-full"
                    href={item.link}
                    size="lg"
                    onClick={() => setLinkEnabled(index)}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
  );
}

//                       item.link == router.pathname ? "primary" : "foreground"