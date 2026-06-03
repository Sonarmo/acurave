const text = [
  'ACURAVE',
  '·',
  'LABEL INDÉPENDANT',
  '·',
  'SOUND',
  '·',
  'PRECISION',
  '·',
  'CULTURE',
  '·',
  'LISTENING SESSIONS',
  '·',
  'PARIS',
  '·',
  'SOVA',
  '·',
  'MIROIR NOIR',
  '·',
  'CASSANDRE LUFT',
  '·',
  'ELIN RØST',
  '·',
  'EXPÉRIENCES SONORES',
  '·',
]

const content = text.join('  ')

export default function Ticker() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 5,
      overflow: 'hidden',
      borderTop: '0.5px solid rgba(255,255,255,0.055)',
      borderBottom: '0.5px solid rgba(255,255,255,0.055)',
      padding: '11px 0',
      background: 'rgba(255,255,255,0.013)',
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'ticker 28s linear infinite',
        willChange: 'transform',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'inline-block',
            paddingRight: '4rem',
            fontSize: 9,
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.16)',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}>
            {content}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-33.333%) }
        }
      `}</style>
    </div>
  )
}
