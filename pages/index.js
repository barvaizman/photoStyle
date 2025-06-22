import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import QuickContactForm from '../components/QuickContactForm'
import PopularAttractionsCarousel from '../components/PopularAttractionsCarousel'
import AdditionalServices from '../components/AdditionalServices'
import PackagesSection from '../components/PackagesSection'
import AttractionFamilies from '../components/AttractionFamilies'
import ConnectUs from '../components/connectUs'

export default function Home() {
  return (
    <>
      <Head>
        <title>PhotoStyle - עמדות צילום לאירועים</title>
        <meta name="description" content="אטרקציות צילום לבר מצוות, חתונות, אירועים עסקיים ועוד." />
        <meta name="keywords" content="עמדת צילום, מגנטים, בר מצווה, חתונה, עמדת מראה, עמדת 360, צילומי אירועים" />
      </Head>
      <main>
        <HeroSection />
        <QuickContactForm />
        <PopularAttractionsCarousel />
        <AdditionalServices />
        <PackagesSection />
        <AttractionFamilies />
        <ConnectUs />
      </main>
    </>
  )
}
