/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import BadgesPair from '../BadgesPair'
import Skeleton from 'react-loading-skeleton'
import { upperCaseString } from '../../utils'
import Badge from "../Badge";
import {ICampaignNew} from "../../utils/interfaces";

interface ICampaign {
  nft: string
  company: string
  location: string
  startTime: number
  endTime: number
  voucher: any
}

const CampaignBanner = ({ campaign }: { campaign: ICampaignNew }) => {

  return (
    <div className={styles.container}>
        <div className={styles.layer}>
      <div
        className={styles.backgroundFake}
        style={{
          backgroundImage: `url(assets/detail-banner.jpg)`,
        }}
      />

      <div className={styles.content}>
        <div className={styles.content_center}>
          <Badge company={campaign.companyLogoUrl} width={'40rem'} />
          <h2 className={styles.content_center_title}>
            {upperCaseString(campaign.company) || <Skeleton />}
          </h2>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CampaignBanner

export const CampaignBannerSkeleton = () => {
  return (
    <div className={styles.container}>
        <div className={styles.layer}>
      <div
        className={styles.backgroundFake}
      />

      <div className={styles.content}>
        <div className={styles.content_center}>
            <Skeleton circle width={50} height={50}/>
          <h2 className={styles.content_center_title}>
              <Skeleton width={100} height={30}/>
          </h2>
        </div>
      </div>
    </div>
    </div>
  )
}
