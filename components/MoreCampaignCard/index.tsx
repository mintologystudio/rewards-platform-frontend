/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'

const MoreCampaignCard = () => {

  const backgroundImg = `url(assets/campaign/more-campaign.svg)`;

  return (
    <li className={styles.container}>
      <div className={styles.main}>
        <div
          className={styles.main_top}
          style={{ backgroundImage: backgroundImg, backgroundRepeat: 'no-repeat', backgroundSize:'cover' }}
        >
          <div className={styles.main_top_title}>
            <h3>
              More deals dropping soon!
            </h3>
          </div>
        </div>
        {/* <div className={styles.main_bottom}></div> */}
      </div>
    </li>
  )
}

export default MoreCampaignCard

