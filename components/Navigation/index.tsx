/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import MainLogo from '../../public/assets/misc/main.png'
import Link from 'next/link'
import useWindowDimensions from '../../hooks/useWindowDimension'
import { useState, useContext } from 'react'
import Image from 'next/image'
import { Web3Context } from '../../context/web3Context'
import { useRouter } from 'next/router'

const Routes = {
  Home: '/',
  Explore: '/explore',
  Profile: '/profile',
}

const FilteredRoutes = {
  Home: '/',
  Explore: '/explore',
}

const Navigation = () => {
  const router = useRouter()
  const { windowDimensions, LARGE_SCREEN_SIZE } = useWindowDimensions()
  const [expanded, setExpanded] = useState<boolean>(false)
  const { appState, appDispatch } = useContext(Web3Context)

  const loginHandler = () => {
    router.push('/login')
  }

  let finalRoutes
  if (appState.address_to_bind && appState.chainId === 1) {
    finalRoutes = Object.keys(Routes).map((route) => (
      <li key={`Navigation_${route}`}>{route}</li>
    ))
  } else {
    finalRoutes = Object.keys(FilteredRoutes).map((route) => (
      <li key={`Navigation_${route}`}>{route}</li>
    ))
  }

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
              <ul>{finalRoutes}</ul>
              <div className={styles.nav_mobile_nav_action}>
                {appState.address_to_bind ? (
                  appState.chainId === 1 ? (
                    <button disabled>
                      {appState.address_to_bind.substring(0, 4)}...
                      {appState.address_to_bind.substring(
                        appState.address_to_bind.length - 4
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
                <Link href={Routes.Home}>
                  <Image src={MainLogo} alt="Main Logo" layout="fill" />
                </Link>
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
              <Link href={Routes.Home}>
                <Image src={MainLogo} alt="Main Logo" layout="fill" />
              </Link>
            </div>

            <ul className={styles.sub}>
              {finalRoutes}
              {appState.address_to_bind ? (
                appState.chainId === 1 ? (
                  <button disabled>
                    {appState.address_to_bind.substring(0, 4)}...
                    {appState.address_to_bind.substring(
                      appState.address_to_bind.length - 4
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
