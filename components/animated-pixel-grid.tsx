"use client"

import { useEffect, useRef } from 'react'

interface AnimatedPixelGridProps {
  rows?: number
  cols?: number
  className?: string
  intensity?: number
  animated?: boolean
}

export function AnimatedPixelGrid({ 
  rows = 10, 
  cols = 50, 
  className = "",
  intensity = 0.25,
  animated = false
}: AnimatedPixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let time = 0

    const initCanvas = () => {
      const rect = container.getBoundingClientRect()
      // Try multiple methods to get dimensions
      let width = rect.width
      let height = rect.height
      
      if (width === 0 || height === 0) {
        width = container.offsetWidth || container.clientWidth || window.innerWidth
        height = container.offsetHeight || container.clientHeight || 600
      }

      if (width === 0 || height === 0) {
        // Retry after a short delay if still no dimensions
        setTimeout(initCanvas, 100)
        return
      }

      canvas.width = width
      canvas.height = height

      const cellSize = 12 // Square size matching reference
      const actualCols = Math.ceil(width / cellSize)
      const actualRows = Math.ceil(height / cellSize)

      const draw = () => {
        // White background
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, width, height)

        for (let row = 0; row < actualRows; row++) {
          for (let col = 0; col < actualCols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            let gray: number
            
            if (animated) {
              const wave1 = Math.sin((col * 0.1) + (time * 0.002))
              const wave2 = Math.sin((row * 0.15) + (time * 0.003))
              const wave3 = Math.sin(((col + row) * 0.08) + (time * 0.0015))
              const combined = (wave1 + wave2 + wave3) / 3
              const opacity = (combined + 1) / 2 * intensity
              const baseGray = 250
              gray = Math.floor(baseGray - (opacity * 30))
            } else {
              // Pattern matching reference image exactly
              // 95-97% very light grey (almost white, subtle texture)
              // 3-5% darker squares (medium-dark grey to black, sparse)
              
              // Use consistent seeded random for each position
              const seed = ((row * 7919) + (col * 3571) + 12345) % 10000
              
              // Pattern: ~96% very light grey, ~4% darker (sparse)
              if (seed < 400) {
                // Darker squares - sparse distribution (4%)
                // Mix of black, very dark grey, and medium-dark grey
                if (seed < 80) {
                  gray = 20 // Pure black
                } else if (seed < 180) {
                  gray = 60 // Very dark grey
                } else if (seed < 280) {
                  gray = 100 // Dark grey
                } else {
                  gray = 140 // Medium-dark grey
                }
              } else {
                // Very light grey squares - the vast majority (96%)
                // Almost white but visible - creates subtle texture
                // TEMPORARILY MORE VISIBLE FOR TESTING - will dial back
                gray = 230 + (seed % 15) // Range: 230-244 (more visible for testing)
              }
            }
            
            // Draw square - exact positioning, no gaps
            ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`
            ctx.fillRect(x, y, cellSize, cellSize)
          }
        }

        if (animated) {
          time += 16
          animationFrame = requestAnimationFrame(draw)
        }
      }

      draw()

      const handleResize = () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
        initCanvas()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
        window.removeEventListener('resize', handleResize)
      }
    }

    // Initialize immediately and also on intersection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initCanvas()
        }
      })
    }, { threshold: 0.01 })

    if (container) {
      observer.observe(container)
    }

    // Initialize immediately
    initCanvas()

    return () => {
      observer.disconnect()
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [intensity, animated])

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: 'transparent',
        // TEMPORARY: Uncomment to see if container is rendering
        // border: '2px solid red'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ 
          opacity: 1,
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  )
}
