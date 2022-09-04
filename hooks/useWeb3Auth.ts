import { SafeEventEmitterProvider } from '@web3auth/base'
import { Web3Auth } from '@web3auth/web3auth'
import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { SET_WEB3_PROVIDER } from '../context/actionType'
import { Web3Context } from '../context/web3Context'
import web3AuthConfig from '../utils/config/web3Auth/config'

const useWeb3Auth = () => {
  const { appState: Web3State, appDispatch: Web3Dispatch } =
    useContext(Web3Context)
  const [loading, setLoading] = useState<boolean>(false)
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  )

  const initializeWeb3Context = async (
    web3AuthProvider: SafeEventEmitterProvider
  ) => {
    const provider = new ethers.providers.Web3Provider(web3AuthProvider)
    const { chainId } = await provider.getNetwork()
    const signer = provider.getSigner()
    const address_w3a = await signer.getAddress()

    Web3Dispatch({
      type: SET_WEB3_PROVIDER,
      value: {
        chainId,
        provider,
        address_w3a: address_w3a,
      },
    })
  }

  const login = async () => {
    if (!web3auth) {
      console.log('[useWeb3Auth] Web3Auth not initialized yet.')
      return
    }

    const web3authProvider = await web3auth.connect()
    if (web3authProvider) {
      console.log('[useWeb3Auth] Web3Auth Provider exists.')
      await initializeWeb3Context(web3authProvider)
    }
    console.log('[useWeb3Auth]', web3authProvider)
    setProvider(web3authProvider)
  }

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      return
    }
    await web3auth.logout()
    setProvider(null)
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
        const web3auth = new Web3Auth(web3AuthConfig)
        setWeb3auth(web3auth)

        await web3auth.initModal()

        if (web3auth.provider) {
          console.log('[useWeb3Auth] Web3Auth Provider exists.')
          initializeWeb3Context(web3auth.provider)
          setProvider(web3auth.provider)
        }
      } catch (error) {}
      setLoading(false)
    }

    init()
  }, [])

  return { provider, login, logout }
}

export default useWeb3Auth
