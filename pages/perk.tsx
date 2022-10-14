import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Perk.module.scss'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import PerkList from "../components/PerkList";
import {useContext, useEffect} from "react";
import {Web3Context} from "../context/web3Context";
import {PERK_LIST, PERK_LOADING} from "../context/actionType";
import {getPerks} from "../utils/api/niftyRewards";

const MyPerk: NextPage = () => {
    const { appState, appDispatch } = useContext(Web3Context);

    const loadPerks = async () => {
        try {
            appDispatch({
                type: PERK_LOADING,
                isLoading: true
            });

            const res = await getPerks();
            if (res.status) {
                appDispatch({
                    type: PERK_LIST,
                    perk: {
                        perks: res.perks,
                        isLoading: false
                    }
                });
            } else {
                appDispatch({
                    type: PERK_LOADING,
                    isLoading: false
                });
            }
        }catch (e) {
            console.log(e);
            appDispatch({
                type: PERK_LOADING,
                isLoading: false
            });
        }
    }

    useEffect(() => {
        if (appState.perk.perks.length === 0) {
            loadPerks();
        }
    },[])

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
