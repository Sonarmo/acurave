'use client'

import { useState } from 'react'

const genres = ['Électronique', 'Jazz', 'Rock / Post-rock', 'Ambient / Expérimental', 'Autre']

const field: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '0.5px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.75)',
  padding: '9px 13px',
  fontSize: 13,
  letterSpacing: '0.04em',
  outline: 'none',
  WebkitAppearance: 'none',
  appearance: 'none',
  borderRadius: 0,
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

export default function DemoForm() {
  const [sent, setSent] = useState(false)

  return (
    <section id="demo" style={{
      position: 'relative', zIndex: 5,
      padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,40px)',
      borderTop: '0.5px solid rgba(255,255,255,0.055)',
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
            Soumettre une démo<br />
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>Submit a demo</span>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', lineHeight: 1.7, letterSpacing: '0.05em', marginTop: 12 }}>
            Nous écoutons tout.<br />
            Nous répondons à ce qui retient notre attention.
          </p>
        </div>

        {sent ? (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', paddingTop: 8 }}>
            Message reçu. On écoute.
          </p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ maxWidth: 460 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }} className="form-row">
              <div>
                <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 7 }}>Nom / artiste</label>
                <input style={field} type="text" placeholder="Nom d'artiste" required
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 7 }}>Email</label>
                <input style={field} type="email" placeholder="contact@..." required
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 7 }}>Genre / approche</label>
              <select style={field} required
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'}
                onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                <option value="">Sélectionner...</option>
                {genres.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 7 }}>Lien (Soundcloud, Bandcamp, Drive...)</label>
              <input style={field} type="url" placeholder="https://..." required
                onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 7 }}>En quelques mots</label>
              <textarea style={{ ...field, resize: 'none', height: 76 }} placeholder="Qui tu es, ce que tu cherches, ce que tu proposes..." required
                onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>

            <button type="submit" style={{
              background: 'transparent',
              border: '0.5px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.5)',
              padding: '11px 26px',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: 6,
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';  e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
            >
              Envoyer →
            </button>
          </form>
        )}
      </div>
      <style>{`
        @media(max-width:600px){
          .two-col-grid{grid-template-columns:1fr!important}
          .form-row{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
