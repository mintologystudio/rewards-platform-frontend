/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from 'next/image'

const BadgesPair = ({
  isFeaturedBanner = false,
  nft,
  company,
}: {
  isFeaturedBanner: boolean
  nft: string
  company: string
}) => {
  return (
    <div className={styles.container}>
      <div className={isFeaturedBanner ? styles.featured : styles.card}>
        <div>
          <Image
            src={`/assets/companies/${company || 'default'}.png`}
            alt={`${company} Badge`}
            layout="fill"
          />
        </div>
        <div className={styles.marginRight}>
          <Image
            src={`/assets/nfts/${nft || 'default'}.png`}
            alt={`${nft} Badge`}
            layout="fill"
          />
        </div>
      </div>
    </div>
  )
}

export default BadgesPair
