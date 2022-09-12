import { useReducer } from "react";
import {SET_WEB3_PROVIDER} from "../context/actionType";

export const ACT_SET_REDIRECT = 'SET_REDIRECT';
export const ACT_SET_LOGEDIN = 'SET_LOGEDIN';
export const ACT_SET_CONNECTED_ADDR = 'SET_CONNECTED_ADDR';

export type IAction =
    | {
    type: 'SET_CONNECTED_ADDR'
    provider: IAppContextState['provider']
    web3ModalProvider: IAppContextState['web3ModalProvider']
    address_to_bind: IAppContextState['address_to_bind']
    address_w3a: IAppContextState['address_w3a']
    chainId: IAppContextState['chainId']
    }
    | {
    type: 'SET_REDIRECT'
    redirect: boolean
    }

export interface IAppContextState {
    provider: any
    web3ModalProvider: any
    address_to_bind: string //web3 address
    address_w3a: string //web3auth address
    chainId: number
    redirect: boolean
}

export const initialState: IAppContextState = {
    chainId: 0,
    provider: null,
    web3ModalProvider: null,
    address_to_bind: '',
    address_w3a: '',
    redirect: false
};

const reducer = (
    state: IAppContextState,
    action: IAction
): IAppContextState => {
    switch (action.type) {
        case ACT_SET_CONNECTED_ADDR:
            return {
                ...state,
                chainId: action.chainId,
                provider: action.provider,
                web3ModalProvider: action.web3ModalProvider,
                address_to_bind: action.address_to_bind,
                address_w3a: action.address_w3a,
            }
        case 'SET_REDIRECT':
            return {
                ...state,
                redirect: action.redirect,
            }
        default:
            return state;
    }
};

export default reducer;

