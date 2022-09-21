/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import {
  renderSvgIcon,
  IconEnum,
  getReadableTime,
  upperCaseString, getTimeDate, getUSFormatDate,
} from '../../utils/index'
import { BsClockFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import Badge from "../Badge";
import Link from 'next/link'
import Routes from '../../utils/constants/routes'
import {ICampaign} from "../../utils/interfaces";

const CampaignCard = ({campaign}: {campaign: ICampaign}) => {

  const {campaignId, company, nft, offer,suboffer, redeemed, startTime, endTime, expiration, bgUrl} = campaign;

  const [sday, smonth, syear] = getTimeDate(startTime);
  const [eday, emonth, eyear] = getTimeDate(endTime);
  const usStartDate = getUSFormatDate(sday, smonth, syear);
  const usEndDate = getUSFormatDate(eday, emonth, eyear);

  const countDownInMilli = (expiration? expiration : new Date(1668950741000).getTime()) - new Date().getTime()
  const [days, hours, mins, seconds] = getReadableTime(countDownInMilli);

  const backgroundImg = bgUrl? `url(${bgUrl})` : `url(assets/nfts/banner/${nft}.png)`;

  const isExpired = new Date(endTime) < new Date();

  return (
    <li className={styles.container}>
      <div className={styles.main}>
        <div
          className={styles.main_top}
          style={{ backgroundImage: backgroundImg, backgroundRepeat: 'no-repeat', backgroundSize:'cover' }}
        >
          <div className={styles.main_top_badges}>
            <Badge company={company} width={'35rem'}/>
          </div>
          <div className={styles.main_top_timeleft}>
            {
              !isExpired? (
                  <>
                    <BsClockFill className={styles.main_top_timeleft_icon}/>
                    <span>
                      Time Left: {days}d {hours}h {seconds}s
                    </span>
                  </>
              )
                  : <span>Expired</span>
            }

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
            {
              suboffer? (<p dangerouslySetInnerHTML={{ __html: suboffer }}></p>) : ''
            }
          </div>
          <div className={styles.main_info}>
            <div className={styles.main_info_redeemed}>
              <div style={{ marginBottom: '0.5rem'}}>
                <BsFillBookmarkCheckFill className={styles.main_info_redeemed_icon} />
                <p>redeemed</p>
              </div>
              <div className={styles.main_info_redeemed_bottom}>
                {redeemed}
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
