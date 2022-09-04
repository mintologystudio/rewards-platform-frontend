import { useCallback, useEffect, useContext, useState } from 'react'
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
import providerOptions from '../utils/config/web3Modal/Web3ProviderOptions'

let web3Modal: any
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: false,
    providerOptions,
  })
}

const useSignMessage = () => {
  const { appState: Web3State } = useContext(Web3Context)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<string>('')

  const signMessage = async (message: string) => {
    setData('')
    setError('')
    setLoading(true)

    try {
      const signer = Web3State.provider.getSigner()
      const signature = await signer.signMessage(message)
      setData(signature)
      setLoading(false)
      return signature
    } catch (error: any) {
      setLoading(false)
      console.log('[Error from useSignMessage', error)
      setData('')
      setError(error.message)
      return ''
    }
  }
  return { data, loading, error, signMessage }
}

export default useSignMessage
