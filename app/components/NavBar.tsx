'use client'

import React from 'react'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import { ThemeContext } from '@/app/hooks/useTheme'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [linkEnable, setLinkEnabled] = React.useState(0)
  const {theme, toggleTheme} = React.useContext(ThemeContext)
  const [actualTheme, setActualTheme] = React.useState(theme)
  const t = useTranslations('nav')

  const links = [
    {
      name: t('home'),
      link: "#",
    },
    {
      name: t('about'),
      link: "#about"
    },
    {
      name: t('projects'),
      link: "#projects"
    },
    {
      name: t('contact'),
      link: "#contact"
    }
  ]

  const changeTheme = () => {
    const toggleThemed = toggleTheme()
    setActualTheme(toggleThemed)
    console.log(toggleThemed)

  }

  return (
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="fixed cursor-default" shouldHideOnScroll>
        <NavbarContent>
          <NavbarMenuToggle
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
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
          <LanguageSwitcher />
          <button
              onClick={() => changeTheme()}
              className="p-4 text-inherit">{
            actualTheme === 'dark' ? (
                <span>🌞</span>
            ) : (
                <span>🌙</span>
            )
          }</button>
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
