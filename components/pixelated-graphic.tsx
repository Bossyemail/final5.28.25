"use client"

import { useEffect, useRef } from 'react'

type PatternType = 
  | 'email' 
  | 'communication' 
  | 'efficiency'
  | 'docs'
  | 'timeline'
  | 'fire'
  | 'update'
  | 'offer'
  | 'followup'
  | 'emotion'

export type { PatternType }

interface PixelatedGraphicProps {
  pattern: PatternType
  isActive: boolean
}

export function PixelatedGraphic({ pattern, isActive }: PixelatedGraphicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = 8
    const width = 240
    const height = 240
    const cols = Math.floor(width / cellSize)
    const rows = Math.floor(height / cellSize)

    canvas.width = width
    canvas.height = height

    const drawPattern = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)

      // Draw pattern based on type
      if (pattern === 'email') {
        // Draw envelope shape
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            // Envelope shape logic
            const centerX = cols / 2
            const centerY = rows / 2
            const distX = Math.abs(col - centerX)
            const distY = Math.abs(row - centerY)
            
            // Envelope body (rectangle)
            if (distX < cols * 0.3 && distY < rows * 0.25) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Envelope flap (triangle)
            else if (distX + distY * 0.7 < cols * 0.35 && row < centerY - rows * 0.1) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'communication') {
        // Draw speech bubble
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            const distX = Math.abs(col - centerX)
            const distY = Math.abs(row - centerY)
            
            // Speech bubble body
            if (distX < cols * 0.25 && distY < rows * 0.2) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Speech bubble tail
            else if (distX < cols * 0.1 && row > centerY + rows * 0.15 && row < centerY + rows * 0.25) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'efficiency') {
        // Draw arrow/lightning bolt
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const progress = row / rows
            
            // Lightning/arrow shape
            if (Math.abs(col - centerX) < 3 + progress * 5 && row > rows * 0.2 && row < rows * 0.8) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'docs') {
        // Draw document/file icon
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            // Document rectangle
            if (col > cols * 0.25 && col < cols * 0.75 && row > rows * 0.15 && row < rows * 0.85) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Document corner fold
            if (col > cols * 0.7 && col < cols * 0.85 && row > rows * 0.15 && row < rows * 0.3) {
              ctx.fillStyle = '#ABABAB'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'timeline') {
        // Draw clock icon
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            const dist = Math.sqrt(Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2))
            
            // Clock circle
            if (dist < cols * 0.3 && dist > cols * 0.2) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Clock hands
            if (Math.abs(col - centerX) < 2 && row > centerY - rows * 0.15 && row < centerY) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'fire') {
        // Draw alert/fire icon
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            const distX = Math.abs(col - centerX)
            const distY = Math.abs(row - centerY)
            
            // Alert triangle
            if (distX + distY * 0.6 < cols * 0.25 && row > rows * 0.2 && row < rows * 0.8) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Exclamation mark
            if (distX < 2 && row > rows * 0.35 && row < rows * 0.65) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'update') {
        // Draw users/people icon - two circles connected by a line
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            const circleRadius = cols * 0.12
            
            // Left circle (person 1)
            const dist1 = Math.sqrt(Math.pow(col - (centerX - cols * 0.2), 2) + Math.pow(row - centerY, 2))
            // Right circle (person 2)
            const dist2 = Math.sqrt(Math.pow(col - (centerX + cols * 0.2), 2) + Math.pow(row - centerY, 2))
            // Connecting line between circles
            const lineY = centerY
            const lineX1 = centerX - cols * 0.2
            const lineX2 = centerX + cols * 0.2
            
            // Draw circles
            if (dist1 < circleRadius || dist2 < circleRadius) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Draw connecting line
            if (col >= lineX1 && col <= lineX2 && Math.abs(row - lineY) < 2) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'offer') {
        // Draw mail/envelope icon
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            const distX = Math.abs(col - centerX)
            const distY = Math.abs(row - centerY)
            
            // Envelope body
            if (distX < cols * 0.3 && distY < rows * 0.25) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Envelope flap
            else if (distX + distY * 0.7 < cols * 0.35 && row < centerY - rows * 0.1) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'followup') {
        // Draw arrow icon
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            
            // Arrow body
            if (Math.abs(col - centerX) < 4 && row > rows * 0.3 && row < rows * 0.7) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
            // Arrow head
            if (col > centerX + 2 && Math.abs(row - centerY) < Math.abs(col - centerX) * 0.5 && col < cols * 0.8) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      } else if (pattern === 'emotion') {
        // Draw heart icon
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * cellSize
            const y = row * cellSize
            
            const centerX = cols / 2
            const centerY = rows / 2
            const distX = (col - centerX) / (cols * 0.3)
            const distY = (row - centerY) / (rows * 0.3)
            
            // Heart shape approximation
            const heart = Math.pow(distX * distX + distY * distY - 1, 3) - distX * distX * distY * distY * distY
            if (heart < 0.1 && heart > -0.1) {
              ctx.fillStyle = '#161616'
              ctx.fillRect(x, y, cellSize, cellSize)
            }
          }
        }
      }
    }

    drawPattern()

    // Animate on activation
    if (isActive) {
      let frame = 0
      const animate = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, width, height)

        // Add subtle animation effect
        const offset = Math.sin(frame * 0.1) * 2
        drawPattern()
        
        frame++
        if (frame < 60) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  }, [pattern, isActive])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

