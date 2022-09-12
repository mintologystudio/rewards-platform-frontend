/* eslint-disable no-case-declarations */
import {
  SET_WEB3_PROVIDER,
  SET_ADDRESS,
  SET_WEB3AUTH_ADDRESS,
  RESET_WEB3_PROVIDER, SET_ADDRESS_PROVIDER,
} from '../actionType'
import { InitialAppContextState, IAppContextState } from '.'

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
    case RESET_WEB3_PROVIDER:
      return InitialAppContextState
    default:
      return state
  }
}

export default Web3Reducer
