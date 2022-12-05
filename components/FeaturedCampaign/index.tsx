/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import BadgesPair from '../BadgesPair'
import { useEffect, useRef, useState } from 'react'
import Routes from '../../utils/constants/routes'
import Link from 'next/link'
import { upperCaseString } from '../../utils'
import Badge from "../Badge";
import DiscountTag from "../../public/assets/misc/discounttag.svg";
import Image from "next/image";

const delay = 3000

const ListOfFeaturedCampaigns = [
  // {
  //   campaignId: 4,
  //   nft: 'bayc',
  //   company: 'adidas',
  //   percentage: '10',
  //   description: 'off storewide footwear',
  // },
  // ORIGIN
  // {
  //   campaignId: '6362c4973958dfbe81bf3bac',
  //   nft: 'Danz',
  //   company: 'nike',
  //   percentage: '15',
  //   description: 'off storewide footwear',
  //   url: 'https://gateway.pinata.cloud/ipfs/QmSENR9c9BTgNzdTuK7Q6JDgXhfhkoKtZ8SSMS11gMKBzh/Danz.jpg', 
  // },
  // {
  //   campaignId: '6362c49e3958dfbe81bf3bca',
  //   nft: 'Tasty Toastys',
  //   company: 'nike',
  //   percentage: '15',
  //   description: 'off storewide footwear',
  //   url: 'https://gateway.pinata.cloud/ipfs/QmSENR9c9BTgNzdTuK7Q6JDgXhfhkoKtZ8SSMS11gMKBzh/Toasty.jpg'
  // },
  // {
  //   campaignId: '6362c49b3958dfbe81bf3bb2',
  //   nft: 'Bellina Caetano',
  //   company: 'nike',
  //   percentage: '15',
  //   description: 'off storewide footwear',
  //   url: 'https://gateway.pinata.cloud/ipfs/QmSENR9c9BTgNzdTuK7Q6JDgXhfhkoKtZ8SSMS11gMKBzh/Bellina.jpg'
  // },
  // END OF ORIGIN
  // {
  //   campaignId: 2,
  //   nft: 'karafuru',
  //   company: 'atmos',
  //   percentage: '20',
  //   description: 'off storewide',
  // },
  // {
  //   campaignId: 3,
  //   nft: 'doodles',
  //   company: 'whitecastle',
  //   percentage: '10',
  //   description: 'off storewide footwear',
  // },

  // DEC 5
  {
    campaignId: '638cac6ecf89745ecc5b3ef5',
    nft: 'Sephora',
    company: 'Sephora',
    percentage: '15',
    description: 'Get a Free Skincare trial size',
    url: 'https://gateway.pinata.cloud/ipfs/QmXWNNpHYiGsZboM21e8EgfhFsqw4JLq8Hv3JXN6zZwiNL/1.%20Sephora.jpg'
  },
  // END OF DEC 5
]

const FeaturedCampaignItem = ({
  campaignId,
  nft,
  company,
  percentage,
  description,
  extUrl,
  url,
}: {
  campaignId: string
  nft: string
  company: string
  percentage: string
  description: string
  extUrl: string
  url: string
}) => {
  return (
    <div className={styles.container} key={`FeatuedCampaign_${nft}_${company}`}>
      {/*<div className={styles.layer}>*/}
      {/*    <div*/}
      {/*      className={styles.background}*/}
      {/*      style={{*/}
      {/*        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%), url(assets/campaign/${company}.png)`,*/}
      {/*        opacity: 0.6,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <div className={styles.content}>*/}
      {/*      <div className={styles.content_left}>*/}
      {/*        <BadgesPair isFeaturedBanner nft={nft} company={company} />*/}
      {/*      </div>*/}
      {/*      <div className={styles.content_right}>*/}
      {/*        <h2 className={styles.content_right_title}>*/}
      {/*          {upperCaseString(company)} x {upperCaseString(nft)}*/}
      {/*        </h2>*/}
      {/*        <div className={styles.content_right_sub}>*/}
      {/*          <p className={styles.content_right_percentage}>{percentage}%</p>*/}
      {/*          <p className={styles.content_right_desc}>{description}</p>*/}
      {/*        </div>*/}
      {/*        <Link href={`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`}>*/}
      {/*          <button type="button" className={styles.content_right_button}>*/}
      {/*            Learn More*/}
      {/*          </button>*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*</div>*/}

        <div className={styles.layer}>
          <Link href={campaignId === '1' ? extUrl : `${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`}>
          <div
            className={styles.backgroundFake}
            style={{
              backgroundImage: `url(${url})`
            }}
          />
          </Link>
          
          {/*<div*/}
          {/*  className={styles.background}*/}
          {/*  style={{*/}
          {/*    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%), url(assets/campaign/${company}.png)`,*/}
          {/*    opacity: 0.6,*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<div className={styles.content}>*/}
          {/*  <div className={styles.content_center}>*/}
          {/*    <div className={styles.content_center_sub}>*/}
          {/*        <div className={styles.content_center_discount}>*/}
          {/*          <p className={styles.content_center_percentage}>{percentage}</p>*/}
          {/*            <div className={styles.content_center_discount_tag}>*/}
          {/*                <Image src={DiscountTag} alt="Main Logo" layout="fill" />*/}
          {/*                <span className={styles.content_center_discount_tag_text}>{percentage}% off</span>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*      <p className={styles.content_center_desc}>{description}</p>*/}
          {/*    </div>*/}
          {/*    <div className={styles.wrap}>*/}
          {/*      <div className={styles.wrap_left}>*/}
          {/*          <div className={styles.wrap_left_item}>*/}
          {/*            <Badge company={company} width={'35rem'}/> <span className={styles.badgeText_bold}>{upperCaseString(company)}</span>*/}
          {/*            <span className={styles.badgeText}>X</span>*/}
          {/*            <Badge nft={nft} width={'35rem'}/> <span className={styles.badgeText_bold}>{upperCaseString(nft)}</span>*/}
          {/*        </div>*/}

          {/*      </div>*/}
          {/*        <div className={styles.wrap_right}>*/}
          {/*      <Link href={`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`}>*/}
          {/*        <button type="button" className={styles.content_center_button}>*/}
          {/*          Learn More*/}
          {/*        </button>*/}
          {/*      </Link>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
      </div>
    </div>
  )
}

// NOTE: At the moment content_right styling is hackish
const FeaturedCampaignCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const timeoutRef = useRef<any>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    // TODO: A call to fetch featured campaigns from backend
  }, [])

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === ListOfFeaturedCampaigns.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    )

    return () => {
      resetTimeout()
    }
  }, [activeIndex])

  return (
    <div className={styles.slideshow}>
      <div
        className={styles.slideshow_slider}
        style={{ transform: `translateX(${-activeIndex * 100}%)` }}
      >
        {ListOfFeaturedCampaigns.map((campaign) =>
          FeaturedCampaignItem(campaign)
        )}
      </div>

      <ul className={styles.slideshow_dots}>
        {ListOfFeaturedCampaigns.map((campaign, index: number) => (
          <li
            key={`Slideshow_${index}`}
            onClick={() => setActiveIndex(index)}
            className={`${
              activeIndex === index ? styles.slideshow_dots_active : ''
            }`}
          />
        ))}
      </ul>
    </div>
  )
}

export default FeaturedCampaignCarousel
