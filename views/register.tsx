import type { NextPage } from 'next'
import Meta from '../components/Meta'
import Navigation from '../components/Navigation'
import styles from '../styles/Login.module.scss'
import LoginPageImage from '../public/assets/misc/login_page_image.png'
import Image from 'next/image'
import { useWeb3Auth } from '../utils/services/web3auth'

const Register: NextPage = () => {
  const { login, isLoading } = useWeb3Auth()

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.lines}>
            <div className={styles.lines_top_left_pink} />
            <div className={styles.lines_top_left_grey} />
            <div className={styles.lines_bottom_right_pink} />
            <div className={styles.lines_bottom_right_grey} />
          </div>
          <div className={styles.logo_image}>
            <Image src={LoginPageImage} alt="LoginPageImage" layout="fill" />
          </div>
          <div className={styles.info}>
            <div className={styles.info_title}>
              <p>Mintology</p>
            </div>
            <p className={styles.info_subheading}>
              Bridging Brands with <br /> NFT Users
            </p>
            {isLoading ? (
              <button
                disabled
                className={styles.loading}
                style={{ marginTop: 0 }}
              >
                Loading...
              </button>
            ) : (
              <button onClick={login}>Get Started</button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Register
