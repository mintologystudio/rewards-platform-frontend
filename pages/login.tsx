import Meta from '../components/Meta'
import Navigation from '../components/Navigation'
// import { useWeb3Auth } from '../utils/services/web3auth'
import useWeb3Auth from '../hooks/useWeb3Auth'
// import ConnectWallet from '../views/LoggedIn/ConnectWallet'
// import Register from '../views/register'
import Register from '../components/Register'
import ConnectWallet from '../components/ConnectWallet'
import styles from '../styles/Login.module.scss'
import { useContext } from 'react'
import { Web3Context } from '../context/web3Context'
import BindWallet from '../components/BindWallet'
import LoginPageImage from '../public/assets/misc/login_page_image.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Routes from '../utils/constants/routes'

const Login = () => {
  const { provider, login } = useWeb3Auth()
  const { appState: Web3State } = useContext(Web3Context)
  const router = useRouter()

  if (Web3State.address_to_bind) {
    router.push(Routes.HOME)
  }

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.lines}>
            <div className={styles.lines_top_left_pink_object} />
            <div className={styles.lines_bottom_right_pink} />
            <div className={styles.lines_bottom_right_grey} />
          </div>
          <div className={styles.section_left}>
            <div className={styles.section_left_image}>
              <Image src={LoginPageImage} alt="LoginPageImage" layout="fill" />
            </div>
          </div>
          <div className={styles.section_right}>
            {provider ? (
              <>
                {Web3State.address_to_bind ? <BindWallet /> : <ConnectWallet />}
              </>
            ) : (
              <Register handleLogin={login} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
