import { motion } from 'framer-motion'
import React from 'react'

export default function LogoAnimated() {

  function icon(color: string) {
    return {
      hidden: {
        pathLength: 1,
        fill: '#000000',
        border: '#FFFFFF'
      },
      visible: {
        pathLength: 1,
        fill: color,
        border: '#FF0000'
      }
    }
  }

  return (
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            d="M403.718 96.255L403.745 313.685L331.265 241.19V168.708L258.81 168.735L186.33 96.255H403.718Z"
            variants={icon('#3b82f6')}
            initial="hidden"
            animate="visible"/>
        <motion.path
            d="M313.67 403.745L241.19 331.265L168.735 331.292V258.81L96.2549 186.315L96.2824 403.745H313.67Z"
            variants={icon('#3b82f6')}
            initial="hidden"
            animate="visible"
            fill={"#000000"}
        />
        <motion.path
            d="M166.824 115.697L115.607 166.967L333.145 384.278L384.363 333.007L166.824 115.697Z"
            variants={icon('#3b82f6')}
            initial="hidden"
            animate="visible"/>
      </svg>

  )
}