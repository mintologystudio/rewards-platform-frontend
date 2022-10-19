import axios, {AxiosError, AxiosInstance} from 'axios'
import envConfig from '../envConfig'

// const apiUrl = envConfig.API_URL
const apiUrl = `https://mintology-backend.herokuapp.com/`

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
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
    const data: any = (error as AxiosError)?.response?.data;
    return { status: false, message: data?.message};
  }
}

export const refreshAddress = async (
  bindAddress: string
) => {
  try {
    const response: any = await api.get(`/api/v1/user/refresh?address=${bindAddress}`)
    if (response.status == 200) {
      // console.log("success refreshAddress", response);
      return { status: true, data: response.data.message};
    } else {
      console.log("failed refreshAddress", response);
      return { status: false, data: response.data.message};
    }
  } catch (error) {
    console.log('[Error from refreshAddress API]: ', error)
    return { status: false};
  }
}

export const getNFTs = async (
  bindAddress: string
) => {
  try {
    const response: any = await api.get(`/api/v1/user/nfts?address=${bindAddress}`)
    if (response.status == 200) {
      // console.log("success NiftyReward", response);
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

export const getCampaigns = async () => {
  try {
    const response: any = await api.get(`/api/v1/campaign`)
    if (response.status == 200) {
      // console.log("success getCampaigns", response);
      return { status: true, campaigns: response.data.data};
    } else {
      console.log("failed getCampaigns", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from getCampaigns API]: ', error)
    return { status: false};
  }
}

export const getCampaign = async (
    _id: string
) => {
  try {
    const response: any = await api.get(`/api/v1/campaign?campaignId=${_id}`)
    if (response.status == 200) {
      // console.log("success getCampaign", response);
      return { status: true, campaign: response.data.data, message: response.data.message};
    } else {
      console.log("failed getCampaign", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from getCampaign API]: ', error)
    return { status: false};
  }
}

export const redeemBefore = async (
    web3AuthAddress: string,
    _id: string
) => {
  try {
    const response: any = await api.get(`/api/v1/reward/hasClaimed?address=${web3AuthAddress}&campaignId=${_id}`)
    if (response.status == 200) {
      // console.log("success redeemBefore", response);
      return { status: true, hasClaimed: response.data.hasClaimed, message: response.data.message};
    } else {
      console.log("failed redeemBefore", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from redeemBefore API]: ', error)
    return { status: false};
  }
}

export const redeemCampaign = async (
    web3AuthAddress: string,
    _id: string
) => {
  try {
    const data = JSON.stringify({
      address: web3AuthAddress,
      campaignId: _id
    });
    const response: any = await api.put(`/api/v1/reward/redeem`, data)
    if (response.status == 200) {
      // console.log("success redeemCampaign", response);
      return { status: true, voucher: response.data.data, message: response.data.message};
    } else {
      console.log("failed redeemCampaign", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from redeemCampaign API]: ', error)
    return { status: false};
  }
}

export const getPerks = async (
    web3AuthAddress: string
) => {
  try {
    const response: any = await api.get(`/api/v1/reward/userRewards?address=${web3AuthAddress}`)
    if (response.status == 200) {
      console.log("success getPerks", response);
      return { status: true, perks: response.data.data};
    } else {
      console.log("failed getPerks", response);
      return { status: false};
    }
  } catch (error) {
    console.log('[Error from getPerks API]: ', error)
    return { status: false};
  }
}
