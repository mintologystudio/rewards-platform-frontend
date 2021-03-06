/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from 'next/image'
import BAYCBadge from '../../public/assets/nfts/bayc.png'
import AdidasBadge from '../../public/assets/companies/adidas.png'
import CampaignCard from '../CampaignCard'

const AvailableCampaign = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>
          AVAILABLE CAMPAIGN <span>FOR YOU</span>
        </h2>
        <ul className={styles.content}>
          <CampaignCard
            campaignId="1"
            nft="azuki"
            company="nike"
            offer="10% OFF FOOTWEAR"
            expiration={1655433980000}
            redemptionRemaining={100}
          />
          <CampaignCard
            campaignId="2"
            nft="karafura"
            company="atmos"
            offer="10% OFF STOREWIDE"
            expiration={1655433980000}
            redemptionRemaining={232}
          />
          <CampaignCard
            campaignId="3"
            nft="doodles"
            company="whitecastle"
            offer="FREE UPSIZE FOR ANY ORDER"
            expiration={1655433980000}
            redemptionRemaining={9322}
          />
          <CampaignCard
            campaignId="1"
            nft="azuki"
            company="nike"
            offer="10% OFF FOOTWEAR"
            expiration={1655433980000}
            redemptionRemaining={100}
          />
        </ul>
      </div>
    </div>
  )
}

export default AvailableCampaign
