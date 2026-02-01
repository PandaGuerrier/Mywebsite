'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  className?: string
}

export default function LogoAnimated({ className }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center gap-8 ${className}`}>
      {/* Logo / Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-500 tracking-tight">
          LOFFICIAL
        </h1>
      </motion.div>

      {/* Loading bar */}
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-pink-500 rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}
