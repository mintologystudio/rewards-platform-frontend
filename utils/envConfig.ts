const envConfig = {
  MAINNET: process.env.NEXT_PUBLIC_MAINNET === 'true' ? true : false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  MORALIS_API_KEY: process.env.NEXT_PUBLIC_MORALIS_API_KEY || '',
  WEB3AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '',
  ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID || '',
  INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID || '',
}

export default envConfig
