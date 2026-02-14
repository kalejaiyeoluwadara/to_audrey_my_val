import { useState, useEffect } from 'react'

interface Heart {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 8,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-up"
          style={{
            left: `${h.x}%`,
            bottom: '-5%',
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-red-400"
            style={{ width: h.size, height: h.size, opacity: h.opacity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
