import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {useContext, useEffect, useState} from 'react'
import CampaignBanner, {CampaignBannerSkeleton} from '../components/CampaignBanner'
import CampaignDetails from '../components/CampaignDetails'
import Meta from '../components/Meta'
import RedemptionModal from '../components/Modals/RedemptionModal'
import Navigation from '../components/Navigation'
import styles from '../styles/Campaign.module.scss'
import Routes from '../utils/constants/routes'
import {ICampaignNew, IVoucher} from '../utils/interfaces'
import Footer from "../components/Footer/Footer";
import {MOCK_DATA} from "../utils/mockdata";
import CampaignDetailSkeleton from "../components/CampaignDetails/CampaignDetailSkeleton";
import {Web3Context} from "../context/web3Context";
import {getCampaign, redeemCampaign} from "../utils/api/niftyRewards";
import useReactGA from "../hooks/useReactGA";

const data = (index: string) => {
  switch (index) {
    case '1':
      return MOCK_DATA[0]
    case '2':
      return MOCK_DATA[1]
    case '3':
      return MOCK_DATA[2]
    default:
      return emptyICampaignNew
  }
}

const emptyICampaign = {
  nft: '',
  company: '',
  location: '',
  website: '',
  startTime: 0,
  endTime: 0,
  nftCollectionAddr: '',
  offer: '',
  voucher: {
    title: '',
    description: '',
    tnc: [],
    code: '',
  },
  isEmpty: false,
  remaining: 1
};

const emptyICampaignNew = {
  _id: '',
  merchantId: '',
  merchantAddress: '',
  collectionIdentifiers: [],
  title: '',
  company: '',
  companyLogoUrl: '',
  offer: '',
  description: '',
  location: '',
  website: '',
  descriptions: [],
  tnc: [],
  startDate: '',
  endDate: '',
  status: '',
  totalCoupon: 0,
  remaining: 0
};

const Campaign: NextPage = () => {
  useReactGA();
  const { appState } = useContext(Web3Context);
  const router = useRouter();
  const [campaignId, setCampaignId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState<ICampaignNew>(emptyICampaignNew)
  const [voucherDetails, setVoucherDetails] = useState<IVoucher | undefined>(campaignDetails.voucher)
  const [showRedemptionModal, setShowRedemptionModal] = useState<boolean>(false)

  const findCampaign = async (_id: string) => {
    console.log("load from api", _id);
    const res = await getCampaign(_id);

    if (res.status && res.campaign && res.message && res.message == "Campaigns Retrieved") {
      setCampaignDetails(res.campaign);
    } else {
      router.replace(Routes.ERROR);
    }
  }

  const redeemCampaignCall = async (_id: string) => {
    const res = await redeemCampaign(appState.address_w3a, _id);
    console.log("res", res);

    if (res.status && res.voucher && res.message && res.message == "Reward redeemed") {
      setVoucherDetails(res.voucher);
    }

    setIsRedeeming(false);
  }

  const doRedeemCampaign = (_id: string) => {
    if (_id === '1' || _id === '2' || _id === '3') {
      // for fake use
      setShowRedemptionModal(true);
      setVoucherDetails(campaignDetails.voucher);
    } else {
      setIsRedeeming(true);
      setShowRedemptionModal(true);
      redeemCampaignCall(_id);

    }
  }

  useEffect(() => {
    if (router && router.query && router.query.campaignId) {
      const _campaignId = (router.query.campaignId as string) || ''
      setCampaignId(_campaignId)
    }
  }, [router])

  useEffect(() => {
    if (!campaignId) return

    // const selectedCampaign = data(campaignId)
    let selectedCampaign: ICampaignNew | undefined = (appState.campaign.campaigns as [])
        .find((c: ICampaignNew) => c._id === campaignId);

    if (!selectedCampaign) {
      //for fake data
      if (campaignId === '1' || campaignId === '2' || campaignId === '3')
        selectedCampaign = data(campaignId);
    }

    if (!selectedCampaign) {
      findCampaign(campaignId);

      // router.push(Routes.ERROR)
      setIsLoading(false);
    } else {
      setCampaignDetails(selectedCampaign)
      setIsLoading(false);
    }
  }, [campaignId])

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        {(isLoading || !campaignDetails._id) ?
            (<>
              <CampaignBannerSkeleton/>
              <CampaignDetailSkeleton/>
            </>)
            :
            (<>
              <CampaignBanner campaign={campaignDetails}/>
              <CampaignDetails
                  campaign={campaignDetails}
                  toggleModal={setShowRedemptionModal}
                  redemptionRemaining={campaignDetails.remaining}
                  redeemCampaign={doRedeemCampaign}
              />
            </>)
        }

        {showRedemptionModal && (
          <RedemptionModal
            showLoading={isRedeeming}
            website={campaignDetails.website}
            toggleModal={setShowRedemptionModal}
            voucher={voucherDetails}
            company={campaignDetails.company}
          />
        )}
      </main>

      <Footer/>
    </div>
  )
}

export default Campaign
