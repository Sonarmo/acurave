import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Acurave',
  description: 'Sound. Precision. Culture. — Label, listening sessions & expériences musicales.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body style={{ fontFamily: 'var(--font-montserrat), Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="25448121-8d35-427b-858b-85c1e873e95a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}