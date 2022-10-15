import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Home.module.scss'
import AvailableCampaign from '../components/AvailableCampaign'
import FeaturedCampaign from '../components/FeaturedCampaign'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import useReactGA from "../hooks/useReactGA";

const Home: NextPage = () => {
    useReactGA();
  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <FeaturedCampaign />
        <AvailableCampaign />
      </main>

        <Footer />
    </div>
  )
}

export default Home
