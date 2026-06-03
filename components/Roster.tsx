'use client'

import { useState } from 'react'
import { useInView } from '@/lib/useInView'

const artists = [
  {
    name: 'SOVA',
    genre: 'Electroacoustique',
    origin: 'Bruxelles',
    bio: "Compositions où la synthèse numérique rencontre l'acoustique de terrain. Une musique de friction entre matière et signal.",
    tags: ['Field recording', 'Synthesis', 'Live electronics'],
  },
  {
    name: 'Miroir Noir',
    genre: 'Post-punk expérimental',
    origin: 'Paris',
    bio: "Quatre musiciens qui refusent la catégorie. Des structures pop disloquées, une tension permanente entre noise et mélodie.",
    tags: ['No wave', 'Improvisation', 'Textures'],
  },
  {
    name: 'Cassandre Luft',
    genre: 'Drone / Ambient',
    origin: 'Lyon',
    bio: "Architecture sonore lente. Des pièces qui demandent du temps — et qui le rendent au centuple. Silence comme matériau.",
    tags: ['Drone', 'Minimalisme', 'Orgue'],
  },
  {
    name: 'Elin Røst',
    genre: 'Jazz contemporain',
    origin: 'Oslo / Paris',
    bio: "Contrebassiste et compositrice. Ses ensembles explorent la zone de contact entre improvisation dirigée et écriture ouverte.",
    tags: ['Jazz', 'Improvisation', 'Écriture'],
  },
]

export default function Roster() {
  const [active, setActive] = useState<number | null>(null)
  const { ref, inView } = useInView()

  return (
    <section
      id="roster"
      ref={ref}
      style={{
        position: 'relative', zIndex: 5,
        padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,40px)',
        borderTop: '0.5px solid rgba(255,255,255,0.055)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(18px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(120px,15vw,180px) 1fr',
        gap: 'clamp(24px,4vw,48px)',
        alignItems: 'start',
        maxWidth: 900,
      }} className="two-col-grid">
        <div style={{
          fontSize: 10, letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.18)',
          textTransform: 'uppercase', lineHeight: 2, paddingTop: 2,
        }}>
          Artistes<br />
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>Roster</span>
        </div>

        <div>
          {artists.map((a, i) => (
            <div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                borderBottom: '0.5px solid rgba(255,255,255,0.055)',
                padding: '18px 0',
                cursor: 'none',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 15, fontWeight: 200,
                    letterSpacing: '0.12em',
                    color: active === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)',
                    transition: 'color 0.2s',
                    textTransform: 'uppercase',
                  }}>
                    {a.name}
                  </span>
                  <span style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
                    {a.genre}
                  </span>
                </div>
                <span style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.2)',
                  transition: 'transform 0.25s',
                  display: 'inline-block',
                  transform: active === i ? 'rotate(45deg)' : 'none',
                  flexShrink: 0,
                }}>
                  +
                </span>
              </div>

              <div style={{
                maxHeight: active === i ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.38s ease',
              }}>
                <div style={{ paddingTop: 14 }}>
                  <p style={{
                    fontSize: 12, lineHeight: 1.85,
                    color: 'rgba(255,255,255,0.42)',
                    fontWeight: 300,
                    margin: '0 0 12px',
                    maxWidth: 460,
                  }}>
                    {a.bio}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    {a.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 8, letterSpacing: '0.16em',
                        color: 'rgba(255,255,255,0.22)',
                        border: '0.5px solid rgba(255,255,255,0.1)',
                        padding: '3px 8px',
                        textTransform: 'uppercase',
                      }}>
                        {t}
                      </span>
                    ))}
                    <span style={{
                      fontSize: 8, letterSpacing: '0.16em',
                      color: 'rgba(255,255,255,0.15)',
                      padding: '3px 0',
                      textTransform: 'uppercase',
                    }}>
                      — {a.origin}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.14)', marginTop: 18, letterSpacing: '0.08em' }}>
            D'autres artistes bientôt &mdash; le roster prend forme.
          </p>
        </div>
      </div>

      <style>{`@media(max-width:600px){.two-col-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
