import axios, { AxiosInstance } from 'axios'
import envConfig from '../envConfig'
import { IOwnedNFTData } from '../interfaces'

const apiUrl = 'https://deep-index.moralis.io/api/v2'

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
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
    const response: any = await api.get(
      `/${userAddr}/nft/${collectionAddr}?chain=eth&format=decimal`
    )

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
