import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Perk.module.scss'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import PerkList from "../components/PerkList";
import useReactGA from "../hooks/useReactGA";

const MyPerk: NextPage = () => {
    useReactGA();
  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
          <PerkList/>
      </main>

        <Footer />
    </div>
  )
}

export default MyPerk
