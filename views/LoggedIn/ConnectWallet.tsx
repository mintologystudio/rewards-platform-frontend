import { useCallback, useEffect, useContext } from 'react'
import SignMessage from './SignMessage'
import { providers } from 'ethers'
import Web3Modal from 'web3modal'
import Meta from '../../components/Meta'
import Navigation from '../../components/Navigation'
import styles from '../../styles/Login.module.scss'
import LoginPageImage from '../../public/assets/misc/login_page_image.svg'
import Image from 'next/image'
import { Web3Context } from '../../context/web3Context'
import { useWeb3Auth } from '../../utils/services/web3auth'
import Web3 from 'web3'
import providerOptions from '../../utils/config/web3Modal/Web3ProviderOptions'

// create new web3modal
let web3Modal: Web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

const ConnectWallet = () => {
  const { appState, appDispatch } = useContext(Web3Context)
  const { provider } = appState
  const { web3Auth } = useWeb3Auth()

  //get web3auth address
  const getInfos = async () => {
    if (!web3Auth || !web3Auth.provider) return ''
    const web3 = new Web3(web3Auth.provider as any)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
    // console.log("🚀 | getInfos | accounts", accounts[0]);
  }

  const connect = useCallback(async function () {
    const provider = await web3Modal.connect()
    const web3ModalProvider = new providers.Web3Provider(provider)
    const signer = web3ModalProvider.getSigner()
    const address_to_bind = await signer.getAddress()
    const network = await web3ModalProvider.getNetwork()
    const address_w3a = await getInfos()

    appDispatch({
      type: 'SET_WEB3_PROVIDER',
      provider: provider,
      web3ModalProvider: web3ModalProvider,
      address_to_bind: address_to_bind,
      address_w3a: address_w3a,
      chainId: network.chainId,
    });

  }, [appState.provider])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      appDispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        appDispatch({
          type: 'SET_ADDRESS',
          address_to_bind: accounts[0],
        })
      }

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />
      <main className={styles.main}>

          {appState.provider ? (
              <SignMessage
                  connector={appState.provider}
                  address_to_bind={appState.address_to_bind}
                  chainId={appState.chainId}
                  w3provider={provider}
              />
          ) : (
           <div className={styles.connect}>
            <span>Connect Your<br/>NFT Wallet</span>
            <br/>
            <p className={styles.connect_text}>Make sure you are connecting the wallet that is<br/>holding your NFT collection</p>
            <p className={styles.connect_text}>Each wallet can only be binded once to you<br/>web3auth account</p>
            <br/>
             <button onClick={connect}>Connect Wallet</button>

          </div>
          )}

        {/*<div className={styles.content}>*/}
        {/*  <div className={styles.lines}>*/}
        {/*    <div className={styles.lines_top_left_pink_object} />*/}
        {/*    /!* <div className={styles.lines_top_left_pink} /> *!/*/}
        {/*    /!* <div className={styles.lines_top_left_grey} /> *!/*/}
        {/*    <div className={styles.lines_bottom_right_pink} />*/}
        {/*    <div className={styles.lines_bottom_right_grey} />*/}
        {/*  </div>*/}
        {/*  <div className={styles.logo_image}>*/}
        {/*    <Image src={LoginPageImage} alt="LoginPageImage" layout="fill" />*/}
        {/*  </div>*/}
        {/*  <div className={styles.info}>*/}
        {/*    {appState.provider ? (*/}
        {/*      <div>*/}
        {/*        <SignMessage*/}
        {/*          connector={appState.provider}*/}
        {/*          address_to_bind={appState.address_to_bind}*/}
        {/*          chainId={appState.chainId}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    ) : (*/}
        {/*      <div className={styles.info_loggedin}>*/}
        {/*        <h2>Connect your NFT Wallet</h2>*/}
        {/*        <div className={styles.info_subheading}>*/}
        {/*          <ul>*/}
        {/*            <li>*/}
        {/*              Make sure you are connecting the wallet that is holding*/}
        {/*              your NFT collections*/}
        {/*            </li>*/}
        {/*            <li>*/}
        {/*              Each wallet can only be binded once to your web3auth*/}
        {/*              account*/}
        {/*            </li>*/}
        {/*          </ul>*/}
        {/*        </div>*/}
        {/*        <button onClick={connect}>Bind Wallet</button>*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}

      </main>
    </div>
  )
}

export default ConnectWallet
