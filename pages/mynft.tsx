import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Perk.module.scss'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import NFTList from "../components/NFTList";

const MyPerk: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
          <NFTList/>
      </main>

        <Footer />
    </div>
  )
}

export default MyPerk
