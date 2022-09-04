/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import MainLogo from '../../public/assets/misc/main.png'
import Link from 'next/link'
import useWindowDimensions from '../../hooks/useWindowDimension'
import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { Web3Context } from '../../context/web3Context'
import { useRouter } from 'next/router'
import useWeb3Modal from '../../hooks/useWeb3Modal'
import Routes from '../../utils/constants/routes'
import { getDisplayAddress } from '../../utils'

const NavigationBarRoutes = {
  Home: Routes.HOME,
  Explore: Routes.EXPLORE,
  Profile: Routes.PROFILE,
}

const Navigation = () => {
  const router = useRouter()
  const { windowDimensions, LARGE_SCREEN_SIZE } = useWindowDimensions()
  const [expanded, setExpanded] = useState<boolean>(false)
  const { appState: Web3State } = useContext(Web3Context)
  const [navRoutes, setNavRoutes] = useState<any>([])

  // Initialize useWeb3Modal on first load of webpage
  useWeb3Modal()

  const loginHandler = () => {
    router.push(Routes.LOGIN)
  }

  useEffect(() => {
    let _routes
    if (Web3State.address_to_bind) {
      // If account is logged in
      _routes = Object.keys(NavigationBarRoutes).map((route) => (
        <li key={`Navigation_${route}`}>{route}</li>
      ))
    } else {
      // If account is not logged in
      _routes = Object.keys(NavigationBarRoutes).map((route) => {
        if (route !== 'Profile') {
          return <li key={`Navigation_${route}`}>{route}</li>
        }
      })
    }
    setNavRoutes(_routes)
  }, [Web3State.address_to_bind])

  return (
    <nav className={styles.container}>
      {windowDimensions.width < LARGE_SCREEN_SIZE ? (
        <div className={styles.main}>
          <div
            className={`${styles.nav_mobile} ${
              expanded ? styles.nav_mobile_expanded : ''
            }`}
          >
            <div className={styles.nav_mobile_nav}>
              <ul>{navRoutes}</ul>
              <div className={styles.nav_mobile_nav_action}>
                {Web3State.address_to_bind ? (
                  <button disabled>
                    {getDisplayAddress(Web3State.address_to_bind)}
                  </button>
                ) : (
                  <button onClick={loginHandler}>Login</button>
                )}
              </div>
            </div>
            <div className={styles.nav_mobile_header}>
              <Link href={Routes.HOME}>
                <div className={styles.nav_mobile_header_img}>
                  <Image src={MainLogo} alt="Main Logo" layout="fill" />
                </div>
              </Link>
              <div
                id="BurgerMenu"
                className={styles.burger}
                onClick={() => setExpanded((prevState) => !prevState)}
              >
                <i className={!expanded ? styles.close : styles.open}></i>
                <i className={!expanded ? styles.close : styles.open}></i>
                <i className={!expanded ? styles.close : styles.open}></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.nav}>
            <Link href={Routes.HOME}>
              <div className={styles.nav_img}>
                <Image src={MainLogo} alt="Main Logo" layout="fill" />
              </div>
            </Link>

            <ul className={styles.sub}>
              {navRoutes}
              {Web3State.address_to_bind ? (
                <button disabled>
                  {getDisplayAddress(Web3State.address_to_bind)}
                </button>
              ) : (
                <button onClick={loginHandler}>Login</button>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
