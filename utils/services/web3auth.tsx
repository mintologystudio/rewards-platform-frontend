import {ADAPTER_EVENTS, CONNECTED_EVENT_DATA, SafeEventEmitterProvider} from '@web3auth/base'
import {Web3Auth} from '@web3auth/web3auth'
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from '../config/chainConfig'
import { WEB3AUTH_NETWORK_TYPE } from '../config/web3AuthNetwork'
import envConfig from '../envConfig'
import { getWalletProvider, IWalletProvider } from './walletProvider'
import {useRouter} from "next/router";
import {getWeb3AuthConfig, MODAL_CONFIG} from "../config/web3Auth/config";

export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null
  provider: IWalletProvider | null
  isLoading: boolean
  chain: string
  user: unknown
  login: () => Promise<void>
  logout: () => Promise<void>
  getUserInfo: () => Promise<any>
  signMessage: () => Promise<any>
  getAccounts: () => Promise<any>
  getBalance: () => Promise<any>
  signTransaction: () => Promise<void>
  signAndSendTransaction: () => Promise<void>
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  chain: '',
  user: null,
  login: async () => {},
  logout: async () => {},
  getUserInfo: async () => {},
  signMessage: async () => {},
  getAccounts: async () => {},
  getBalance: async () => {},
  signTransaction: async () => {},
  signAndSendTransaction: async () => {},
})

export function useWeb3Auth(): IWeb3AuthContext {
  return useContext(Web3AuthContext)
}

interface IWeb3AuthState {
  children?: ReactNode
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE
  chain: CHAIN_CONFIG_TYPE
}
interface IWeb3AuthProps {
  children?: ReactNode
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE
  chain: CHAIN_CONFIG_TYPE
}

export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({
  children,
  web3AuthNetwork,
  chain,
}: IWeb3AuthProps) => {
  const router = useRouter();
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<IWalletProvider | null>(null)
  const [user, setUser] = useState<unknown | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  let newCampaignId = '';
  if (router && router.query && router.query.campaignId) {
    newCampaignId = (router.query.campaignId as string);
    // console.log('newCampaignId', newCampaignId);
  };

  const setWalletProvider = useCallback(
    (web3authProvider: SafeEventEmitterProvider) => {
      const walletProvider = getWalletProvider(
        chain,
        web3authProvider,
        uiConsole
      )
      setProvider(walletProvider)
    },
    [chain]
  )

  useEffect(() => {

    const redirect = () => {
      if (newCampaignId && newCampaignId != '') {
        router.push(`/login?campaignId=${newCampaignId}`);
      } else {
        router.push('/login');
      }
    }

    const subscribeAuthEvents = (web3auth: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
        console.log("Yeah!, you are successfully logged in", data);
        setUser(data)
        setWalletProvider(web3auth.provider!)

        if (data && !data.reconnected) {
          redirect();
        }

      })

      web3auth.on(ADAPTER_EVENTS.NOT_READY, () => {
        console.log("not ready");
      })

      web3auth.on(ADAPTER_EVENTS.READY, () => {
        console.log("ready");
      })

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      })

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log('disconnected')
        setUser(null)
      })

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error('some error or user has cancelled login request', error)
      })
    }

    const currentChainConfig = CHAIN_CONFIG[chain]

    async function init() {
      try {
        const { Web3Auth } = await import('@web3auth/web3auth')
        const { OpenloginAdapter } = await import('@web3auth/openlogin-adapter')
        const clientId = envConfig.WEB3_AUTH_CLIENT_ID
        setIsLoading(true)
        const web3AuthInstance = new Web3Auth(getWeb3AuthConfig(chain));

        const adapter = new OpenloginAdapter({
          adapterSettings: { network: web3AuthNetwork, clientId },
        })
        web3AuthInstance.configureAdapter(adapter)
        subscribeAuthEvents(web3AuthInstance)
        setWeb3Auth(web3AuthInstance)
        await web3AuthInstance.initModal({
          modalConfig: MODAL_CONFIG
        })
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [chain, web3AuthNetwork, setWalletProvider, newCampaignId])

  const login = async () => {
    if (!web3Auth) {
      console.log('web3auth not initialized yet')
      uiConsole('web3auth not initialized yet')
      return
    }
    const localProvider = await web3Auth.connect()
    setWalletProvider(localProvider!)
  }

  const logout = async () => {
    if (!web3Auth) {
      console.log('web3auth not initialized yet')
      uiConsole('web3auth not initialized yet')
      return
    }
    if (!!provider) {
      await web3Auth.logout()
      setProvider(null)
    }
  }

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log('web3auth not initialized yet')
      uiConsole('web3auth not initialized yet')
      return
    }
    const user = await web3Auth.getUserInfo()
    uiConsole(user)
  }

  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet')
      uiConsole('provider not initialized yet')
      return
    }
    await provider.getAccounts()
  }

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet')
      uiConsole('provider not initialized yet')
      return
    }
    await provider.getBalance()
  }

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet')
      uiConsole('provider not initialized yet')
      return
    }
    await provider.signMessage()
  }

  const signTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet')
      uiConsole('provider not initialized yet')
      return
    }
    await provider.signTransaction()
  }

  const signAndSendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet')
      uiConsole('provider not initialized yet')
      return
    }
    await provider.signAndSendTransaction()
  }

  const uiConsole = (...args: unknown[]): void => {
    const el = document.querySelector('#console>p')
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2)
    }
  }

  const contextProvider = {
    web3Auth,
    chain,
    provider,
    user,
    isLoading,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  }
  return (
    <Web3AuthContext.Provider value={contextProvider}>
      {children}
    </Web3AuthContext.Provider>
  )
}
