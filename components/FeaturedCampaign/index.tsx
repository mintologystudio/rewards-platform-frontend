/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import BadgesPair from '../BadgesPair'
import { useEffect, useRef, useState } from 'react'
import Routes from '../../utils/constants/routes'
import Link from 'next/link'
import { upperCaseString } from '../../utils'

const delay = 500000000

const ListOfFeaturedCampaigns = [
  // {
  //   campaignId: 4,
  //   nft: 'bayc',
  //   company: 'adidas',
  //   percentage: '10',
  //   description: 'off storewide footwear',
  // },

  {
    campaignId: 1,
    nft: 'azuki',
    company: 'nike',
    percentage: '15',
    description: 'off storewide footwear',
  },
  {
    campaignId: 2,
    nft: 'karafuru',
    company: 'atmos',
    percentage: '20',
    description: 'off storewide',
  },
  {
    campaignId: 3,
    nft: 'doodles',
    company: 'whitecastle',
    percentage: '10',
    description: 'off storewide footwear',
  },
]

const FeaturedCampaignItem = ({
  campaignId,
  nft,
  company,
  percentage,
  description,
}: {
  campaignId: number
  nft: string
  company: string
  percentage: string
  description: string
}) => {
  return (
    <div className={styles.container} key={`FeatuedCampaign_${nft}_${company}`}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%), url(assets/campaign/${company}.png)`,
          opacity: 0.6,
        }}
      />
      <div className={styles.content}>
        <div className={styles.content_left}>
          <BadgesPair isFeaturedBanner nft={nft} company={company} />
        </div>
        <div className={styles.content_right}>
          <h2 className={styles.content_right_title}>
            {upperCaseString(company)} x {upperCaseString(nft)}
          </h2>
          <div className={styles.content_right_sub}>
            <p className={styles.content_right_percentage}>{percentage}%</p>
            <p className={styles.content_right_desc}>{description}</p>
          </div>
          <Link href={`${Routes.VIEW_CAMPAIGN}?campaignId=${campaignId}`}>
            <button type="button" className={styles.content_right_button}>
              Learn More
            </button>
          </Link>
        </div>
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
