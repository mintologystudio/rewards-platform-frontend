import { SafeEventEmitterProvider } from '@web3auth/base'
import { Web3Auth } from '@web3auth/web3auth'
import RPC from './ethersRPC'

export const getUserInfo = async (web3auth: Web3Auth | null) => {
  if (!web3auth) {
    console.log('web3auth not initialized yet')
    return
  }
  const user = await web3auth.getUserInfo()
  console.log(user)
}

export const getChainId = async (provider: SafeEventEmitterProvider | null) => {
  if (!provider) {
    console.log('provider not initialized yet')
    return
  }
  const rpc = new RPC(provider)
  const chainId = await rpc.getChainId()
  console.log(chainId)
}
export const getAccounts = async (
  provider: SafeEventEmitterProvider | null
) => {
  if (!provider) {
    console.log('provider not initialized yet')
    return
  }
  const rpc = new RPC(provider)
  const address = await rpc.getAccounts()
  console.log(address)
}

export const getBalance = async (provider: SafeEventEmitterProvider | null) => {
  if (!provider) {
    console.log('provider not initialized yet')
    return
  }
  const rpc = new RPC(provider)
  const balance = await rpc.getBalance()
  console.log(balance)
}

export const sendTransaction = async (
  provider: SafeEventEmitterProvider | null
) => {
  if (!provider) {
    console.log('provider not initialized yet')
    return
  }
  const rpc = new RPC(provider)
  const receipt = await rpc.sendTransaction()
  console.log(receipt)
}

export const signMessage = async (
  provider: SafeEventEmitterProvider | null
) => {
  if (!provider) {
    console.log('provider not initialized yet')
    return
  }
  const rpc = new RPC(provider)
  const signedMessage = await rpc.signMessage()
  console.log(signedMessage)
}

export const getPrivateKey = async (
  provider: SafeEventEmitterProvider | null
) => {
  if (!provider) {
    console.log('provider not initialized yet')
    return
  }
  const rpc = new RPC(provider)
  const privateKey = await rpc.getPrivateKey()
  console.log(privateKey)
}
