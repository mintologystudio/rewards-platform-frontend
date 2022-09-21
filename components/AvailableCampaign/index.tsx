/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import {ICampaign} from "../../utils/interfaces";
import CampaignCard from "../CampaignCard";
import {CAMPAIGN_DATA} from "../../utils/mockdata";

const campaignData: Array<ICampaign> = CAMPAIGN_DATA;

const AvailableCampaign = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>
          Hot Brand Deals
        </h2>
        {/*<ul className={styles.content}>*/}
        {/*  <CampaignCard*/}
        {/*    campaignId="1"*/}
        {/*    nft="azuki"*/}
        {/*    company="nike"*/}
        {/*    offer="10% OFF FOOTWEAR"*/}
        {/*    expiration={1668950741000}*/}
        {/*    redemptionRemaining={100}*/}
        {/*  />*/}
        {/*  <CampaignCard*/}
        {/*    campaignId="2"*/}
        {/*    nft="karafuru"*/}
        {/*    company="atmos"*/}
        {/*    offer="10% OFF STOREWIDE"*/}
        {/*    expiration={1668950741000}*/}
        {/*    redemptionRemaining={232}*/}
        {/*  />*/}
        {/*  <CampaignCard*/}
        {/*    campaignId="3"*/}
        {/*    nft="doodles"*/}
        {/*    company="whitecastle"*/}
        {/*    offer="FREE UPSIZE FOR ANY ORDER"*/}
        {/*    expiration={1668950741000}*/}
        {/*    redemptionRemaining={9322}*/}
        {/*  />*/}
        {/*</ul>*/}

        <div className={styles.contents}>

          {
            campaignData.map((c: ICampaign) => (
              <CampaignCard key={c.campaignId}
                  campaign={c}
              />
            ))
          }

          {/*<CampaignCard*/}
          {/*    campaignId="1"*/}
          {/*    nft="azuki"*/}
          {/*    company="nike"*/}
          {/*    offer="10% OFF FOOTWEAR"*/}
          {/*    expiration={1668950741000}*/}
          {/*    redemptionRemaining={100}*/}
          {/*/>*/}
          {/*<CampaignCard*/}
          {/*    campaignId="2"*/}
          {/*    nft="karafuru"*/}
          {/*    company="atmos"*/}
          {/*    offer="10% OFF STOREWIDE"*/}
          {/*    expiration={1668950741000}*/}
          {/*    redemptionRemaining={232}*/}
          {/*/>*/}
          {/*<CampaignCard*/}
          {/*    campaignId="3"*/}
          {/*    nft="doodles"*/}
          {/*    company="whitecastle"*/}
          {/*    offer="FREE UPSIZE FOR ANY ORDER"*/}
          {/*    expiration={1668950741000}*/}
          {/*    redemptionRemaining={9322}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  )
}

export default AvailableCampaign
