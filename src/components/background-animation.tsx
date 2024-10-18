'use client'

import { motion } from 'framer-motion'

export function BackgroundAnimationComponent() {
  const bubbles = [
    { cx: "20%", cy: "20%", r: "15%", duration: 10, delay: 0 },
    { cx: "80%", cy: "30%", r: "10%", duration: 8, delay: 1 },
    { cx: "50%", cy: "50%", r: "20%", duration: 12, delay: 2 },
    { cx: "70%", cy: "70%", r: "12%", duration: 9, delay: 3 },
    { cx: "30%", cy: "80%", r: "8%", duration: 11, delay: 4 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {bubbles.map((bubble, index) => (
          <motion.circle
            key={index}
            cx={bubble.cx}
            cy={bubble.cy}
            r={bubble.r}
            fill="none"
            stroke="rgba(80, 130, 246, 4)"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay,
            }}
          />
        ))}
      </svg>
    </div>
  )
}