/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Skeleton from 'react-loading-skeleton';

const CampaignDetailSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.campaign} style={{ marginTop: '-15rem', marginBottom: '2rem' }}>
          <div className={styles.campaign_info}>
            <Skeleton width={250}/>
          </div>
          <div className={styles.campaign_info}>
            <Skeleton width={200}/>
          </div>
          <div className={styles.campaign_info}>
            <Skeleton width={250}/>
          </div>

          <div className={styles.campaign_timeleft_redeem_expired}>
            <div className={styles.campaign_timeleft}>
              <Skeleton width={150}/>
            </div>
            <div className={styles.campaign_redeem}>
              <span>
                <Skeleton width={150}/>
              </span>
            </div>
          </div>

        </div>

        <div className={styles.campaign}>
          <div className={styles.campaign_detail}>
              <Skeleton height={250} className={styles.campaign_detail_img}/>

              <div className={styles.campaign_detail_top}>
                <Skeleton width={200}/>
                <Skeleton width={250}/>
              </div>

            <div className={styles.content_tnc}>
              <h3 className={styles.content_tnc_title}><Skeleton width={100}/></h3>
              <Skeleton width={150}/>
              <Skeleton width={130}/>
              <Skeleton width={140}/>
              <Skeleton width={110}/>
            </div>

            <div className={styles.content_button}>
              <Skeleton width={200} height={30}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CampaignDetailSkeleton
