/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from "next/image";
import Badge from "../Badge";
import {BsClockFill} from "react-icons/bs";
import {IPerk} from "../../utils/interfaces";
import {getImageUrl, getReadableTime, getTimeDate, getUSFormatDate, upperCaseString, isHttpUrl} from "../../utils";
import {PERK_DATA} from "../../utils/mockdata";
import {useRouter} from "next/router";
import Routes from "../../utils/constants/routes";
import {IoCopyOutline} from "react-icons/io5";
import {useContext, useState} from "react";
import Skeleton from 'react-loading-skeleton'
import {Web3Context} from "../../context/web3Context";

const delay = 500000000

const ListOfPerks: Array<IPerk> = PERK_DATA;

const Perk = ({ perkDetail, redirectHandler }: {
  perkDetail: IPerk
  redirectHandler: Function
}) => {
  const {_id, company, location, startDate, endDate, bgUrl, voucher, companyLogoUrl} = perkDetail;
  const [copied, setCopied] = useState(false);
  // const nft = `/assets/nfts/banner/${perkDetail.nft || 'default'}.png`;
  const defaultImg = `/assets/no-image.jpeg`;

  const imgUrl = bgUrl ? getImageUrl(bgUrl) : defaultImg;
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  const [sday, smonth, syear] = getTimeDate(startTime);
  const [eday, emonth, eyear] = getTimeDate(endTime);
  const usStartDate = getUSFormatDate(sday, smonth, syear);
  const usEndDate = getUSFormatDate(eday, emonth, eyear);
  const countdownDate = new Date(usEndDate);

  const [days, hours, mins, seconds] = getReadableTime(new Date(endTime).getTime()  - new Date().getTime());

  const isExpired = new Date(endTime) < new Date();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  return (
      <div className={styles.perk}>
        <div className={styles.perk_left}>
          <div className={styles.perk_left_upper}>
            <div className={styles.perk_left_img}>
              <Image 
                src={imgUrl} alt={company} layout="fill" style={{ borderRadius: '5px'}}
                loader={loaderProp} />
            </div>
            <div className={styles.perk_left_upper_detail}>
              <h5>{voucher?.title} @{upperCaseString(company)}</h5>
              <div className={styles.perk_left_upper_detail_span}>
                <Badge company={companyLogoUrl} width={'20rem'} />
                <span>Location: {location}</span>
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

            <div className={styles.code}>
              <span>
                {!copied ? (
                    voucher?.code
                ) : (
                    'Copied!'
                )}
              </span>
              <button className={styles.copyBtn} onClick={() => copyToClipboard((voucher?voucher.code:''))}>
                <IoCopyOutline className={styles.copy_icon}/>
              </button>
            </div>

            <button className={styles.perk_right_upper_button} onClick={() => redirectHandler(_id)}>
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


const PerkSkeleton = () => {
  return (
      <div className={styles.perk}>
        <div className={styles.perk_left}>
          <div className={styles.perk_left_upper}>
            <div className={styles.perk_left_img}>
              <Skeleton height={80} style={{ borderRadius: '5px', width: '100%'}}/>
            </div>
            <div className={styles.perk_left_upper_detail}>
              <Skeleton width={120}/>
              <Skeleton width={100}/>
            </div>
          </div>
          <div className={styles.perk_left_lowerfull}>
            <div className={styles.perk_left_lower}>
              <div className={styles.perk_left_lower_date}>
                <Skeleton  style={{ width: '100%', height: '100%'}}/>
              </div>
              <div className={styles.perk_left_lower_date}>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.perk_right}>
          <div className={styles.perk_right_upper}>
            <Skeleton width={200} height={30}/>
          </div>
          <div className={styles.perk_right_lower}>
            <div className={styles.perk_right_lower_timeleft}>
            </div>
          </div>
        </div>
      </div>
  )
}


const PerkList = ({ }) => {
  const router = useRouter();

  const { appState } = useContext(Web3Context);
  const { perk } = appState;

  const toDetail = (campaignId: any) => {
    router.push(`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`);
  }

  return (
      <div className={styles.main}>
        <div className={styles.perks}>
          <h2>My Perks</h2>

          {!perk.isLoading && perk.perks.length == 0 ? <p className={styles.main_empty}>No Redeemed Coupons</p> : <></>}

          {perk.isLoading ? (Array(3).fill(3).map((item, index) => <PerkSkeleton key={index}/>)): (<></>)}

          {
            !perk.isLoading && perk.perks.length > 0 ? (
              perk.perks.map((vperk: IPerk) => (
                    <Perk perkDetail={vperk} key={vperk.company} redirectHandler={toDetail}/>
                ))
                )
                : <></>
          }
        </div>
      </div>

  )
}

export default PerkList

