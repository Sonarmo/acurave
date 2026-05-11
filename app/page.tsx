'use client'

import StarField from '@/components/StarField'
import Nav from '@/components/Nav'
import WaveHero from '@/components/WaveHero'
import Manifeste from '@/components/Manifeste'
import Roster from '@/components/Roster'
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
      <Manifeste />
      <Roster />
      <DemoForm />
      <Newsletter />
      <Footer />
    </main>
  )
}
