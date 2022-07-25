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

const data = (index: string) => {
  switch (index) {
    case '1':
      return {
        nft: 'azuki',
        company: 'nike',
        location: 'Worldwide Official Nike Stores',
        startTime: 1657887360000,
        endTime: 1658319360000,
        nftCollectionAddr: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        voucher: {
          title: '10% Off Footwear',
          description:
            '10% off footwear when you purchase any footwear in-store!',
          tnc: [
            'Limited to 1 redemption per user. Limited redemptions available for the period',
            'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
            'Applicable only for in-store purchases',
            'Other Nike T&Cs apply',
          ],
          code: '23cv-f34c-xc123',
        },
      }
    case '2':
      return {
        nft: 'karafuru',
        company: 'atmos',
        location: 'Worldwide Official Nike Stores',
        startTime: 1657887360000,
        endTime: 1658319360000,
        nftCollectionAddr: '0xd2F668a8461D6761115dAF8Aeb3cDf5F40C532C6',
        voucher: {
          title: '10% OFF FOOTWEAR',
          description:
            '10% off footwear when you purchase any footwear in-store!',
          tnc: [
            'Limited to 1 redemption per user. Limited redemptions available for the period',
            'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
            'Applicable only for in-store purchases',
            'Other Nike T&Cs apply',
          ],
          code: '56gg-sd56-sfdg4',
        },
      }
    case '3':
      return {
        nft: 'doodles',
        company: 'whitecastle',
        location: 'Worldwide Official Nike Stores',
        startTime: 1657887360000,
        endTime: 1658319360000,
        nftCollectionAddr: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
        voucher: {
          title: '10% OFF FOOTWEAR',
          description:
            '10% off footwear when you purchase any footwear in-store!',
          tnc: [
            'Limited to 1 redemption per user. Limited redemptions available for the period',
            'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
            'Applicable only for in-store purchases',
            'Other Nike T&Cs apply',
          ],
          code: '11uf-df78-kgsf5',
        },
      }
    default:
      return {
        nft: 'NOT FOUND',
        company: '',
        location: '',
        startTime: 0,
        endTime: 0,
        nftCollectionAddr: '',
        voucher: {
          title: '',
          description: '',
          tnc: [],
          code: '',
        },
      }
  }
}

const Campaign: NextPage = () => {
  const router = useRouter()
  const [campaignId, setCampaignId] = useState<string>('')
  const [campaignDetails, setCampaignDetails] = useState<ICampaign>({
    nft: '',
    company: '',
    location: '',
    startTime: 0,
    endTime: 0,
    nftCollectionAddr: '',
    voucher: {
      title: '',
      description: '',
      tnc: [],
      code: '',
    },
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
          details={campaignDetails.voucher}
          collectionAddr={campaignDetails.nftCollectionAddr}
          toggleModal={setShowRedemptionModal}
        />

        {showRedemptionModal && (
          <RedemptionModal
            toggleModal={setShowRedemptionModal}
            voucher={campaignDetails.voucher}
          />
        )}
      </main>
    </div>
  )
}

export default Campaign
