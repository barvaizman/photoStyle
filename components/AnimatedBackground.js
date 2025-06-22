import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50,
    rotation: Math.random() * 360,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "linear",
          }}
        >
          {shape.id % 3 === 0 ? (
            <div className="w-full h-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full" />
          ) : shape.id % 3 === 1 ? (
            <div className="w-full h-full bg-gradient-to-br from-pink-400/30 to-orange-400/30 transform rotate-45" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400/30 to-purple-400/30 transform rotate-12" />
          )}
        </motion.div>
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0, -30, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tl from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0],
          scale: [1, 0.9, 1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mouse Following Gradient - Only render on client side */}
      {isClient && (
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * (typeof window !== 'undefined' ? window.innerWidth : 1920) - 192,
            y: mousePosition.y * (typeof window !== 'undefined' ? window.innerHeight : 1080) - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        />
      )}

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Light Rays */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
          style={{
            left: `${20 + i * 15}%`,
            top: '-32px',
          }}
          animate={{
            y: [0, (typeof window !== 'undefined' ? window.innerHeight : 1080) + 32],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
} 