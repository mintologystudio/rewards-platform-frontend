import { useCallback, useEffect, useContext } from 'react'
import { Web3Context } from '../context/web3Context'
import { ethers } from 'ethers'

import Web3Modal from 'web3modal'
import envConfig from '../utils/envConfig'
import {
  RESET_WEB3_PROVIDER,
  SET_ADDRESS,
  SET_ADDRESS_PROVIDER,
  SET_WEB3_PROVIDER, SET_WEB3AUTH_ADDRESS,
} from '../context/actionType'
import providerOptions from '../utils/config/web3Modal/Web3ProviderOptions'
import Web3 from "web3";
import {useWeb3Auth} from "../utils/services/web3auth";

let web3Modal: Web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
  })
}

// TODO: 1. set address to localstorage, 2. Retrieve when refresh, 3. Connect if click to nft / perks if no provider

const BIND_MSG = (address_w3a: string, chainId: number, address_to_bind: string) => `Bind Account ${address_w3a} on chainId ${chainId} to ${address_to_bind}`;

const useWeb3Modal = () => {
  const { appState, appDispatch } = useContext(Web3Context);
  const { web3Auth, user } = useWeb3Auth();

  const initialConnect = useCallback(async () => {
    try {
      console.log(
        '[useWeb3Modal] Initiating initial connection with Web3Modal.'
      )
      await web3Modal.clearCachedProvider()
      const web3ModalProvider = await web3Modal.connect()
      // console.log('[useWeb3Modal] Web3ModalProvider: ', web3ModalProvider)
      // Only require wallet address from Web3Modal
      const provider = new ethers.providers.Web3Provider(web3ModalProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
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
  }, []);

  const getInfos = async () => {
    if (!web3Auth || !web3Auth.provider) return ''
    const web3 = new Web3(web3Auth.provider as any)
    const accounts = await web3.eth.getAccounts()
    // const authUser = await web3Auth.getUserInfo();
    // console.log("authUser", authUser, accounts);
    return accounts[0]
    // console.log("🚀 | getInfos | accounts", accounts[0]);
  }
  // getInfos();

  const getWeb3AuthAddress = useCallback(async () => {
    // console.log("getWeb3AuthAddress", appState.address_w3a, !appState.address_w3a)
    if (!appState.address_w3a) {
      const address_w3a = await getInfos();
      // console.log("getWeb3AuthAddress", address_w3a)
      appDispatch({
        type: SET_WEB3AUTH_ADDRESS,
        address_w3a: address_w3a,
      });
    }

  }, [user]);

  const connect = useCallback(async () => {
    try {
      console.log('[useWeb3Modal] Initiating past connection with Web3Modal.')
      const web3ModalProvider = await web3Modal.connect()
      // console.log('[useWeb3Modal] Web3ModalProvider: ', web3ModalProvider)
      // Only require wallet address from Web3Modal
      const provider = new ethers.providers.Web3Provider(web3ModalProvider)
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
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
      disconnect();
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
    });
  }, [appState.provider])

  useEffect(() => {
    console.log('[useWeb3Modal] useEffect', web3Modal.cachedProvider)
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [])

  useEffect(() => {
    if (appState.provider) {
      // console.log("getWeb3AuthAddress call")
      getWeb3AuthAddress();
    }

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
  }, [appState.provider, disconnect, user])

  return { initialConnect, disconnect, web3Modal }
}

export default useWeb3Modal
