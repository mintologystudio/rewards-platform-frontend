import axios, { AxiosInstance } from 'axios'
import envConfig from '../envConfig'

const apiUrl = envConfig.API_URL

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const DELIMETER = ' binded to ';

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
    });
    const response: any = await api.post(`/api/v1/user/bind`, data)
    if (response.status == 200) {
      console.log("success NiftyReward", response);
      const bindAddress = (response.data.message)
          .split(DELIMETER)[(response.data.message).split(DELIMETER).length-1];
      console.log("bindAddress", bindAddress);
      return { status: true, bind_address: bindAddress};
    } else {
      console.log("failed NiftyReward", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from niftyRewards API]: ', error)
    return { status: false};
  }
}

export const getNFTs = async (
  bindAddress: string
) => {
  try {
    const response: any = await api.get(`/api/v1/user/nfts?address=${bindAddress}`)
    if (response.status == 200) {
      console.log("success NiftyReward", response);
      // const bindAddress = (response.data.message)
      //     .split(DELIMETER)[(response.data.message).split(DELIMETER).length-1];
      // console.log("bindAddress", bindAddress);
      return { status: true, nfts: response.data.nfts};
    } else {
      console.log("failed NiftyReward", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from niftyRewards API]: ', error)
    return { status: false};
  }
}
