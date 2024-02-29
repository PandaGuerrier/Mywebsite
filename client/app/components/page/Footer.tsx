import React from 'react'
import { MovingBorderButton } from '@/app/components/ui/moving-border'
import { Meteors } from '@/app/components/ui/meteors'
import { Checkbox, Input } from '@nextui-org/react'
import { Boxes } from 'lucide-react'
import { cn } from '@/utils/cn'
import LogoAnimated from '@/app/components/animations/LogoAnimated'

export default function Footer() {

  return (
      <>
        <div className="h-96 w-full overflow-hidden border border-transparent border-t-gray-800 flex flex-col items-center justify-center rounded-t-lg mt-10">
          <div className={"h-full w-full max-w-5xl border border-transparent border-x-gray-800 p-5"}>
            <div className={"flex w-full justify-start items-center space-x-5"}>
              <LogoAnimated className={"h-[50px] w-[50px] border border-gray-800 rounded-md"}/>
              <p className={"font-black "}>Panda Guerrier's portfolio</p>
            </div>

            <div className={"flex w-full justify-center items-end h-fit bg-red-500"}>
              <p>Do with ❤️ by PandaGuerrier</p>
            </div>
          </div>
        </div>
      </>

  )
}