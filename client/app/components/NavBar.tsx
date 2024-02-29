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
import { getNulledUser, User } from '@/types/User'
import { UserContext } from '@/app/hooks/useUser'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [linkEnable, setLinkEnabled] = React.useState(0)
  const { user, setUser } = React.useContext(UserContext)

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About me",
      link: "#about"
    },
    {
      name: "Creations",
      link: "#creations"
    },
    {
      name: "Contact",
      link: "#contact"
    }
  ]
  
  async function signOut() {
    await deleteClientSession()
    setUser(getNulledUser())
  }

  function redirect(url: string)  {
    window.location.href = url
  }

  return (
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="fixed" shouldHideOnScroll>
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
                  <p className="font-semibold">Connected as </p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                {
                    user.role === 'admin' ?
                      <DropdownItem onClick={() => redirect("/dashboard")} key="dashboard">Dashboard</DropdownItem>
                        :
                        <DropdownItem key="d" className={"hidden"}>Dashboard</DropdownItem>
                }
                <DropdownItem key="logout" color="danger" onClick={signOut}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </> :
          <>
            <AuthModal selectedStr="login" />
          </>
          }

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