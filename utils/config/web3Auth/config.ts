import { CHAIN_NAMESPACES, CustomChainConfig } from '@web3auth/base'
import envConfig from '../../envConfig'
import MainLogo from '../../../public/assets/misc/main.png'

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

const web3AuthConfig: Web3AuthOptions = {
  clientId: envConfig.WEB3AUTH_CLIENT_ID,
  authMode: 'DAPP',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    rpcTarget: 'https://rpc.ankr.com/eth',
  },
  enableLogging: true,
  displayErrorsOnModal: true,
  storageKey: 'local',
  uiConfig: {
    appLogo: MainLogo.src,
    theme: 'light',
    loginMethodsOrder: [
      'google',
      'facebook',
      'twitter',
      'reddit',
      'discord',
      // "twitch",
      'apple',
      // "line",
      // "github",
      // "kakao",
      'linkedin',
      'weibo',
      'wechat',
      'email_passwordless',
    ],
  },
}

export default web3AuthConfig
