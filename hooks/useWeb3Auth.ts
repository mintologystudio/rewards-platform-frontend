import { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import { SET_WEB3AUTH_ADDRESS } from '../context/actionType'
import { Web3Context } from '../context/web3Context'
import {useWeb3Auth} from "../utils/services/web3auth";

const useNewWeb3Auth = () => {
  const { appState: Web3State, appDispatch: Web3Dispatch } =
    useContext(Web3Context)
  const { web3Auth } = useWeb3Auth();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  )

  const initializeWeb3Context = async (
    web3AuthProvider: SafeEventEmitterProvider
  ) => {
    const provider = new ethers.providers.Web3Provider(web3AuthProvider)
    const { chainId } = await provider.getNetwork();
    const signer = provider.getSigner();
    const address_w3a = await signer.getAddress();

    Web3Dispatch({
      type: SET_WEB3AUTH_ADDRESS,
      address_w3a: address_w3a,
    })
  }

  const login = async () => {
    if (!web3Auth) {
      console.log('[useWeb3Auth] Web3Auth not initialized yet.')
      return
    }

    const web3AuthProvider = await web3Auth.connect();
    if (web3AuthProvider) {
      console.log('[useWeb3Auth] Web3Auth Provider exists.')
      await initializeWeb3Context(web3AuthProvider)
    }
  }

  const logout = async () => {
    if (!web3Auth) {
      console.log('web3Auth not initialized yet')
      return
    }
    await web3Auth.logout();
  }

  return { provider, login, logout, initializeWeb3Context }
}

export default useNewWeb3Auth
