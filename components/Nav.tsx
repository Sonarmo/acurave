'use client'

import { useState, useEffect } from 'react'

const links = [
  { fr: 'Artistes',   en: 'Artists',  href: '#roster' },
  { fr: 'Sorties',    en: 'Releases', href: '#releases' },
  { fr: 'Soumettre',  en: 'Submit',   href: '#demo' },
  { fr: 'Événements', en: 'Events',   href: '#events' },
]

const nowPlaying = [
  'SOVA — Threshold',
  'Miroir Noir — Fracture II',
  'Cassandre Luft — Folio, pt. 3',
  'Elin Røst — Øst #4',
]

export default function Nav() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [npIndex, setNpIndex] = useState(0)
  const [npVisible, setNpVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setNpVisible(false)
      setTimeout(() => {
        setNpIndex(i => (i + 1) % nowPlaying.length)
        setNpVisible(true)
      }, 380)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav style={{
      position: 'relative', zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(16px,3vw,24px) clamp(20px,5vw,40px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      gap: 16,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 300,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#fff',
        flexShrink: 0,
      }}>
        Acurave
      </div>

      {/* Now Playing */}
      <div className="now-playing" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        flex: 1, minWidth: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 2,
              background: 'rgba(255,255,255,0.3)',
              borderRadius: 1,
              animation: `bar ${0.6 + i * 0.2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.15}s`,
            }} />
          ))}
        </div>
        <span style={{
          fontSize: 9,
          letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.22)',
          textTransform: 'uppercase',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          opacity: npVisible ? 1 : 0,
          transition: 'opacity 0.35s',
        }}>
          {nowPlaying[npIndex]}
        </span>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 28, flexShrink: 0 }} className="nav-links">
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            {lang === 'fr' ? l.fr : l.en}
          </a>
        ))}
      </div>

      <button onClick={() => setLang(p => p === 'fr' ? 'en' : 'fr')} style={{
        background: 'transparent',
        border: '0.5px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.25)',
        fontSize: 10,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '5px 10px',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'rgba(255,255,255,0.25)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
      }}
      >
        {lang === 'fr' ? 'FR' : 'EN'}
      </button>

      <style>{`
        @media (max-width: 680px) { .nav-links { display: none !important; } }
        @media (max-width: 480px) { .now-playing { display: none !important; } }
        @keyframes bar {
          from { height: 4px; }
          to   { height: 12px; }
        }
      `}</style>
    </nav>
  )
}
