/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import {
  renderSvgIcon,
  IconEnum,
  getReadableTime,
  upperCaseString,
} from '../../utils/index'
import BadgesPair from '../BadgesPair'
import Link from 'next/link'
import Routes from '../../utils/constants/routes'

const CampaignCard = ({
  campaignId,
  nft,
  company,
  offer,
  expiration,
  redemptionRemaining,
}: {
  campaignId: string
  nft: string
  company: string
  offer: string
  expiration: number
  redemptionRemaining: number
}) => {
  const countDownInMilli = expiration - new Date().getTime()
  const [days, hours] = getReadableTime(countDownInMilli)

  return (
    <li className={styles.container}>
      <div className={styles.main}>
        <div
          className={styles.main_top}
          style={{ backgroundImage: `url(assets/nfts/banner/${nft}.png)` }}
        >
          <div className={styles.main_top_badges}>
            <BadgesPair nft={nft} company={company} isFeaturedBanner={false} />
          </div>
        </div>
        <div className={styles.main_bottom}>
          <h3>
            {upperCaseString(nft)} x {upperCaseString(company)}
          </h3>
          <p>{offer}</p>
          <div className={styles.main_info}>
            <div className={styles.main_info_time}>
              {renderSvgIcon(IconEnum.HOURGLASS)}
              <p>
                {days} days {hours} hours
              </p>
            </div>
            <div className={styles.main_info_redemption}>
              {renderSvgIcon(IconEnum.GIFT)}
              <p>{redemptionRemaining} left</p>
            </div>
          </div>
          <Link href={`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`}>
            <button type="button">View</button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default CampaignCard
