import { useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { LightIcon } from '@/app/components/icons/LightIcon'
import { DarkIcon } from '@/app/components/icons/DarkIcon'
import { toast } from 'sonner'

type Props = {
  theme: string,
  setTheme: any
}
export default function ThemeComponent({ theme, setTheme }: Props) {

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
      toast.success("Changement pour le thème dark !", {
        position: "bottom-right",
        duration: 5000,
      })
      window.localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      toast.success("Changement pour le thème light !", {
        position: "bottom-right",
        duration: 5000,
      })
      window.localStorage.setItem('theme', 'light')
    }
  }

  return (
      <div>
        <Button isIconOnly onClick={toggleTheme} color={'primary'}>
          {theme === 'light' ? <DarkIcon /> : <LightIcon />}
        </Button>
      </div>
  )
}