export default function Roster() {
  return (
    <section id="roster" style={{
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
        <div style={{
          fontSize: 10, letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.18)',
          textTransform: 'uppercase', lineHeight: 2, paddingTop: 2,
        }}>
          Artistes<br />
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>Roster</span>
        </div>
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.055)',
          }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{
                background: '#080808',
                padding: '28px 20px',
                minHeight: 110,
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              }}>
                <div style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase' }}>
                  Bientôt
                </div>
                <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.13)', textTransform: 'uppercase', marginTop: 6 }}>
                  — — —
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.16)', marginTop: 14, letterSpacing: '0.08em' }}>
            Le roster prend forme. Premiers artistes à venir.
          </p>
        </div>
      </div>
      <style>{`@media(max-width:600px){.two-col-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
