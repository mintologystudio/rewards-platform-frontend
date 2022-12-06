/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import {
  renderSvgIcon,
  IconEnum,
  getReadableTime,
  upperCaseString, getTimeDate, getUSFormatDate, BigNumberFormatter,
} from '../../utils/index'
import { BsClockFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import Badge from "../Badge";
import Link from 'next/link'
import Routes from '../../utils/constants/routes'
import {ICampaignNew} from "../../utils/interfaces";
import Skeleton from 'react-loading-skeleton'

const CampaignCard = ({campaign}: {campaign: ICampaignNew}) => {

  // const {campaignId, company, nft, offer, remaining, startTime, endTime, expiration, bgUrl} = campaign;
  const {_id, company, offer, remaining, startDate, endDate, bgUrl, companyLogoUrl} = campaign;

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  const [sday, smonth, syear] = getTimeDate(startTime);
  const [eday, emonth, eyear] = getTimeDate(endTime);
  const usStartDate = getUSFormatDate(sday, smonth, syear);
  const usEndDate = getUSFormatDate(eday, emonth, eyear);
  const countdownDate = new Date(usEndDate);

  // Fixed time difference remaining duration
  // const [days, hours, mins, seconds] = getReadableTime(countdownDate.getTime() - new Date().getTime());
  const [days, hours, mins, seconds] = getReadableTime(new Date(endTime).getTime() - new Date().getTime());

  const backgroundImg = bgUrl? `url(${bgUrl})` : `url(assets/no-image.jpeg)`;

  const isExpired = new Date(endTime) < new Date();

  return (
    <li className={styles.container}>
      <div className={styles.main}>
        <div
          className={styles.main_top}
          style={{ backgroundImage: backgroundImg, backgroundRepeat: 'no-repeat', backgroundSize:'cover' }}
        >
          <div className={styles.main_top_badges}>
            <Badge company={companyLogoUrl} width={'35rem'}/>
          </div>
          <div className={styles.main_top_timeleft}>
            {
              !isExpired? (
                  <>
                    <BsClockFill className={styles.main_top_timeleft_icon}/>
                    <span>
                      Time Left: {days}d {hours}h {mins}m
                    </span>
                  </>
              )
                  : (
                      <>
                        <BsClockFill className={styles.main_top_timeleft_icon}/>
                        <span>
                          Claim period ended
                        </span>
                      </>
                  )
            }

          </div>
          <div className={styles.main_top_title}>
            <h3>
              {upperCaseString(company)}
            </h3>
          </div>
        </div>
        <div className={styles.main_bottom}>
          <div className={styles.main_bottom_p}>

            {/*{ offers && offers.map((off: string) => (*/}
            {/*    <p dangerouslySetInnerHTML={{ __html: off }}></p>*/}
            {/*))}*/}

            <p>{offer || <Skeleton width={100}/>}</p>
            {/*{*/}
            {/*  suboffer? (<p dangerouslySetInnerHTML={{ __html: suboffer }}></p>) : ''*/}
            {/*}*/}
          </div>
          <div className={styles.main_info}>
            <div className={styles.main_info_redeemed}>
              <div style={{ marginBottom: '0.5rem'}}>
                <BsFillBookmarkCheckFill className={styles.main_info_redeemed_icon} />
                <p>Remaining</p>
              </div>
              <div className={styles.main_info_redeemed_bottom}>
                {BigNumberFormatter(remaining)}
              </div>
            </div>
            <div className={styles.main_info_redemption}>
              <Link href={`${Routes.VIEW_CAMPAIGN}?campaignId=${_id}`}>
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

export const CampaignCardSkeleton = () => {

  return (
      <li className={styles.container}>
        <div className={styles.main}>
          <div
              className={styles.main_top}
          >
            <Skeleton height={'100%'} className={styles.main_top}/>
            <div className={styles.main_top_title}>
              <h3>
                <Skeleton width={100}/>
              </h3>
            </div>
          </div>
          <div className={styles.main_bottom}>
            <div className={styles.main_bottom_p}>
              <p><Skeleton width={100}/></p>
            </div>
            <div className={styles.main_info}>
              <div className={styles.main_info_redeemed}>
                <div style={{ marginBottom: '0.5rem'}}>
                  <BsFillBookmarkCheckFill className={styles.main_info_redeemed_icon} />
                  <p><Skeleton width={100}/></p>
                </div>
                <div className={styles.main_info_redeemed_bottom}>
                  <Skeleton width={50}/>
                </div>
              </div>
              <div className={styles.main_info_redemption}>
                <Skeleton width={100} height={30}/>
              </div>
            </div>
          </div>
        </div>
      </li>
  )
}
