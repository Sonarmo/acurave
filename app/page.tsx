export default function Home() {
  return (
    <main style={{
      background: '#000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Montserrat', sans-serif",
      position: 'relative',
    }}>
      <div style={{ fontSize: '52px', fontWeight: 200, letterSpacing: '0.35em', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        Acurave
      </div>
      <div style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4rem' }}>
        Sound. Precision. Culture.
      </div>
      <div style={{ width: '32px', height: '0.5px', background: 'rgba(255,255,255,0.2)', marginBottom: '3rem' }} />
      <div style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
        Coming soon
      </div>
    </main>
  )
}