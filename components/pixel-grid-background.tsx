"use client"

import { useMemo } from 'react'

interface PixelGridBackgroundProps {
  className?: string
}

const COLS = 90  // width of the band
const ROWS = 10  // height of the band

type Pixel = {
  id: number
  toneClass: string
  duration: string
  delay: string
}

export function PixelGridBackground({ className = "" }: PixelGridBackgroundProps) {
  const pixels: Pixel[] = useMemo(() => {
    const total = COLS * ROWS

    return Array.from({ length: total }, (_, i) => {
      const r = Math.random()
      let toneClass = "bg-neutral-200"

      // few slightly darker pixels
      if (r < 0.06) toneClass = "bg-neutral-300"
      // even fewer darker
      if (r < 0.02) toneClass = "bg-neutral-400"
      // tiny number of almost-black squares
      if (r < 0.005) toneClass = "bg-neutral-900"

      // staggered timings so the band shimmers, not in sync
      const duration = `${1.4 + (i % 5) * 0.25}s`
      const delay = `${(i % 20) * 0.07}s`

      return {
        id: i,
        toneClass,
        duration,
        delay,
      }
    })
  }, [])

  return (
    <div className={`relative w-full overflow-visible ${className}`}>
      {/* Centered, bleeding band */}
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 scale-[1.1]">
        <div
          className="grid gap-[6px]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 6px)`,
            gridTemplateRows: `repeat(${ROWS}, 6px)`,
          }}
        >
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              data-pixel="true"
              className={`h-[6px] w-[6px] rounded-[1px] ${pixel.toneClass} animate-pixel-flicker`}
              style={{
                animationDuration: pixel.duration,
                animationDelay: pixel.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

