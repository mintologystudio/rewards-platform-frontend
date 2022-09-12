import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '../styles/nprogress.scss'
import { Web3AuthProvider } from '../utils/services/web3auth'
import 'react-loading-skeleton/dist/skeleton.css'
import Web3ContextProvider from '../context/web3Context'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  NProgress.configure({ showSpinner: false })

  const web3AuthNetwork = 'mainnet'
  const chain = 'mainnet'

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <>
          <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
            <Web3ContextProvider >
              <Component {...pageProps}/>
            </Web3ContextProvider>
          </Web3AuthProvider>
    </>
  )
}

export default MyApp
