import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Perk.module.scss'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import NFTList from "../components/NFTList";
import {useWeb3Auth} from "../utils/services/web3auth";
import {useContext, useEffect} from "react";
import {Web3Context} from "../context/web3Context";
import useNewWeb3Auth from "../hooks/useWeb3Auth";

const MyNft: NextPage = () => {
    const { web3Auth } = useWeb3Auth();
    const { appState } = useContext(Web3Context);
    const { login } = useNewWeb3Auth();

    useEffect(() => {
        if (appState.address_w3a == '') {
            console.log("[web3Auth] relogin");
            login();
        }
    },[web3Auth]);

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

export default MyNft
