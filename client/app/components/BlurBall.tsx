import { motion } from 'framer-motion'

export default function BlurBallComponent({ className } : { className: string }) {
  return (
      <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: -45, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className={"absolute h-14 w-[300px] md:w-[550px] rounded-full -z-10 rotate-45 blur-[100px] " + className}>
      </motion.div>
  )
}

//