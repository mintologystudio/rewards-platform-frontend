export interface IAssetData {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance?: string
}

export interface IChainData {
  name: string
  short_name: string
  chain: string
  network: string
  chain_id: number
  network_id: number
  rpc_url: string
  native_currency: IAssetData
}
export interface ITxData {
  from: string
  to: string
  nonce: string
  gasPrice: string
  gasLimit: string
  value: string
  data: string
}

export interface IBlockScoutTx {
  value: string
  txreceipt_status: string
  transactionIndex: string
  to: string
  timeStamp: string
  nonce: string
  isError: string
  input: string
  hash: string
  gasUsed: string
  gasPrice: string
  gas: string
  from: string
  cumulativeGasUsed: string
  contractAddress: string
  confirmations: string
  blockNumber: string
  blockHash: string
}

export interface IBlockScoutTokenTx {
  value: string
  transactionIndex: string
  tokenSymbol: string
  tokenName: string
  tokenDecimal: string
  to: string
  timeStamp: string
  nonce: string
  input: string
  hash: string
  gasUsed: string
  gasPrice: string
  gas: string
  from: string
  cumulativeGasUsed: string
  contractAddress: string
  confirmations: string
  blockNumber: string
  blockHash: string
}

export interface IParsedTx {
  timestamp: string
  hash: string
  from: string
  to: string
  nonce: string
  gasPrice: string
  gasUsed: string
  fee: string
  value: string
  input: string
  error: boolean
  asset: IAssetData
  operations: ITxOperation[]
}

export interface ITxOperation {
  asset: IAssetData
  value: string
  from: string
  to: string
  functionName: string
}

export interface IGasPricesResponse {
  fastWait: number
  avgWait: number
  blockNum: number
  fast: number
  fastest: number
  fastestWait: number
  safeLow: number
  safeLowWait: number
  speed: number
  block_time: number
  average: number
}

export interface IGasPrice {
  time: number
  price: number
}

export interface IGasPrices {
  timestamp: number
  slow: IGasPrice
  average: IGasPrice
  fast: IGasPrice
}

export interface IMethodArgument {
  type: string
}

export interface IMethod {
  signature: string
  name: string
  args: IMethodArgument[]
}

export interface IOwnedNFTData {
  tokenId: number
  tokenImage: string
}

export interface IOwnedNFTDataSelection extends IOwnedNFTData {
  redeemed: boolean
}

export interface ICampaign {
  campaignId?: string | number
  title?: string
  description?: string
  nft: string
  company: string
  website: string
  location: string
  startTime: number
  endTime: number
  voucher: IVoucher
  nftCollectionAddr: string
  offer?: string
  suboffer?: string
  isEmpty?: boolean
  remaining?: number
  totalCoupon?: number
  bgUrl?: string
  tnc?: string[]
  expiration?: number
}

export interface ICampaignNew {
  _id: string
  backdropUrl?: string;
  merchantId: string
  merchantAddress: string
  collectionIdentifiers: string[]
  title: string
  company: string
  companyLogoUrl: string
  offer: string
  description: string
  bgUrl?: string
  location: string
  website: string
  descriptions?: any[]
  tnc: string[]
  startDate: string
  endDate: string
  status: string
  totalCoupon: number
  remaining: number
  voucher?: IVoucher
  header?: string
  brandDescription?: string
}

export interface IPerk {
  _id: string
  merchantId: string
  merchantAddress: string
  collectionIdentifiers: string[]
  title: string
  company: string
  companyLogoUrl: string
  offer: string
  description: string
  bgUrl?: string
  location: string
  website: string
  descriptions?: any[]
  tnc: string[]
  startDate: string
  endDate: string
  status: string
  totalCoupon: number
  remaining: number
  voucher?: IVoucher
  isExpired?: boolean
  expiration?: number
}

export interface IVoucher {
  title?: string
  description?: string
  tnc?: string[]
  code: string
}

export interface INFT {
  url: string,
  title: string,
  desc: string,
}
