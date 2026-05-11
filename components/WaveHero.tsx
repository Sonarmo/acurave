'use client'

import { useEffect, useRef } from 'react'

export default function WaveHero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => {
      canvas.width  = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let l = 0; l < 5; l++) {
        ctx.beginPath()
        const amp   = 16 + l * 10
        const freq  = 0.008 + l * 0.003
        const speed = 0.4 + l * 0.2
        const yBase = canvas.height * (0.38 + l * 0.065)
        ctx.strokeStyle = `rgba(255,255,255,${0.025 + l * 0.012})`
        ctx.lineWidth = 0.5
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = yBase
            + Math.sin(x * freq + t * speed) * amp
            + Math.sin(x * freq * 2.1 + t * speed * 1.3) * (amp * 0.38)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      t += 0.014
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const letters = 'ACURAVE'.split('')
  const titleSize = 'clamp(38px, 7vw, 62px)'

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'clamp(440px, 65vh, 620px)',
      overflow: 'hidden',
      zIndex: 2,
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none',
      }} />

      {/* Corner TL */}
      <div style={{
        position: 'absolute', top: '1.2rem', left: '1.2rem',
        width: 20, height: 20,
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        borderLeft: '0.5px solid rgba(255,255,255,0.08)',
      }} />
      {/* Corner BR */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', right: '1.2rem',
        width: 20, height: 20,
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        borderRight: '0.5px solid rgba(255,255,255,0.08)',
      }} />

      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(48px, 8vw, 96px) clamp(20px, 4vw, 48px)',
      }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.38em',
          color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
          marginBottom: 24, marginTop: 0,
          animation: 'fadeIn 1s ease 0s forwards',
          opacity: 0,
        }}>
          Label — Listening — Expériences
        </p>

        <h1 style={{
          display: 'flex', justifyContent: 'center',
          letterSpacing: '0.2em',
          margin: '0 0 16px',
        }}>
          {letters.map((l, i) => (
            <span key={i} style={{
              display: 'inline-block',
              fontSize: titleSize,
              fontWeight: 200,
              textTransform: 'uppercase',
              color: '#fff',
              animation: `fadeUp 0.5s ease forwards`,
              animationDelay: `${0.08 + i * 0.07}s`,
              opacity: 0,
            }}>
              {l}
            </span>
          ))}
        </h1>

        <p style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.28)',
          textTransform: 'uppercase',
          margin: 0,
          animation: 'fadeIn 1s ease 1.2s forwards',
          opacity: 0,
        }}>
          Sound &nbsp;·&nbsp; Precision &nbsp;·&nbsp; Culture
        </p>
      </div>
    </section>
  )
}
