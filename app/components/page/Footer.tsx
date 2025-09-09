import React from 'react'
import { Link } from '@nextui-org/react'
import LogoAnimated from '@/app/components/animations/LogoAnimated'
import SocialNetwork from '@/app/components/page/SocialNetwork'

export default function Footer() {
  const actualYear = new Date().getFullYear()

  return (
      <>
        <div className="w-full overflow-hidden border border-transparent border-t-gray-200 dark:border-t-gray-800 flex flex-col items-center justify-center rounded-t-lg mt-10">
          <div className={"h-full w-full max-w-5xl border border-transparent border-x-gray-200 dark:border-x-gray-800 p-5"}>
            <div className={"w-full h-full justify-start items-center"}>
              <div className={"flex items-center space-x-5"}>
                <p className={"font-black text-center w-full"}>Panda Guerrier's portfolio</p>
              </div>



            </div>
            <div className={"flex justify-center items-center w-full  text-xs md:text-base mt-10"}>

              <div className={"space-y-5"}>
                <div className={"flex justify-center space-x-5"}>
                  <p>Made with ❤️ by PandaGuerrier</p>
                  <p>|</p>
                  <p>©{actualYear} Panda Guerrier</p>
                </div>
                <div className={"w-full flex justify-center"}>
                  <SocialNetwork/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

  )
}