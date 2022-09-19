import { useCallback, useEffect, useContext } from 'react'
import { Web3Context } from '../context/web3Context'
import { ethers } from 'ethers'

import Web3Modal from 'web3modal'
import envConfig from '../utils/envConfig'
import {
  RESET_WEB3_PROVIDER,
  SET_ADDRESS,
  SET_ADDRESS_PROVIDER,
  SET_WEB3_PROVIDER,
} from '../context/actionType'
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      },
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      rpc: {
        1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      },
    },
  },
}

let web3Modal: any
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
  })
}

const useWeb3Modal = () => {
  const { appState, appDispatch } = useContext(Web3Context)

  const initialConnect = useCallback(async () => {
    try {
      console.log(
        '[useWeb3Modal] Initiating initial connection with Web3Modal.'
      )
      await web3Modal.clearCachedProvider()
      const web3ModalProvider = await web3Modal.connect()
      // console.log('[useWeb3Modal] Web3ModalProvider: ', web3ModalProvider)
      // Only require wallet address from Web3Modal
      const provider = new ethers.providers.Web3Provider(web3ModalProvider)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()
      console.log('[useWeb3Modal] Wallet Address: ', provider)
      appDispatch({
        type: SET_ADDRESS_PROVIDER,
        value: {
          provider: web3ModalProvider,
          web3ModalProvider: provider,
          address_to_bind: address,
          chainId: network.chainId,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const connect = useCallback(async () => {
    try {
      console.log('[useWeb3Modal] Initiating past connection with Web3Modal.')
      const web3ModalProvider = await web3Modal.connect()
      // console.log('[useWeb3Modal] Web3ModalProvider: ', web3ModalProvider)
      // Only require wallet address from Web3Modal
      const provider = new ethers.providers.Web3Provider(web3ModalProvider)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()
      // console.log('provider: ', provider)
      console.log('Address: ', address)
      appDispatch({
        type: SET_ADDRESS_PROVIDER,
        value: {
          provider: web3ModalProvider,
          web3ModalProvider: provider,
          address_to_bind: address,
          chainId: network.chainId,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider()
    if (
      appState.provider?.disconnect &&
      typeof appState.provider.disconnect === 'function'
    ) {
      await appState.provider.disconnect()
    }

    appDispatch({
      type: RESET_WEB3_PROVIDER,
    })
  }, [appState.provider])

  useEffect(() => {
    console.log('[useWeb3Modal] useEffect', web3Modal.cachedProvider)
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [])

  useEffect(() => {
    if (appState.web3ModalProvider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts)

        appDispatch({
          type: SET_ADDRESS,
          address_to_bind: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error)
        disconnect()
      }

      appState.web3ModalProvider.on('accountsChanged', handleAccountsChanged)
      appState.web3ModalProvider.on('chainChanged', handleChainChanged)
      appState.web3ModalProvider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (appState.web3ModalProvider.removeListener) {
          appState.web3ModalProvider.removeListener(
            'accountsChanged',
            handleAccountsChanged
          )
          appState.web3ModalProvider.removeListener(
            'chainChanged',
            handleChainChanged
          )
          appState.web3ModalProvider.removeListener(
            'disconnect',
            handleDisconnect
          )
        }
      }
    }
  }, [appState.provider, disconnect])

  return { initialConnect, disconnect }
}

export default useWeb3Modal
