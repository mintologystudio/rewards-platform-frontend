/* eslint-disable no-case-declarations */
import {
  SET_WEB3_PROVIDER,
  SET_ADDRESS,
  SET_WEB3AUTH_ADDRESS,
  RESET_WEB3_PROVIDER, SET_ADDRESS_PROVIDER, CAMPAIGN_LIST, CAMPAIGN_LOADING, PERK_LIST, PERK_LOADING, BANNER_LIST, BANNER_LOADING,
} from '../actionType'
import {InitialAppContextState, IAppContextState, ICampaignDetail, IPerkDetail, IBannerDetail} from '.'

export type IAction =
  | {
    type: 'SET_WEB3_PROVIDER'
    provider: IAppContextState['provider']
    web3ModalProvider: IAppContextState['web3ModalProvider']
    address_to_bind: IAppContextState['address_to_bind']
    address_w3a: IAppContextState['address_w3a']
    chainId: IAppContextState['chainId']
  }
  | {
    type: 'SET_ADDRESS'
    address_to_bind: IAppContextState['address_to_bind']
  }
    | {
    type: 'SET_ADDRESS_PROVIDER'
    value: {
      provider: IAppContextState['provider']
      web3ModalProvider: IAppContextState['web3ModalProvider']
      address_to_bind: IAppContextState['address_to_bind']
      chainId: IAppContextState['chainId']
    }
  }
  | {
    type: 'SET_WEB3AUTH_ADDRESS'
    address_w3a: IAppContextState['address_w3a']
  }
  | {
    type: 'SET_CHAIN_ID'
    userOnChainId: IAppContextState['chainId']
  }
  | {
    type: 'RESET_WEB3_PROVIDER'
  }
  | {
    type: 'CAMPAIGN_LIST'
    campaign: ICampaignDetail
  }
  | {
    type: 'CAMPAIGN_LOADING'
    isLoading: ICampaignDetail['isLoading']
  }
  | {
    type: 'BANNER_LIST'
    banner: IBannerDetail
  }
  | {
    type: 'BANNER_LOADING'
    isLoading: IBannerDetail['isLoading']
  }
  | {
    type: 'PERK_LIST'
    perk: IPerkDetail
  }
  | {
    type: 'PERK_LOADING'
    isLoading: IPerkDetail['isLoading']
  }

const Web3Reducer = (
  state: IAppContextState,
  action: IAction
): IAppContextState => {
  switch (action.type) {
    case SET_WEB3_PROVIDER:
      return {
        ...state,
        chainId: action.chainId,
        provider: action.provider,
        web3ModalProvider: action.web3ModalProvider,
        address_to_bind: action.address_to_bind,
        address_w3a: action.address_w3a,
      }
    case SET_ADDRESS_PROVIDER:
      return {
        ...state,
        provider: action.value.provider,
        web3ModalProvider: action.value.web3ModalProvider,
        address_to_bind: action.value.address_to_bind,
        chainId: action.value.chainId,
      }
    case SET_ADDRESS:
      return {
        ...state,
        address_to_bind: action.address_to_bind,
      }
    case SET_WEB3AUTH_ADDRESS:
      return {
        ...state,
        address_w3a: action.address_w3a,
      }
    case CAMPAIGN_LIST:
      return {
        ...state,
        campaign: action.campaign,
      }
    case CAMPAIGN_LOADING:
      return {
        ...state,
        campaign: { ...state.campaign, isLoading: action.isLoading},
      }
    case BANNER_LIST:
      return {
        ...state,
        banner: action.banner,
      }
    case BANNER_LOADING:
      return {
        ...state,
        banner: { ...state.banner, isLoading: action.isLoading},
      }
    case PERK_LIST:
      return {
        ...state,
        perk: action.perk,
      }
    case PERK_LOADING:
      return {
        ...state,
        perk: { ...state.perk, isLoading: action.isLoading},
      }
    case RESET_WEB3_PROVIDER:
      return {
        ...InitialAppContextState,
        campaign: {...state.campaign}
      }
    default:
      return state
  }
}

export default Web3Reducer
