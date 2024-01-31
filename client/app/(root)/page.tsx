'use client'
import Spline from '@splinetool/react-spline'
import React from 'react'

export default function Home() {
  const [word, setWord] = React.useState("")
  const words = [
      "dart",
      "web",
      "bot",
  ]

  return (
      <>


        <div className="flex justify-center items-center h-full w-full bg-white dark:bg-black">
          <div className="items-center h-full w-full bg-white dark:bg-black">
            <div className={"w-full h-[450px] top-[-52px] z-10 hidden dark:block"}>
              <Spline scene="https://prod.spline.design/57u4Z7r2Ie7hjI7e/scene.splinecode" />
            </div>
            <div className={"w-full h-[450px] top-[-52px] z-10 block dark:hidden"}>
              <Spline scene="https://prod.spline.design/KNoPm7Q58JxYicUa/scene.splinecode" />
            </div>
            <div className="text-center space-y-5">
              <h1 className={"text-gray-500 text-3xl"}>French  <span className={""}> Mettre un effect de changement de text </span> developper</h1>

            </div>
          </div>


        </div>
      </>

  )
}
//