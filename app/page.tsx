'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!canvas || !root || !cursor || !ring) return

    const ctx = canvas.getContext('2d')!
    let animFrame: number
    let ringFrame: number
    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let ringX = 0, ringY = 0
    let hasMouse = false

    const resize = () => {
      canvas.width = root.offsetWidth
      canvas.height = root.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.35 + 0.05,
    }))

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        if (hasMouse) {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            p.vx -= (dx / dist) * 0.015
            p.vy -= (dy / dist) * 0.015
          }
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.4) { p.vx *= 0.4 / speed; p.vy *= 0.4 / speed }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
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
    }

    const loop = () => {
      drawParticles()
      animFrame = requestAnimationFrame(loop)
    }
    loop()

    const animateRing = () => {
      ringX += (curX - ringX) * 0.08
      ringY += (curY - ringY) * 0.08
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      ringFrame = requestAnimationFrame(animateRing)
    }
    animateRing()

    const onMouseMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      curX = mouseX
      curY = mouseY
      cursor.style.left = curX + 'px'
      cursor.style.top = curY + 'px'
    }
    const onMouseEnter = () => {
      hasMouse = true
      cursor.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const onMouseLeave = () => {
      hasMouse = false
      cursor.style.opacity = '0'
      ring.style.opacity = '0'
    }

    root.addEventListener('mousemove', onMouseMove)
    root.addEventListener('mouseenter', onMouseEnter)
    root.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animFrame)
      cancelAnimationFrame(ringFrame)
      window.removeEventListener('resize', resize)
      root.removeEventListener('mousemove', onMouseMove)
      root.removeEventListener('mouseenter', onMouseEnter)
      root.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const letters = 'ACURAVE'.split('')

  return (
    <main
      ref={rootRef}
      style={{
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Montserrat', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div ref={cursorRef} style={{
        position: 'absolute', width: 6, height: 6, background: '#fff',
        borderRadius: '50%', pointerEvents: 'none', transform: 'translate(-50%, -50%)',
        opacity: 0, transition: 'opacity 0.2s', zIndex: 100,
      }} />
      <div ref={ringRef} style={{
        position: 'absolute', width: 32, height: 32,
        border: '0.5px solid rgba(255,255,255,0.25)', borderRadius: '50%',
        pointerEvents: 'none', transform: 'translate(-50%, -50%)',
        opacity: 0, transition: 'opacity 0.2s', zIndex: 99,
      }} />

      {/* Coins */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: 20, height: 20, borderTop: '0.5px solid rgba(255,255,255,0.1)', borderLeft: '0.5px solid rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: 20, height: 20, borderBottom: '0.5px solid rgba(255,255,255,0.1)', borderRight: '0.5px solid rgba(255,255,255,0.1)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <div style={{ fontSize: 52, fontWeight: 200, letterSpacing: '0.35em', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex' }}>
          {letters.map((l, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: `fadeUp 0.5s ease forwards`,
                animationDelay: `${0.08 + i * 0.07}s`,
                opacity: 0,
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '3.5rem', animation: 'fadeIn 1s ease 1.2s forwards', opacity: 0 }}>
          Sound. Precision. Culture.
        </div>
        <div style={{ width: 32, height: 0.5, background: 'rgba(255,255,255,0.15)', marginBottom: '2.5rem', animation: 'fadeIn 1s ease 1.5s forwards', opacity: 0 }} />
        <div style={{ fontSize: 10, fontWeight: 300, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', animation: 'fadeIn 1s ease 1.8s forwards', opacity: 0 }}>
          Coming soon
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  )
}