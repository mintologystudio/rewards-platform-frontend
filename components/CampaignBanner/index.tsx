/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import BadgesPair from '../BadgesPair'
import Skeleton from 'react-loading-skeleton'

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
      <div
        className={styles.background}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1, 10, 29, 0) 0%, #010A1D 100%), url(assets/nfts/banner/${
            campaign.nft || 'default'
          }.png)`,
          opacity: 0.6,
        }}
      />
      <div className={styles.content}>
        <div className={styles.content_left}>
          <h2 className={styles.content_left_title}>
            {campaign.nft.toUpperCase() || <Skeleton />} X{' '}
            {campaign.company.toUpperCase() || <Skeleton />}
          </h2>
          <div className={styles.content_left_sub}>
            <p>
              <span>Location:</span>
              {campaign.location || <Skeleton />}
            </p>
            <p>
              <span>Start Date:</span>
              <>
                {campaign.startTime ? (
                  <>
                    {startDate.getDate()}/{startDate.getMonth()}/
                    {startDate.getFullYear()}
                  </>
                ) : (
                  <Skeleton />
                )}
              </>
            </p>
            <p>
              <span>End Date:</span>
              <>
                {campaign.endTime ? (
                  <>
                    {endDate.getDate()}/{endDate.getMonth()}/
                    {endDate.getFullYear()}
                  </>
                ) : (
                  <Skeleton />
                )}
              </>
            </p>
          </div>
        </div>
        <div className={styles.content_right}>
          <BadgesPair
            isFeaturedBanner
            nft={campaign.nft}
            company={campaign.company}
          />
        </div>
      </div>
    </div>
  )
}

export default CampaignBanner
