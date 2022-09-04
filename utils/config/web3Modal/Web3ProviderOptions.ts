import WalletConnectProvider from '@walletconnect/web3-provider'
import envConfig from '../../envConfig'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: envConfig.INFURA_ID,
    },
  },
}

export default providerOptions
