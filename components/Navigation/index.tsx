/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import MainLogo from '../../public/assets/misc/main.png'
import NavLogo from '../../public/assets/misc/logo-nav.png'
import Link from 'next/link'
import useWindowDimensions from '../../hooks/useWindowDimension'
import {useState, useContext, useCallback, useEffect} from 'react'
import Image from 'next/image'
import { Web3Context } from '../../context/web3Context'
import { useRouter } from 'next/router'
import useWeb3Modal from "../../hooks/useWeb3Modal";

const Routes = {
  Home: '/',
  Explore: '/',
  Profile: '/',
}

const FilteredRoutes = {
  Home: '/',
  Explore: '/',
}

const Navigation = () => {
  const router = useRouter();
  const { windowDimensions, LARGE_SCREEN_SIZE } = useWindowDimensions()
  const [expanded, setExpanded] = useState<boolean>(false)
  const { appState: Web3State } = useContext(Web3Context)
  const [navRoutes, setNavRoutes] = useState<any>([])

  // Initialize useWeb3Modal on first load of webpage
  useWeb3Modal();

  const loginHandler = () => {
    router.push('/login')
  }

  const redirectHandler = (obj: any, key: string) => {
    return obj[key];
  };

  useEffect(() => {
    let _routes
    if (Web3State.address_to_bind) {
      // If account is logged in
      _routes = Object.keys(Routes).map((route) => (
          <li key={`Navigation_${route}`}><Link href={redirectHandler(Routes, route)}>{route}</Link></li>
      ))
    } else {
      // If account is not logged in
      _routes = Object.keys(FilteredRoutes).map((route) => {
        if (route !== 'Profile') {
          return <li key={`Navigation_${route}`}><Link href={redirectHandler(FilteredRoutes, route)}>{route}</Link></li>
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
                  Web3State.chainId === 1 ? (
                    <button disabled>
                      {Web3State.address_to_bind.substring(0, 4)}...
                      {Web3State.address_to_bind.substring(
                        Web3State.address_to_bind.length - 4
                      )}
                    </button>
                  ) : (
                    <button className={`${styles.lwidth}`}>
                      Wrong Network
                    </button>
                  )
                ) : (
                  <button onClick={loginHandler}>Login</button>
                )}
              </div>
            </div>

            {/* <ul className={styles.main_mobile_social}>
                {socials.map((item) => {
                  return (
                    <li key={`Navigation_Social_${item.name}`}>
                      <a
                        href={item.href}
                        target='_blank'
                        rel='noreferrer'
                        style={{
                          pointerEvents: !item.released ? 'none' : 'auto',
                        }}
                      >
                        <>{getIconSvg(item.icon)}</>
                      </a>
                    </li>
                  );
                })}
              </ul> */}

            <div className={styles.nav_mobile_header}>
              <div className={styles.nav_mobile_header_img}>
                  <Image onClick={()=> router.push(Routes.Home)}  src={NavLogo} alt="Main Logo" layout="fill" />
              </div>
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
            <div className={styles.nav_img}>
                <Image onClick={()=> router.push(Routes.Home)} src={NavLogo} alt="Main Logo" layout="fill" />
            </div>

            <ul className={styles.sub}>
              {navRoutes}
              {Web3State.address_to_bind ? (
                Web3State.chainId === 1 ? (
                  <button disabled>
                    {Web3State.address_to_bind.substring(0, 4)}...
                    {Web3State.address_to_bind.substring(
                      Web3State.address_to_bind.length - 4
                    )}
                  </button>
                ) : (
                  <button className={styles.lwidth}>Wrong Network</button>
                )
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
