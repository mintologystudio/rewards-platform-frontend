import type { NextPage } from 'next'
import Meta from '../components/Meta'
import Navigation from '../components/Navigation'
import styles from '../styles/Campaign.module.scss'

const Custom404: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <h1>404 - Page Not Found</h1>
      </main>
    </div>
  )
}

export default Custom404
