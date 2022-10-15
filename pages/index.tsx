import type { NextPage } from 'next'
import Meta from '../components/Meta'
import styles from '../styles/Home.module.scss'
import AvailableCampaign from '../components/AvailableCampaign'
import FeaturedCampaign from '../components/FeaturedCampaign'
import Navigation from '../components/Navigation'
import Footer from "../components/Footer/Footer";
import {getCampaigns} from "../utils/api/niftyRewards";
import {useContext, useEffect} from "react";
import {Web3Context} from "../context/web3Context";
import {CAMPAIGN_LIST, CAMPAIGN_LOADING} from "../context/actionType";
import {CAMPAIGN_DATA} from "../utils/mockdata";
import useReactGA from "../hooks/useReactGA";

const Home = () => {
    useReactGA();
    const { appState, appDispatch } = useContext(Web3Context);

    const loadCampaigns = async () => {
        try {
            appDispatch({
                type: CAMPAIGN_LOADING,
                isLoading: true
            });

            const res = await getCampaigns();
            if (res.status) {
                // const campaignResult = res.campaigns;
                const campaignResult = CAMPAIGN_DATA;

                appDispatch({
                    type: CAMPAIGN_LIST,
                    campaign: {
                        campaigns: campaignResult,
                        isLoading: false
                    }
                });
            } else {
                appDispatch({
                    type: CAMPAIGN_LOADING,
                    isLoading: false
                });
            }
        }catch (e) {
            console.log(e);
            appDispatch({
                type: CAMPAIGN_LOADING,
                isLoading: false
            });
        }
    }

    useEffect(() => {
        if (appState.campaign.campaigns.length === 0) {
            loadCampaigns();
        }
    },[])

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <FeaturedCampaign />
        <AvailableCampaign />
      </main>

        <Footer />
    </div>
  )
}

export default Home
