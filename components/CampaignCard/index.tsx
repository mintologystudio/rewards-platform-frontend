/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import {
  renderSvgIcon,
  IconEnum,
  getReadableTime,
  upperCaseString,
} from '../../utils/index'
import { BsClockFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import Badge from "../Badge";
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
            <Badge company={company} width={'35rem'}/>
          </div>
          <div className={styles.main_top_timeleft}>
            <BsClockFill className={styles.main_top_timeleft_icon}/>
            <span>
                Time Left: {days}d {hours}h 33s
              </span>
          </div>
          <div className={styles.main_top_title}>
            <h3>
              {upperCaseString(nft)} x {upperCaseString(company)}
            </h3>
          </div>
        </div>
        <div className={styles.main_bottom}>
          <div className={styles.main_bottom_p}>
            <p>{offer}</p>
          </div>
          <div className={styles.main_info}>
            <div className={styles.main_info_redeemed}>
              <div style={{ marginBottom: '0.5rem'}}>
                <BsFillBookmarkCheckFill className={styles.main_info_redeemed_icon} />
                <p>redeemed</p>
              </div>
              <div className={styles.main_info_redeemed_bottom}>
                {redemptionRemaining}
              </div>
            </div>
            <div className={styles.main_info_redemption}>
              <Link href={`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`}>
                <button type="button">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CampaignCard
