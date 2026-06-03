'use client'

import { useState } from 'react'
import { useInView } from '@/lib/useInView'

const releases = [
  {
    artist: 'SOVA',
    title: 'Threshold',
    year: '2024',
    genre: 'Electroacoustique',
    cover: {
      bg: 'linear-gradient(160deg, #0d0d0d 0%, #111418 100%)',
      el: <HLines />,
    },
  },
  {
    artist: 'Miroir Noir',
    title: 'Les Nuits Parallèles',
    year: '2024',
    genre: 'Post-punk expérimental',
    cover: {
      bg: '#080808',
      el: <Circles />,
    },
  },
  {
    artist: 'Cassandre Luft',
    title: 'Folio',
    year: '2023',
    genre: 'Drone / Ambient',
    cover: {
      bg: 'linear-gradient(135deg, #0a0a0a 0%, #131313 50%, #090909 100%)',
      el: <Diagonal />,
    },
  },
  {
    artist: 'Elin Røst',
    title: 'Øst',
    year: '2023',
    genre: 'Jazz contemporain',
    cover: {
      bg: '#080808',
      el: <Dots />,
    },
  },
  {
    artist: 'SOVA',
    title: 'Signal / Bruit',
    year: '2022',
    genre: 'Electroacoustique',
    cover: {
      bg: 'linear-gradient(180deg, #0b0b0b 0%, #0e0e0e 100%)',
      el: <Noise />,
    },
  },
  {
    artist: 'Various Artists',
    title: 'Compilation 001',
    year: '2022',
    genre: 'Label · Collectif',
    cover: {
      bg: '#080808',
      el: <Grid />,
    },
  },
]

function HLines() {
  return (
    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1="0" y1={12 + i * 6} x2="120" y2={12 + i * 6}
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      <line x1="0" y1="60" x2="120" y2="60" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
    </svg>
  )
}

function Circles() {
  return (
    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {[48, 36, 24, 14, 6].map((r, i) => (
        <circle key={i} cx="60" cy="60" r={r}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      ))}
      <circle cx="60" cy="60" r="2" fill="rgba(255,255,255,0.1)" />
    </svg>
  )
}

function Diagonal() {
  return (
    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <line x1="0" y1="120" x2="120" y2="0" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      <line x1="-12" y1="120" x2="108" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <line x1="12" y1="120" x2="132" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={0 - 24 + i * 24} y1="120" x2={120 - 24 + i * 24} y2="0"
          stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

function Dots() {
  return (
    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <circle key={`${row}-${col}`}
            cx={12 + col * 14} cy={12 + row * 14} r="0.8"
            fill={`rgba(255,255,255,${0.03 + ((row + col) % 3) * 0.025})`} />
        ))
      )}
    </svg>
  )
}

function Noise() {
  return (
    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="120" height="120" filter="url(#n)" opacity="0.06" />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1="0" y1={24 + i * 18} x2="120" y2={24 + i * 18}
          stroke="rgba(255,255,255,0.035)" strokeWidth={i === 2 ? "1" : "0.5"} />
      ))}
    </svg>
  )
}

function Grid() {
  return (
    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {[30, 60, 90].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}
      {[30, 60, 90].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="120" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}
      <rect x="30" y="30" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="1.5" fill="rgba(255,255,255,0.12)" />
    </svg>
  )
}

function Cover({ release, hovered }: { release: typeof releases[0]; hovered: boolean }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingTop: '100%',
      background: release.cover.bg,
      overflow: 'hidden',
      transition: 'opacity 0.3s',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        {release.cover.el}
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s',
      }}>
        <div style={{
          width: 36, height: 36,
          border: '0.5px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginLeft: 2 }}>▶</span>
        </div>
      </div>
    </div>
  )
}

export default function Releases() {
  const [hovered, setHovered] = useState<number | null>(null)
  const { ref, inView } = useInView()

  return (
    <section id="releases" ref={ref} style={{
      position: 'relative', zIndex: 5,
      padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,40px)',
      borderTop: '0.5px solid rgba(255,255,255,0.055)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(18px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(120px,15vw,180px) 1fr',
        gap: 'clamp(24px,4vw,48px)',
        alignItems: 'start',
        maxWidth: 900,
      }} className="two-col-grid">
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', lineHeight: 2, paddingTop: 2 }}>
            Sorties<br />
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>Releases</span>
          </div>
        </div>

        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'rgba(255,255,255,0.04)',
          }} className="releases-grid">
            {releases.map((r, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#080808',
                  transition: 'background 0.2s',
                }}
              >
                <Cover release={r} hovered={hovered === i} />
                <div style={{ padding: '12px 14px 16px' }}>
                  <div style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 5 }}>
                    {r.artist} &nbsp;·&nbsp; {r.year}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 200, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', fontStyle: 'italic' }}>
                    {r.genre}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .two-col-grid { grid-template-columns: 1fr !important; }
          .releases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 380px) {
          .releases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
