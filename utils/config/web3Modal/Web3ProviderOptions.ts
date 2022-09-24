import WalletConnectProvider from '@walletconnect/web3-provider'
import envConfig from '../../envConfig'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      },
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      rpc: {
        1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      },
    },
  },
}

export default providerOptions
