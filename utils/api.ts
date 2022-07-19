import axios, { AxiosInstance } from 'axios'
import { IAssetData, IGasPrices, IOwnedNFTData, IParsedTx } from './interfaces'
import envConfig from './envConfig'

let apiUrl = envConfig.API_URL
let moralisAPIURL = 'https://deep-index.moralis.io/api/v2'

let config = {
  headers: {
    'X-API-Key': envConfig.MORALIS_API_KEY,
  },
}

const moralisApi: AxiosInstance = axios.create({
  baseURL: moralisAPIURL,
  timeout: 30000, // 30 secs
  headers: {
    'X-API-Key': envConfig.MORALIS_API_KEY,
  },
})

export const getTokensFromUser = async (
  userAddr: string,
  collectionAddr: string
): Promise<IOwnedNFTData[]> => {
  try {
    const response: any = await moralisApi.get(`/${userAddr}/nft/${collectionAddr}?chain=eth&format=decimal`)

    let tokens: IOwnedNFTData[] = response.data.result.map(async (res: any) => {
      try {
        if (!res.token_uri) {
          return {
            tokenId: 0,
            tokenImage: '',
          }
        }

        const _response = await axios.get(res.token_uri)

        return {
          tokenId: Number(res.token_id),
          tokenImage: _response.data.image,
        }
      } catch (error) {
        return {
          tokenId: 0,
          tokenImage: '',
        }
      }
    })

    return await Promise.all(tokens)
  } catch (error) {
    return []
  }
}

// TODO: To change the following API calls into Moralis instead
const api: AxiosInstance = axios.create({
  baseURL: 'https://ethereum-api.xyz',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export async function apiGetAccountAssets(
  address: string,
  chainId: number
): Promise<IAssetData[]> {
  const response = await api.get(
    `/account-assets?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number
): Promise<IParsedTx[]> {
  const response = await api.get(
    `/account-transactions?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetAccountNonce = async (
  address: string,
  chainId: number
): Promise<string> => {
  const response = await api.get(
    `/account-nonce?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const response = await api.get(`/gas-prices`)
  const { result } = response.data
  return result
}
