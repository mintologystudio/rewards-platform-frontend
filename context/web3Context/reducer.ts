import {
  SET_WEB3_PROVIDER,
  SET_ADDRESS,
  SET_WEB3AUTH_ADDRESS,
  RESET_WEB3_PROVIDER,
  SET_ADDRESS_PROVIDER,
  SET_CHAIN_ID,
} from '../actionType'
import { InitialAppContextState, IAppContextState } from '.'

export type IAction =
  | {
      type: typeof SET_WEB3_PROVIDER
      value: {
        provider: IAppContextState['provider']
        address_w3a: IAppContextState['address_w3a']
        chainId: IAppContextState['chainId']
      }
    }
  | {
      type: typeof SET_ADDRESS
      value: {
        address_to_bind: IAppContextState['address_to_bind']
      }
    }
  | {
      type: typeof SET_WEB3AUTH_ADDRESS
      value: {
        address_w3a: IAppContextState['address_w3a']
      }
    }
  | {
      type: typeof SET_CHAIN_ID
      value: {
        userOnChainId: IAppContextState['chainId']
      }
    }
  | {
      type: typeof RESET_WEB3_PROVIDER
    }
  | {
      type: typeof SET_ADDRESS_PROVIDER
      value: {
        web3ModalProvider: IAppContextState['web3ModalProvider']
        address_to_bind: IAppContextState['address_to_bind']
      }
    }

const Web3Reducer = (
  state: IAppContextState,
  action: IAction
): IAppContextState => {
  switch (action.type) {
    case SET_WEB3_PROVIDER:
      return {
        ...state,
        chainId: action.value.chainId,
        provider: action.value.provider,
        address_w3a: action.value.address_w3a,
      }
    case SET_ADDRESS_PROVIDER:
      return {
        ...state,
        web3ModalProvider: action.value.web3ModalProvider,
        address_to_bind: action.value.address_to_bind,
      }
    case SET_ADDRESS:
      return {
        ...state,
        address_to_bind: action.value.address_to_bind,
      }
    case SET_WEB3AUTH_ADDRESS:
      return {
        ...state,
        address_w3a: action.value.address_w3a,
      }
    case RESET_WEB3_PROVIDER:
      return InitialAppContextState
    default:
      return state
  }
}

export default Web3Reducer
