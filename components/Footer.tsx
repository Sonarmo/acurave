export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 5,
      padding: 'clamp(20px,3vw,28px) clamp(20px,5vw,40px)',
      borderTop: '0.5px solid rgba(255,255,255,0.055)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 10,
    }}>
      <div style={{ fontSize: 10, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.13)', textTransform: 'uppercase' }}>
        Acurave
      </div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.08em' }}>
        © {new Date().getFullYear()} — L'acuité d'écoute rencontre l'intensité de l'expérience.
      </div>
    </footer>
  )
}
