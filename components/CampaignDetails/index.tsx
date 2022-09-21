/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getTokensFromUser } from '../../utils/api'
import {ICampaign, IOwnedNFTData, IOwnedNFTDataSelection} from '../../utils/interfaces'
import styles from './index.module.scss'
import Image from 'next/image'
import NFTCard from '../NFTCard'
import listOfNftsByCollection from '../../utils/dummyNftCollections'
import { Web3Context } from '../../context/web3Context'
import {BsClockFill, BsFillBookmarkCheckFill} from "react-icons/bs";
import {getReadableTime, getTimeDate, getUSFormatDate} from "../../utils";
import { useWeb3Auth } from '../../utils/services/web3auth'

interface IVoucher {
  title: string
  description: string
  tnc: string[]
  code: string
}

const mockUserWalletAddress = '0xaf07daD7F6e4ac3eeDB227B6cfCB5E0f476d6dB4'

const CampaignDetails = ({
  campaign,
  collectionAddr,
  details,
  toggleModal,
  redemptionRemaining
}: {
  campaign: ICampaign
  collectionAddr: string
  details: IVoucher
  toggleModal: Dispatch<SetStateAction<boolean>>
  redemptionRemaining: number | undefined
}) => {
  const { appState } = useContext(Web3Context);
  const [availableTokens, setAvailableTokens] = useState<
    IOwnedNFTDataSelection[]
  >([])
  const [selectedNFT, setSelectedNFT] = useState<IOwnedNFTDataSelection>()
  const { login, logout, provider } = useWeb3Auth()

  const retrieveUserNFTs = async () => {
    // const tokens = await getTokensFromUser(
    //   mockUserWalletAddress,
    //   collectionAddr
    // )

    // Mock return some basic images
    const tokens = listOfNftsByCollection(collectionAddr)
    return tokens
  }

  const retrieveAndFilterEligibleTokens = async () => {
    // Query Moralis to detect all NFTs that this user owned
    const userTokens = await retrieveUserNFTs()

    // Query backend to detect NFTs that are already claimed for this voucher
    const mockRedeemedTokenIds = [896]

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
    retrieveAndFilterEligibleTokens();
  }, [collectionAddr])

  const countDownInMilli = (campaign.expiration? campaign.expiration : new Date(1668950741000).getTime()) - new Date().getTime()
  const [days, hours, mins, seconds] = getReadableTime(countDownInMilli);

  const [sday, smonth, syear] = getTimeDate(campaign.startTime);
  const [eday, emonth, eyear] = getTimeDate(campaign.endTime);
  const usStartDate = getUSFormatDate(sday, smonth, syear);
  const usEndDate = getUSFormatDate(eday, emonth, eyear);

  const isExpired = new Date(campaign.endTime) < new Date();

  return (
    <div className={styles.container}>
      {/*<div className={styles.main}>*/}
      {/*  <h2>{details.title}</h2>*/}
      {/*  <div className={styles.content}>*/}
      {/*    <p>{details.description}</p>*/}

      {/*    <div className={styles.content_tnc}>*/}
      {/*      <p className={styles.content_tnc_title}>Terms and conditions</p>*/}
      {/*      <ul>*/}
      {/*        {details.tnc.map((tnc) => (*/}
      {/*          <li key={tnc}>{tnc}</li>*/}
      {/*        ))}*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  </div>*/}

        {/*{Web3State.address_to_bind ? (*/}
        {/*  <>*/}
        {/*    <ul className={styles.tokens}>*/}
        {/*      {availableTokens.map((_token) => {*/}
        {/*        return (*/}
        {/*          <NFTCard*/}
        {/*            key={`${collectionAddr}_${_token.tokenId}`}*/}
        {/*            collectionAddr={collectionAddr}*/}
        {/*            token={_token}*/}
        {/*            selected={selectedNFT}*/}
        {/*            handleSelect={handleSelectNFT}*/}
        {/*          />*/}
        {/*        )*/}
        {/*      })}*/}
        {/*    </ul>*/}
        {/*    <button*/}
        {/*      type="button"*/}
        {/*      className={styles.button}*/}
        {/*      onClick={() => toggleModal(true)}*/}
        {/*    >*/}
        {/*      Redeem Now*/}
        {/*    </button>*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  <h2>Connect your wallet to redeem</h2>*/}
        {/*)}*/}
      {/*</div>*/}

      <div className={styles.main}>
        <div className={styles.campaign} style={{ marginTop: '-15rem', marginBottom: '2rem' }}>
          <div className={styles.campaign_info}>
            <span className={styles.campaign_info_title}>Location</span>
            <span className={styles.campaign_info_text}>{campaign.location}</span>
          </div>
          <div className={styles.campaign_info}>
            <span className={styles.campaign_info_title}>Start Date</span>
            <span className={styles.campaign_info_text}>{usStartDate}</span>
          </div>
          <div className={styles.campaign_info}>
            <span className={styles.campaign_info_title}>End Date</span>
            <span className={styles.campaign_info_text}>{usEndDate}</span>
          </div>

          <div className={styles.campaign_timeleft_redeem}>
            <div className={styles.campaign_timeleft}>
              {
                !isExpired? (
                    <>
                      <BsClockFill className={styles.campaign_timeleft_icon}/>
                      <span>
                          Time Left: {days}d {hours}h {seconds}s
                      </span>
                    </>
                ) :
                    <span className={styles.expiredtext}>Expired</span>
              }

            </div>
            <div className={styles.campaign_redeem}>
              <BsFillBookmarkCheckFill className={styles.campaign_redeem_icon} />
              <span>
                Redeemed: {redemptionRemaining}
              </span>
            </div>
          </div>

        </div>

        <div className={styles.campaign}>
          <div className={styles.campaign_detail}>
              {/*<img src={`/assets/nfts/banner/${campaign.nft}.png`} className={styles.campaign_detail_img}/>*/}
              <img src={`/assets/details1.png`} alt={'details1'} className={styles.campaign_detail_img}/>

              <div className={styles.campaign_detail_top}>
                <h3 className={styles.content_tnc_title}>{campaign.offer}</h3>
                <p>{details.description}</p>
              </div>

            <div className={styles.content_tnc}>
              <h3 className={styles.content_tnc_title}>Terms and conditions</h3>
              <ul>
                {details.tnc.map((tnc) => (
                    <li key={tnc}>{tnc}</li>
                ))}
              </ul>
            </div>

            <div className={styles.content_button}>
              { !isExpired && !(appState.address_to_bind != '') ?
                  (<button type="button" onClick={login}>Get It Now</button>)
                  :
                  !isExpired && appState.chainId === 1 && (<button
                      type="button"
                      className={styles.button}
                      onClick={() => toggleModal(true)}>Get It Now</button>)
              }

                {/*<button type="button" onClick={logout}>Logout</button>*/}
              {/*<button*/}
              {/*    type="button"*/}
              {/*    className={styles.button}*/}
              {/*    onClick={() => toggleModal(true)}>Get It Now</button>*/}
              {/*{provider &&*/}
              {/*<button*/}
              {/*    type="button"*/}
              {/*    className={styles.button}*/}
              {/*    onClick={() => toggleModal(true)}>Get It Now</button>*/}
              {/*}*/}
                {/*<button type="button" onClick={getUserInfo}>getUserInfo</button>*/}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
