/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import BadgesPair from '../BadgesPair'
import { useContext, useEffect, useRef, useState } from 'react'
import Routes from '../../utils/constants/routes'
import Link from 'next/link'
import { upperCaseString } from '../../utils'
import Badge from "../Badge";
import DiscountTag from "../../public/assets/misc/discounttag.svg";
import Image from "next/image";
import { IBannerDetail, Web3Context } from '../../context/web3Context'

const delay = 3000

const ListOfFeaturedCampaigns = [
  // {
  //   campaignId: 4,
  //   nft: 'bayc',
  //   company: 'adidas',
  //   percentage: '10',
  //   description: 'off storewide footwear',
  // },
  // {
  //   campaignId: '1',
  //   nft: 'none',
  //   company: 'Mintology',
  //   percentage: '15',
  //   description: 'Mintology Campaign',
  //   extUrl: 'https://www.mintology.studio/campaign',
  //   url: 'https://gateway.pinata.cloud/ipfs/QmTpqq4fGnEDNVtyvYNvSWRPQ5fVsex8K8X8LsebTGkhNA', 
  // },
  {
    campaignId: '638cad41d75ef3a3a6c342c0',
    nft: 'Marrisa Wilson',
    company: 'Marrisa Wilson',
    percentage: '20',
    description: 'off sitewide',
    extUrl: '',
    url: 'https://gateway.pinata.cloud/ipfs/QmW8yBqaXrqkuz5HhrqJGVWm2noDtNmdcPFd5Cqg3tzVg5'
  },

  

  // ORIGIN
  {
    campaignId: '6362c49e3958dfbe81bf3bca',
    nft: 'Tasty Toastys',
    company: 'nike',
    percentage: '15',
    description: 'off storewide footwear',
    extUrl: '',
    url: 'https://gateway.pinata.cloud/ipfs/QmSENR9c9BTgNzdTuK7Q6JDgXhfhkoKtZ8SSMS11gMKBzh/Toasty.jpg'
  },
  {
    campaignId: '6362c49b3958dfbe81bf3bb2',
    nft: 'Bellina Caetano',
    company: 'nike',
    percentage: '15',
    description: 'off storewide footwear',
    extUrl: '',
    url: 'https://gateway.pinata.cloud/ipfs/QmSENR9c9BTgNzdTuK7Q6JDgXhfhkoKtZ8SSMS11gMKBzh/Bellina.jpg'
  },
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
    <div className={styles.container} key={`FeatuedCampaign_${nft}_${company}_${description}`}>
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

interface IBannerProps {
  orderNo: number,
  campaignId: string,
  company: string,
  description: string,
  nft: string,
  percentage: string,
  url: string,
  extUrl: string,
  status: boolean
}
// NOTE: At the moment content_right styling is hackish
const FeaturedCampaignCarousel = () => {
  
  const { appState } = useContext(Web3Context);
  const { banners } = appState.banner;

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
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
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
        {banners.length > 0 ?
          <>
          {banners.sort((a: IBannerProps, b: IBannerProps) => b.orderNo - a.orderNo)
          .map((campaignBanner: IBannerProps) =>
            FeaturedCampaignItem(campaignBanner)
          )}
          </>
          :
          <>
          {ListOfFeaturedCampaigns.map((campaignBanner) =>
            FeaturedCampaignItem(campaignBanner)
          )}
          </>
        }
      </div>

      <ul className={styles.slideshow_dots}>
        {banners.length > 0 ?
          <>
          {banners.sort((a: IBannerProps, b: IBannerProps) => b.orderNo - a.orderNo)
          .map((campaignBanner: IBannerProps, index: number) => (
            <li
              key={`Slideshow_${index}`}
              onClick={() => setActiveIndex(index)}
              className={`${
                activeIndex === index ? styles.slideshow_dots_active : ''
              }`}
            />
          ))}
          </>
          :
          <>
          {ListOfFeaturedCampaigns.map((campaignBanner, index: number) => (
            <li
              key={`Slideshow_${index}`}
              onClick={() => setActiveIndex(index)}
              className={`${
                activeIndex === index ? styles.slideshow_dots_active : ''
              }`}
            />
          ))}
          </>
        }
      </ul>
    </div>
  )
}

export default FeaturedCampaignCarousel
