/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getTokensFromUser } from '../../utils/api'
import { IOwnedNFTData, IOwnedNFTDataSelection } from '../../utils/interfaces'
import styles from './index.module.scss'
import Image from 'next/image'
import NFTCard from '../NFTCard'

interface IVoucher {
  title: string
  description: string
  tnc: string[]
  code: string
}

const mockUserWalletAddress = '0xaf07daD7F6e4ac3eeDB227B6cfCB5E0f476d6dB4'

const CampaignDetails = ({
  collectionAddr,
  details,
  toggleModal,
}: {
  collectionAddr: string
  details: IVoucher
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [availableTokens, setAvailableTokens] = useState<
    IOwnedNFTDataSelection[]
  >([])
  const [selectedNFT, setSelectedNFT] = useState<IOwnedNFTDataSelection>()

  const retrieveUserNFTs = async () => {
    const tokens = await getTokensFromUser(
      mockUserWalletAddress,
      collectionAddr
    )
    return tokens
  }

  const retrieveAndFilterEligibleTokens = async () => {
    // Query Moralis to detect all NFTs that this user owned
    const userTokens = await retrieveUserNFTs()

    // Query backend to detect NFTs that are already claimed for this voucher
    const mockRedeemedTokenIds = [267, 265]

    const filteredTokens = userTokens.map((_token) => {
      return {
        ..._token,
        redeemed: mockRedeemedTokenIds.includes(_token.tokenId),
      }
    })
    setAvailableTokens(filteredTokens)
  }

  const handleSelectNFT = (token: IOwnedNFTDataSelection) => {
    if (token.redeemed) return
    setSelectedNFT(token)
  }

  useEffect(() => {
    retrieveAndFilterEligibleTokens()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>{details.title}</h2>
        <div className={styles.content}>
          <p>{details.description}</p>

          <div className={styles.content_tnc}>
            <p className={styles.content_tnc_title}>Terms and conditions</p>
            <ul>
              {details.tnc.map((tnc) => (
                <li key={tnc}>{tnc}</li>
              ))}
            </ul>
          </div>
        </div>

        <ul className={styles.tokens}>
          {availableTokens.map((_token) => {
            return (
              <NFTCard
                key={`${collectionAddr}_${_token.tokenId}`}
                collectionAddr={collectionAddr}
                token={_token}
                selected={selectedNFT}
                handleSelect={handleSelectNFT}
              />
            )
          })}
        </ul>
        <button
          type="button"
          className={styles.button}
          onClick={() => toggleModal(true)}
        >
          Redeem Now
        </button>
      </div>
    </div>
  )
}

export default CampaignDetails
