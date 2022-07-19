import React, { Dispatch, createContext, useReducer } from 'react'
import AppReducer, { IAction } from './reducer'
export interface IAppContextState {
  provider: any
  web3ModalProvider: any
  address_to_bind: string //web3 address
  address_w3a: string //web3auth address
  chainId: number
}

export interface InitialContextProps {
  appState: IAppContextState
  appDispatch: Dispatch<IAction>
}

export const InitialAppContextState: IAppContextState = {
  chainId: 0,
  provider: null,
  web3ModalProvider: null,
  address_to_bind: '',
  address_w3a: '',
}

export const Web3Context = createContext({} as InitialContextProps)

const Web3ContextProvider: React.FC<any> = ({ children }) => {
  const [appState, appDispatch] = useReducer(AppReducer, InitialAppContextState)

  return (
    <Web3Context.Provider value={{ appState, appDispatch }}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider
