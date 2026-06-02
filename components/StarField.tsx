'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const cursor = cursorRef.current
    const ring   = ringRef.current
    if (!canvas || !cursor || !ring) return

    const ctx = canvas.getContext('2d')!
    let animId: number
    let ringId: number
    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let ringX = 0, ringY = 0
    let hasMouse = false
    let touchX = 0, touchY = 0, hasTouch = false
    let scrollY = 0

    const getDocHeight = () => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    )

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = getDocHeight()
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', () => { scrollY = window.scrollY })

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * getDocHeight(),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r:  Math.random() * 1.2 + 0.2,
      a:  Math.random() * 0.32 + 0.05,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = hasMouse ? mouseX + window.scrollX : hasTouch ? touchX : -9999
      const my = hasMouse ? mouseY + scrollY        : hasTouch ? touchY + scrollY : -9999

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0)              p.x = canvas.width
        if (p.x > canvas.width)   p.x = 0
        if (p.y < 0)              p.y = canvas.height
        if (p.y > canvas.height)  p.y = 0

        if (hasMouse || hasTouch) {
          const dx = mx - p.x, dy = my - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < 90 && dist > 0) {
            p.vx -= (dx / dist) * 0.016
            p.vy -= (dy / dist) * 0.016
          }
        }

        const spd = Math.hypot(p.vx, p.vy)
        if (spd > 0.4) { p.vx *= 0.4 / spd; p.vy *= 0.4 / spd }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.hypot(dx, dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - d / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    const animRing = () => {
      ringX += (curX - ringX) * 0.08
      ringY += (curY - ringY) * 0.08
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      ringId = requestAnimationFrame(animRing)
    }
    animRing()

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      curX = e.clientX;  curY = e.clientY
      cursor.style.left = curX + 'px'
      cursor.style.top  = curY + 'px'

      if (!hasMouse) {
        hasMouse = true
        cursor.style.opacity = '1'
        ring.style.opacity   = '1'
      }
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        hasMouse = false
        cursor.style.opacity = '0'
        ring.style.opacity   = '0'
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      hasTouch = true
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    }
    const onTouchEnd = () => { hasTouch = false }

    document.addEventListener('mousemove',  onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove',  onTouchMove,  { passive: true })
    document.addEventListener('touchend',   onTouchEnd,   { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      cancelAnimationFrame(ringId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove',  onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove',  onTouchMove)
      document.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div ref={cursorRef} style={{
        position: 'fixed',
        width: 5, height: 5,
        background: '#fff',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.2s',
        zIndex: 200,
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        width: 28, height: 28,
        border: '0.5px solid rgba(255,255,255,0.22)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.2s',
        zIndex: 199,
      }} />
    </>
  )
}