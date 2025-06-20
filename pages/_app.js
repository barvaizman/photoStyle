import '../styles/globals.css'
import Header from '../components/Header'
import WhatsAppButton from '../components/WhatsAppButton'
import HeroSection from '../components/HeroSection'
import QuickContactForm from '../components/QuickContactForm'
import PopularAttractionsCarousel from '../components/PopularAttractionsCarousel'
import AdditionalServices from '../components/AdditionalServices'
import PackagesSection from '../components/PackagesSection'
import AttractionFamilies from '../components/AttractionFamilies'


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <HeroSection/>
      <QuickContactForm/>
      <PopularAttractionsCarousel/>
      <AdditionalServices/>
      <PackagesSection/>
      <AttractionFamilies/>
      <Component {...pageProps} />
      <WhatsAppButton />
    </>
  )
}