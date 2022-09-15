/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from "next/image";
import Badge from "../Badge";
import {BsClockFill} from "react-icons/bs";
import {IPerk} from "../../utils/interfaces";
import {getTimeDate, upperCaseString} from "../../utils";

const delay = 500000000

const ListOfPerks: Array<IPerk> = [
  {
    nft: 'azuki',
    company: 'nike',
    location: 'Worldwide Official Nike Stores',
    startTime: 1657887360000,
    endTime: 1658319360000,
    nftCollectionAddr: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
    voucher: {
      title: '10% Off Footwear',
      description:
          '10% off footwear when you purchase any footwear in-store!',
      tnc: [
        'Limited to 1 redemption per user. Limited redemptions available for the period',
        'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
        'Applicable only for in-store purchases',
        'Other Nike T&Cs apply',
      ],
      code: '23cv-f34c-xc123',
    },
  },
  {
    nft: 'karafuru',
    company: 'atmos',
    location: 'Worldwide Official karafuru Stores',
    startTime: 1657887360000,
    endTime: 1658319360000,
    nftCollectionAddr: '0xd2F668a8461D6761115dAF8Aeb3cDf5F40C532C6',
    voucher: {
      title: '10% OFF FOOTWEAR',
      description:
          '10% off footwear when you purchase any footwear in-store!',
      tnc: [
        'Limited to 1 redemption per user. Limited redemptions available for the period',
        'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
        'Applicable only for in-store purchases',
        'Other Nike T&Cs apply',
      ],
      code: '56gg-sd56-sfdg4',
    },
    isExpired: true
  },
  {
    nft: 'doodles',
    company: 'whitecastle',
    location: 'Worldwide Official whitecastle Stores',
    startTime: 1657887360000,
    endTime: 1658319360000,
    nftCollectionAddr: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
    voucher: {
      title: '10% OFF FOOTWEAR',
      description:
          '10% off footwear when you purchase any footwear in-store!',
      tnc: [
        'Limited to 1 redemption per user. Limited redemptions available for the period',
        'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
        'Applicable only for in-store purchases',
        'Other Nike T&Cs apply',
      ],
      code: '11uf-df78-kgsf5',
    }
  },

]

const Perk = ({ perkDetail }: {
  perkDetail: IPerk
}) => {
  const nft = `/assets/nfts/banner/${perkDetail.nft || 'default'}.png`;

  const [sday, smonth, syear] = getTimeDate(perkDetail.startTime);
  const [eday, emonth, eyear] = getTimeDate(perkDetail.endTime);

  return (
      <div className={styles.perk}>
        <div className={styles.perk_left}>
          <div className={styles.perk_left_upper}>
            <div className={styles.perk_left_img}>
              <Image src={nft} alt={perkDetail.nft} layout="fill" />
            </div>
            <div className={styles.perk_left_upper_detail}>
              <h5>{perkDetail.voucher.title} {upperCaseString(perkDetail.nft)} x {upperCaseString(perkDetail.company)}</h5>
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
                  {sday}/{smonth}/{syear}
                </span>
              </div>
              <div className={styles.perk_left_lower_date}>
                <p>end date</p>
                <span>
                  {eday}/{emonth}/{eyear}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.perk_right}>
          <div className={styles.perk_right_upper}>
            {
              !perkDetail.isExpired && (
                      <button className={styles.perk_right_upper_button}>
                        View
                      </button>
                  )
            }
          </div>
          <div className={styles.perk_right_lower}>
            <div className={styles.perk_right_lower_timeleft}>
              {
                !perkDetail.isExpired ? (
                    <>
                    <BsClockFill className={styles.perk_right_lower_timeleft_icon}/>
                    <span>
                      Time Left: 33d 22h 33s
                    </span>
                    </>
                ) : (
                    <span className={styles.expiredtext}>Expired</span>
                )
              }

            </div>
          </div>
        </div>
      </div>
  )
}

const PerkList = ({ }) => {
  return (
    //{/*<div className={styles.container}>*/}
      <div className={styles.main}>
        <div className={styles.perks}>
          <h2>My Perks</h2>

          {ListOfPerks.map(perk => (
              <Perk perkDetail={perk}/>
          ))}

        </div>
      </div>
    // </div>

  )
}

export default PerkList
