import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CampaignBanner from '../components/CampaignBanner'
import CampaignDetails from '../components/CampaignDetails'
import Meta from '../components/Meta'
import RedemptionModal from '../components/Modals/RedemptionModal'
import Navigation from '../components/Navigation'
import styles from '../styles/Campaign.module.scss'
import Routes from '../utils/constants/routes'
import { ICampaign, IVoucher } from '../utils/interfaces'
import Footer from "../components/Footer/Footer";
import {MOCK_DATA} from "../utils/mockdata";

const data = (index: string) => {
  switch (index) {
    case '1':
      return MOCK_DATA[0]
    case '2':
      return MOCK_DATA[1]
    case '3':
      return MOCK_DATA[2]
    default:
      return {
        nft: 'NOT FOUND',
        company: '',
        location: '',
        website: '',
        startTime: 0,
        endTime: 0,
        nftCollectionAddr: '',
        voucher: {
          title: '',
          description: '',
          tnc: [],
          code: '',
        },
        isEmpty: false
      }
  }
}

const Campaign: NextPage = () => {
  const router = useRouter();
  const [campaignId, setCampaignId] = useState<string>('')
  const [campaignDetails, setCampaignDetails] = useState<ICampaign>({
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
  })
  const [showRedemptionModal, setShowRedemptionModal] = useState<boolean>(false)

  useEffect(() => {
    if (router && router.query && router.query.campaignId) {
      const _campaignId = (router.query.campaignId as string) || ''
      setCampaignId(_campaignId)
    }
  }, [router])

  useEffect(() => {
    if (!campaignId) return

    const selectedCampaign = data(campaignId)

    if (selectedCampaign.nft == 'NOT FOUND') {
      router.push(Routes.ERROR)
    } else {
      setCampaignDetails(selectedCampaign)
    }
  }, [campaignId])

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />

      <main className={styles.main}>
        <CampaignBanner campaign={campaignDetails} />
        <CampaignDetails
          campaign={campaignDetails}
          details={campaignDetails.voucher}
          collectionAddr={campaignDetails.nftCollectionAddr}
          toggleModal={setShowRedemptionModal}
          redemptionRemaining={campaignDetails.remaining}
        />

        {showRedemptionModal && (
          <RedemptionModal
            website={campaignDetails.website}
            toggleModal={setShowRedemptionModal}
            voucher={campaignDetails.voucher}
            company={campaignDetails.company}
            isEmpty={campaignDetails.isEmpty}
          />
        )}
      </main>

      <Footer/>
    </div>
  )
}

export default Campaign
