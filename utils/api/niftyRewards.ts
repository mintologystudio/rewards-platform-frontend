import axios, { AxiosInstance } from 'axios'
import envConfig from '../envConfig'

const apiUrl = envConfig.API_URL

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const signMessageForBinding = async (
  web3AuthAddress: string,
  userAddress: string,
  chain: number,
  message: string,
  signature: string
) => {
  try {
    const data = JSON.stringify({
      address: web3AuthAddress,
      addressToBind: userAddress,
      chain: String(chain),
      message,
      signature,
    })
    const response: any = await api.post(`/api/v1/user/bind`, data)
    if (response.status == 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('[Error from niftyRewards API]: ', error)
    return false
  }
}
