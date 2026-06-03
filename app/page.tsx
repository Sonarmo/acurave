'use client'

import StarField from '@/components/StarField'
import Nav from '@/components/Nav'
import WaveHero from '@/components/WaveHero'
import Ticker from '@/components/Ticker'
import Manifeste from '@/components/Manifeste'
import Roster from '@/components/Roster'
import Releases from '@/components/Releases'
import DemoForm from '@/components/DemoForm'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{
      background: '#080808',
      color: '#fff',
      minHeight: '100vh',
      overflowX: 'hidden',
      position: 'relative',
      cursor: 'none',
    }}>
      <StarField />
      <Nav />
      <WaveHero />
      <Ticker />
      <Manifeste />
      <Roster />
      <Releases />
      <DemoForm />
      <Newsletter />
      <Footer />
    </main>
  )
}
