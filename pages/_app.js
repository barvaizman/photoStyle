// pages/_app.js
import '../styles/globals.css'
import Header from '../components/Header'
import ConnectUs from '../components/connectUs'
import SanityTest from '../components/SanityTest'
// import Footer from '../components/Footer' // אם יש
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.asPath])

  return (
    <>
      <SanityTest />
      <Header />
      <Component {...pageProps} />
      <ConnectUs />
    </>
  )
}
