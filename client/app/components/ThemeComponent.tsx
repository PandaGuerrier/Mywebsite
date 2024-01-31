import { useContext, useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { LightIcon } from '@/app/components/icons/LightIcon'
import { DarkIcon } from '@/app/components/icons/DarkIcon'
import { toast } from 'sonner'
import { Theme, ThemeContext } from '@/app/hooks/useTheme'

export default function ThemeComponent() {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    setTheme(localTheme as Theme || 'dark')

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

    return (
        <div>
          <Button isIconOnly onClick={toggleTheme} color={'primary'}>
            {
              theme === 'dark' ? <LightIcon /> : <DarkIcon />
            }
          </Button>
        </div>
    )
}