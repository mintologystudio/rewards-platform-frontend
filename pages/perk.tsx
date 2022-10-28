import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Perk.module.scss'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import PerkList from "../components/PerkList";
import {useContext, useEffect} from "react";
import {Web3Context} from "../context/web3Context";
import {PERK_LIST, PERK_LOADING} from "../context/actionType";
import {getCampaigns, getPerks} from "../utils/api/niftyRewards";
import useReactGA from "../hooks/useReactGA";
import { ICampaignNew } from '../utils/interfaces';
import { useWeb3Auth } from '../utils/services/web3auth';

const MyPerk: NextPage = () => {
    useReactGA();
    const { appState, appDispatch } = useContext(Web3Context);
    const { isLoading, web3Auth } = useWeb3Auth();

    const loadPerks = async () => {
        try {
            appDispatch({
                type: PERK_LOADING,
                isLoading: true
            });

            const res = await getPerks(appState.address_w3a);
            const campaigns = await getCampaigns();
            
            if (res.status && campaigns.status) {
                let perks = res.perks.rewards;
                perks = perks.map((p: any) => {
                    const campaign = campaigns.campaigns.find((c: ICampaignNew) => c._id === p.campaignId);
                    if (campaign) {
                        return {
                            ...p,
                            ...campaign,
                            voucher: {
                                title: p.offer,
                                code: p.availableCodes[0],
                            }
                        }
                    } 
                    return p;
                });
                appDispatch({
                    type: PERK_LIST,
                    perk: {
                        perks,
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
        if (!appState.address_w3a) {
            appDispatch({
                type: PERK_LOADING,
                isLoading: true
            });

            setTimeout(() => {
                if (!appState.address_w3a) {
                    appDispatch({
                        type: PERK_LOADING,
                        isLoading: false
                    });
                }
            }, 5000)
        }

        if (appState.perk.perks.length === 0 && !isLoading && web3Auth) {
            loadPerks();
        }
    }, [appState.address_w3a])

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
