import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Home.module.scss'
import AvailableCampaign from '../components/AvailableCampaign'
import FeaturedCampaign from '../components/FeaturedCampaign'
import Navigation from '../components/Navigation'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <FeaturedCampaign />
        <AvailableCampaign />
      </main>
    </div>
  )
}

export default Home
