import {CustomChainConfig, WALLET_ADAPTER_TYPE, WALLET_ADAPTERS} from '@web3auth/base'
import envConfig from '../../envConfig'
import MainLogo from '../../../public/assets/misc/main.png'
import {CHAIN_CONFIG, CHAIN_CONFIG_TYPE} from "../chainConfig";
import {ModalConfig} from "@web3auth/web3auth";

interface Web3AuthCoreOptions {
  chainConfig: Partial<CustomChainConfig> &
    Pick<CustomChainConfig, 'chainNamespace'>
  enableLogging?: boolean
  storageKey?: 'session' | 'local'
}

interface Web3AuthOptions extends Web3AuthCoreOptions {
  clientId: string
  authMode?: 'DAPP' | 'WALLET'
  uiConfig?: UIConfig
  displayErrorsOnModal?: boolean
}

interface UIConfig {
  appLogo?: string
  theme?: 'light' | 'dark'
  loginMethodsOrder?: string[]
}


export const getWeb3AuthConfig = (chain: CHAIN_CONFIG_TYPE) => {
  const currentChainConfig = CHAIN_CONFIG[chain];
  const clientId = envConfig.WEB3_AUTH_CLIENT_ID;
  const web3AuthConfig: Web3AuthOptions = {
    chainConfig: currentChainConfig,
    // get your client id from https://dashboard.web3auth.io
    clientId,
    authMode: "WALLET",
    uiConfig: {
      loginMethodsOrder: ["google", "twitter",],
      appLogo: MainLogo.src
    },
  }

  return web3AuthConfig;
}

export const MODAL_CONFIG: Record<WALLET_ADAPTER_TYPE, ModalConfig> = {
  [WALLET_ADAPTERS.OPENLOGIN]: {
    label: "openlogin",
    loginMethods: {
      google: {
        name: "Google Account",
        description: "Google Account",
      },
      twitter: {
        name: "Twitter",
        description: "Twitter Account",
      },
      facebook: {name: "facebook", showOnModal: false},
      reddit: {name: "reddit", showOnModal: false},
      discord: {name: "discord", showOnModal: false},
      twitch: {name: "twitch", showOnModal: false},
      apple: {name: "apple", showOnModal: false},
      line: {name: "line", showOnModal: false},
      github: {name: "github", showOnModal: false},
      kakao: {name: "kakao", showOnModal: false},
      linkedin: {name: "linkedin", showOnModal: false},
      weibo: {name: "weibo", showOnModal: false},
      wechat: {name: "wechat", showOnModal: false},
    },
    showOnModal: true,
  }
};
