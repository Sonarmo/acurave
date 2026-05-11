'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <section id="events" style={{
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
        <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', lineHeight: 2, paddingTop: 2 }}>
          Événements<br />
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>Events</span>
        </div>
        <div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontWeight: 300, marginBottom: 22 }}>
            Listening sessions, releases, expériences.<br />
            Soyez parmi les premiers informés.
          </p>
          {subscribed ? (
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
              Vous êtes sur la liste. On se verra bientôt.
            </p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubscribed(true) }}>
              <div style={{ display: 'flex', maxWidth: 400 }}>
                <input type="email" placeholder="Votre email / Your email" required style={{
                  flex: 1,
                  background: 'transparent',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRight: 'none',
                  color: 'rgba(255,255,255,0.75)',
                  padding: '9px 13px',
                  fontSize: 13,
                  letterSpacing: '0.04em',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                <button type="submit" style={{
                  background: 'transparent',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.35)',
                  padding: '9px 16px',
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  S'inscrire
                </button>
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', marginTop: 10, letterSpacing: '0.06em' }}>
                Pas de spam. Uniquement ce qui mérite votre attention.
              </p>
            </form>
          )}
        </div>
      </div>
      <style>{`@media(max-width:600px){.two-col-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
