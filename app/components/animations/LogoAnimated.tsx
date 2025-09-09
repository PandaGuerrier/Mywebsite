import { motion, useAnimate } from 'framer-motion'
import React, { useEffect } from 'react'

interface Props {
  className?: string,
  loading?: boolean
}

export default function LogoAnimated({className}: Props) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    console.log('animate')
    const animateLoader = async () => {
      animate(
          [
            ['.head', {pathLength: 0, pathOffset: 1.1}],
            ['.head', {pathLength: 1.1, pathOffset: 0}],
            ['.head', {pathLength: 0, pathOffset: 0}]
          ],
          {duration: 2, repeat: Infinity, repeatDelay: 0.6}
      )
      animate(
          [
            ['.body', {pathLength: 0, pathOffset: 1.1}],
            ['.body', {pathLength: 1.1, pathOffset: 0}],
            ['.body', {pathLength: 0, pathOffset: 0}]
          ],
          {duration: 2, repeat: Infinity, repeatDelay: 0.6}
      )
    }

  animateLoader()
  }, [])


  return (
      <svg ref={scope}
           width="94.033241mm"
           height="29.361317mm"
           viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            className="body"
            initial={{pathLength: 0.5, pathOffset: 0.5}}
            d="M0 25.9888C0 19.8939 4.94091 14.9529 11.0358 14.9529V41H0V25.9888Z"
            fill={'white'}
        />
        <motion.path
            className="head"
            initial={{pathLength: 0, pathOffset: 1}}
            d="M31.16 7.47647C31.16 11.6056 27.8127 14.9529 23.6835 14.9529L11.0358 14.9529L11.0358 -1.30723e-06L23.6835 -4.85658e-07C27.8127 -2.17436e-07 31.16 3.34733 31.16 7.47647Z"
            fill={'white'}

        />
      </svg>

  )
}