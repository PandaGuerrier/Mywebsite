import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export type Theme = 'dark' | 'light'
export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (theme: Theme) => {},
  toggleTheme: () => {}
})

export function ThemeProvider({children}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    setTheme(localTheme as Theme || 'dark')

    console.log( "theme : " + theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
      <ThemeContext.Provider value={{
        theme: 'dark',
        setTheme: (theme: Theme) => {
          setTheme(theme)
        },
        toggleTheme: () => {
          setTheme(theme === 'dark' ? 'light' : 'dark')

          if (theme === 'dark') {
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
          } else {
            window.localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
          }

          toast.success("Changement pour le thème " + theme + " !", {
            position: "bottom-right",
            duration: 5000,
          })
        }
      }}>
        {children}
      </ThemeContext.Provider>
  )
}
