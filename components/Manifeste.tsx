const S = {
  section: {
    position: 'relative' as const,
    zIndex: 5,
    padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,40px)',
    borderTop: '0.5px solid rgba(255,255,255,0.055)',
  },
  grid: {
    display: 'grid' as const,
    gridTemplateColumns: 'clamp(120px,15vw,180px) 1fr',
    gap: 'clamp(24px,4vw,48px)',
    alignItems: 'start',
    maxWidth: 900,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.18)',
    textTransform: 'uppercase' as const,
    lineHeight: 2,
    paddingTop: 2,
  },
}

export default function Manifeste() {
  return (
    <section style={S.section}>
      <div style={S.grid} className="two-col-grid">
        <div style={S.sectionLabel}>
          Ce qu'on est<br />
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>What we are</span>
        </div>
        <div>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300, margin: '0 0 14px' }}>
            Le genre n'est pas une frontière. L'exigence, si.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.48)', fontWeight: 300, margin: '0 0 14px' }}>
            Acurave est un label fondé sur une conviction simple : certaines musiques méritent
            d'être entendues vraiment. Pas en fond sonore. Pas en scroll.
          </p>
          <div style={{ width: 28, height: '0.5px', background: 'rgba(255,255,255,0.13)', margin: '20px 0' }} />
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.48)', fontWeight: 300, margin: '0 0 14px' }}>
            Nous sélectionnons des artistes — électronique, jazz, rock, peu importe — et créons
            des espaces d'écoute qui font honneur à leur travail.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.05em', fontStyle: 'italic', margin: 0 }}>
            The genre is not the boundary. The standard is.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .two-col-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
