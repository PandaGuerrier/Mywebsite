import { motion } from 'framer-motion'
import React from 'react'

export default function LogoAnimated() {

  const icon = {
    hidden: {
      pathLength: 1,
      fill: '#FFFFFF',
      border: '#FFFFFF'
    },
    visible: {
      pathLength: 1,
      fill: '#2563eb',
      border: '#FF0000'
    }
  }

  return (
      <svg width="527" height="223" viewBox="0 0 527 223" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            d="M152 33.5L230 116.5L333 0L526.5 222.5L333 60.5V161.974L257 131L190.25 187L230 131L152 74.5L121.5 127L111.5 120.5L94.5 161L87 127L0 179.5L64 116.5H92L152 33.5Z"
            variants={icon}
            initial="hidden"
            animate="visible"
        />
      </svg>
  )
}