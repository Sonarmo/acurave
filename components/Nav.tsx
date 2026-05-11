'use client'

import { useState } from 'react'

const links = [
  { fr: 'Artistes',   en: 'Artists',  href: '#roster' },
  { fr: 'Soumettre',  en: 'Submit',   href: '#demo' },
  { fr: 'Événements', en: 'Events',   href: '#events' },
]

export default function Nav() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')

  return (
    <nav style={{
      position: 'relative', zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(16px,3vw,24px) clamp(20px,5vw,40px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{
        fontSize: 11, fontWeight: 300,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#fff',
      }}>
        Acurave
      </div>

      {/* Desktop links — hidden on small screens */}
      <div style={{
        display: 'flex', gap: 28,
      }} className="nav-links">
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
        {lang === 'fr' ? 'FR / EN' : 'EN / FR'}
      </button>

      <style>{`
        @media (max-width: 600px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  )
}
