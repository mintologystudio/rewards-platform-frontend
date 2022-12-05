/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import {ICampaignNew} from "../../utils/interfaces";
import CampaignCard, {CampaignCardSkeleton} from "../CampaignCard";
import {CAMPAIGN_DATA} from "../../utils/mockdata";
import {useContext, useEffect} from "react";
import {Web3Context} from "../../context/web3Context";
import MoreCampaignCard from '../MoreCampaignCard';

const campaignData: Array<ICampaignNew> = CAMPAIGN_DATA;

const AvailableCampaign = () => {
    const { appState } = useContext(Web3Context);
    const { campaign } = appState;
    
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>
          Hot Brand Deals
        </h2>

          {
              !campaign.isLoading && campaign.campaigns.length == 0 ?
                  <p className={styles.main_empty}>No Available Campaign</p>
                  : <></>
          }

        <div className={styles.contents}>

            {
                campaign.isLoading ? (
                   Array(3).fill(3).map((item, index) => (
                       <CampaignCardSkeleton key={index}/>
                   ))
                ) : (<></>)
            }

          {
              !campaign.isLoading && campaign.campaigns.length > 0 ?
            campaign.campaigns.sort((a: any, b: any) => new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()).map((c: ICampaignNew) => (
              <>
              <CampaignCard key={c._id}
                  campaign={c}
              />
              </>
            ))  
            : <></>
          }

          { !campaign.isLoading && campaign.campaigns.length > 0 ? <MoreCampaignCard key={-1} /> : <></> }

            {/*campaignData.map((c: ICampaign) => (*/}
            {/*<CampaignCard key={c.campaignId}*/}
            {/*              campaign={c}*/}
            {/*/>*/}
            {/*))*/}

        </div>
      </div>
    </div>
  )
}

export default AvailableCampaign
