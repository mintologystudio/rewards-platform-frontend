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
import {ICampaignNew, IOwnedNFTData, IOwnedNFTDataSelection} from '../../utils/interfaces'
import styles from './index.module.scss'
import Image from 'next/image'
import NFTCard from '../NFTCard'
import listOfNftsByCollection from '../../utils/dummyNftCollections'
import { Web3Context } from '../../context/web3Context'
import {BsClockFill, BsFillBookmarkCheckFill} from "react-icons/bs";
import {BigNumberFormatter, getReadableTime, getTimeDate, getUSFormatDate} from "../../utils";
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
  redemptionRemaining,
  redeemCampaign,
  redeemed
}: {
  campaign: ICampaignNew
  collectionAddr?: string
  details?: IVoucher
  toggleModal: Dispatch<SetStateAction<boolean>>
  redemptionRemaining: number | undefined
  redeemCampaign: Function
  redeemed: boolean
}) => {
  const { appState } = useContext(Web3Context);
  const [availableTokens, setAvailableTokens] = useState<
    IOwnedNFTDataSelection[]
  >([])
  const [selectedNFT, setSelectedNFT] = useState<IOwnedNFTDataSelection>()
  const { login, logout, provider } = useWeb3Auth()

  const {_id, company, offer, remaining, startDate, endDate, bgUrl} = campaign;
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  // const retrieveUserNFTs = async () => {
  //   // const tokens = await getTokensFromUser(
  //   //   mockUserWalletAddress,
  //   //   collectionAddr
  //   // )
  //
  //   // Mock return some basic images
  //   const tokens = listOfNftsByCollection(collectionAddr)
  //   return tokens
  // }
  //
  // const retrieveAndFilterEligibleTokens = async () => {
  //   // Query Moralis to detect all NFTs that this user owned
  //   const userTokens = await retrieveUserNFTs()
  //
  //   // Query backend to detect NFTs that are already claimed for this voucher
  //   const mockRedeemedTokenIds = [896]
  //
  //   const filteredTokens = userTokens.map((_token) => {
  //     return {
  //       ..._token,
  //       redeemed: mockRedeemedTokenIds.includes(_token.tokenId),
  //     }
  //   })
  //   setAvailableTokens(filteredTokens)
  // }
  //
  // const handleSelectNFT = (token: IOwnedNFTDataSelection) => {
  //   if (token.redeemed) return
  //   setSelectedNFT(token)
  // }

  const loginHandler = async () => {
    if (!isExpired && !(appState.address_to_bind)) await logout();
    login();
  }

  const offerDisplay = (offers: string[] | undefined) => {
    if (offers && offers.length > 0) {
      return <h3 className={styles.content_tnc_title}>{offers[0]}</h3>;
    } else {
      return <h3 className={styles.content_tnc_title}></h3>
    }
  }

  // useEffect(() => {
  //   retrieveAndFilterEligibleTokens();
  // }, [collectionAddr])

  const [sday, smonth, syear] = getTimeDate(startTime);
  const [eday, emonth, eyear] = getTimeDate(endTime);
  const usStartDate = getUSFormatDate(sday, smonth, syear);
  const usEndDate = getUSFormatDate(eday, emonth, eyear);
  const countdownDate = new Date(usEndDate);
  const [days, hours, mins, seconds] = getReadableTime(countdownDate.getTime() - new Date().getTime());

  const isExpired = new Date(endTime) < new Date();

  const showSoldOld = redemptionRemaining !== undefined && redemptionRemaining === 0;

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

          <div className={styles.campaign_timeleft_redeem_expired}>
            <div className={styles.campaign_timeleft}>
              {
                !isExpired? (
                    <>
                      <BsClockFill className={styles.campaign_timeleft_icon}/>
                      <span>
                          Time Left: {days}d {hours}h {mins}m
                      </span>
                    </>
                ) :
                    <>
                      <BsClockFill className={styles.campaign_timeleft_icon}/>
                      <span>Claim period ended</span>
                    </>
              }

            </div>
            <div className={styles.campaign_redeem}>
              <BsFillBookmarkCheckFill className={styles.campaign_redeem_icon} />
              <span>
                Remaining: { isExpired? 0 : BigNumberFormatter(redemptionRemaining)}
              </span>
            </div>
            <div className={styles.campaign_soldout}>
              {showSoldOld ?
              <span className={styles.soldout}>
                Sold Out
              </span> : (<></>)
              }
            </div>
          </div>

        </div>

        <div className={styles.campaign}>
          <div className={styles.campaign_detail}>
              {/*<img src={`/assets/nfts/banner/${campaign.nft}.png`} className={styles.campaign_detail_img}/>*/}
              <img src={campaign.bgUrl} alt={'details1'} className={styles.campaign_detail_img}/>

              <div className={styles.campaign_detail_top}>
                {/*{offerDisplay(campaign.offers)}*/}
                <h3 className={styles.content_tnc_title}>{campaign.offer}</h3>
                <p>{campaign.description}</p>
              </div>

            <div className={styles.content_tnc}>
              <h3 className={styles.content_tnc_title}>Terms and conditions</h3>
              <ul>
                {campaign.tnc.map((tnc) => (
                    <li key={tnc}>{tnc}</li>
                ))}
              </ul>
            </div>

            <div className={styles.content_button}>
              { !isExpired && !showSoldOld && !(appState.address_to_bind != '') ?
                  (<button type="button" onClick={loginHandler}>Get It Now</button>)
                  :
                  !isExpired && !showSoldOld && appState.chainId === 1 && (<button
                      type="button"
                      disabled={redeemed}
                      className={styles.button}
                      onClick={()=>redeemCampaign(_id)}>Get It Now</button>)
              }

              {isExpired && !showSoldOld &&
                (
                    <button
                        type="button"
                        disabled
                        className={styles.button}
                    >Claim period ended</button>
                )
              }

              {showSoldOld &&
                (
                    <button
                        type="button"
                        disabled
                        className={styles.button}
                    >Sold Out</button>
                )
              }

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
