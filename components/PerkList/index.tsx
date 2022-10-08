/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from "next/image";
import Badge from "../Badge";
import {BsClockFill} from "react-icons/bs";
import {IPerk} from "../../utils/interfaces";
import {getReadableTime, getTimeDate, getUSFormatDate, upperCaseString} from "../../utils";
import {PERK_DATA} from "../../utils/mockdata";
import {useRouter} from "next/router";
import Routes from "../../utils/constants/routes";

const delay = 500000000

const ListOfPerks: Array<IPerk> = PERK_DATA;

const Perk = ({ perkDetail, redirectHandler }: {
  perkDetail: IPerk
  redirectHandler: Function
}) => {
  // const nft = `/assets/nfts/banner/${perkDetail.nft || 'default'}.png`;
  const nft = `/assets/perk1.png`;
  const imgUrl = '/' + perkDetail.bgUrl || nft;

  const [sday, smonth, syear] = getTimeDate(perkDetail.startTime);
  const [eday, emonth, eyear] = getTimeDate(perkDetail.endTime);
  const usStartDate = getUSFormatDate(sday, smonth, syear);
  const usEndDate = getUSFormatDate(eday, emonth, eyear);
  const countdownDate = new Date(usEndDate);

  const countDownInMilli = (perkDetail.expiration? perkDetail.expiration : new Date(1666224000000).getTime()) - new Date().getTime()
  const [days, hours, mins, seconds] = getReadableTime(countdownDate.getTime() - new Date().getTime());

  const isExpired = new Date(perkDetail.endTime) < new Date();

  return (
      <div className={styles.perk}>
        <div className={styles.perk_left}>
          <div className={styles.perk_left_upper}>
            <div className={styles.perk_left_img}>
              <Image src={imgUrl} alt={perkDetail.nft} layout="fill" />
            </div>
            <div className={styles.perk_left_upper_detail}>
              <h5>{perkDetail.voucher.title} @{upperCaseString(perkDetail.company)}</h5>
              <div className={styles.perk_left_upper_detail_span}>
                <Badge company={perkDetail.company} width={'20rem'} />
                <span>Location: {perkDetail.location}</span>
              </div>
            </div>
          </div>
          <div className={styles.perk_left_lowerfull}>
            <div className={styles.perk_left_lower}>
              <div className={styles.perk_left_lower_date}>
                <p>start date</p>
                <span>
                  {usStartDate}
                </span>
              </div>
              <div className={styles.perk_left_lower_date}>
                <p>end date</p>
                <span>
                  {usEndDate}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.perk_right}>
          <div className={styles.perk_right_upper}>
            <button className={styles.perk_right_upper_button} onClick={() => redirectHandler(perkDetail.campaignId)}>
              View
            </button>
          </div>
          <div className={styles.perk_right_lower}>
            <div className={styles.perk_right_lower_timeleft}>
              {
                !isExpired ? (
                    <>
                    <BsClockFill className={styles.perk_right_lower_timeleft_icon}/>
                    <span>
                      Time Left: {days}d {hours}h {mins}m
                    </span>
                    </>
                ) : (
                    <>
                      <BsClockFill className={styles.perk_right_lower_timeleft_icon}/>
                      <span>
                        Claim period ended
                      </span>
                    </>
                )
              }

            </div>
          </div>
        </div>
      </div>
  )
}

const PerkList = ({ }) => {

  const router = useRouter();

  const toDetail = (campaignId: any) => {
    router.push(`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`);
  }

  return (
    //{/*<div className={styles.container}>*/}
      <div className={styles.main}>
        <div className={styles.perks}>
          <h2>My Perks</h2>

          {ListOfPerks.map(perk => (
              <Perk perkDetail={perk} key={perk.nft} redirectHandler={toDetail}/>
          ))}

        </div>
      </div>
    // </div>

  )
}

export default PerkList
