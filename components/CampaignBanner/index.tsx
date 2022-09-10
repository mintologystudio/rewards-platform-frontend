/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import BadgesPair from '../BadgesPair'
import Skeleton from 'react-loading-skeleton'
import { upperCaseString } from '../../utils'
import Badge from "../Badge";

interface ICampaign {
  nft: string
  company: string
  location: string
  startTime: number
  endTime: number
  voucher: any
}

const CampaignBanner = ({ campaign }: { campaign: ICampaign }) => {
  const startDate = new Date(campaign.startTime)
  const endDate = new Date(campaign.endTime)

  return (
    <div className={styles.container}>
        <div className={styles.layer}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 100%), url(assets/nfts/banner/${
            campaign.nft || 'default'
          }.png)`,
          opacity: 0.6,
        }}
      />
      {/*<div className={styles.content}>*/}
      {/*  <div className={styles.content_left}>*/}
      {/*    <h2 className={styles.content_left_title}>*/}
      {/*      {upperCaseString(campaign.nft) || <Skeleton />} X{' '}*/}
      {/*      {upperCaseString(campaign.company) || <Skeleton />}*/}
      {/*    </h2>*/}
      {/*    <div className={styles.content_left_sub}>*/}
      {/*      <p>*/}
      {/*        <span>Location:</span>*/}
      {/*        {campaign.location || <Skeleton />}*/}
      {/*      </p>*/}
      {/*      <p>*/}
      {/*        <span>Start Date:</span>*/}
      {/*        <>*/}
      {/*          {campaign.startTime ? (*/}
      {/*            <>*/}
      {/*              {startDate.getDate()}/{startDate.getMonth()}/*/}
      {/*              {startDate.getFullYear()}*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <Skeleton />*/}
      {/*          )}*/}
      {/*        </>*/}
      {/*      </p>*/}
      {/*      <p>*/}
      {/*        <span>End Date:</span>*/}
      {/*        <>*/}
      {/*          {campaign.endTime ? (*/}
      {/*            <>*/}
      {/*              {endDate.getDate()}/{endDate.getMonth()}/*/}
      {/*              {endDate.getFullYear()}*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <Skeleton />*/}
      {/*          )}*/}
      {/*        </>*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.content_right}>*/}
      {/*    <BadgesPair*/}
      {/*      isFeaturedBanner*/}
      {/*      nft={campaign.nft}*/}
      {/*      company={campaign.company}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={styles.content}>
        <div className={styles.content_center}>
          <Badge company={campaign.company} width={'40rem'} />
          <h2 className={styles.content_center_title}>
            {upperCaseString(campaign.nft) || <Skeleton />} x{' '}
            {upperCaseString(campaign.company) || <Skeleton />}
          </h2>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CampaignBanner
