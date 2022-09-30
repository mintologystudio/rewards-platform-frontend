import {useContext, useEffect, useState} from 'react'
import { ethers } from 'ethers'
import Web3 from 'web3'
import axios from 'axios'
import router, { useRouter } from 'next/router'
import { useWeb3Auth } from '../../utils/services/web3auth'
import styles from '../../styles/Login.module.scss'
import { Web3Context } from '../../context/web3Context'
import {BsFillCheckCircleFill} from "react-icons/bs";
import Routes from "../../utils/constants/routes";
import {refreshAddress, signMessageForBinding} from "../../utils/api/niftyRewards";

interface Props {
  connector: any
  address_to_bind: string
  chainId: number
  w3provider?: any
}

const SignMessage = ({ connector, address_to_bind, chainId, w3provider }: Props) => {
  const { web3Auth } = useWeb3Auth()
  const [address_w3a, setAddressW3A] = useState('')
  const [loadingSignature, setLoadingSignature] = useState('')
  const [fullAddress, setFullAddress] = useState(window.innerWidth >= 410)
  const [binded, setBinded] = useState<boolean>(false);
  const [failMsg, setFailMsg] = useState('')
  const router = useRouter()

  // const provider = new ethers.providers.Web3Provider(window.ethereum)
  const provider = new ethers.providers.Web3Provider(w3provider);
  const signer = provider.getSigner()

  const formatWalletAddress = () => {
    setFullAddress(window.innerWidth >= 410)
  }

  const getInfos = async () => {
    if (!web3Auth || !web3Auth.provider) return
    const web3 = new Web3(web3Auth.provider as any)
    let account_w3a = (await web3.eth.getAccounts())[0]
    setAddressW3A(account_w3a)
  }

  getInfos()

  useEffect(() => {
    if (connector) {
      getInfos()
    }
  }, [connector])

  useEffect(() => {
    window.addEventListener('resize', formatWalletAddress)
    return () => window.removeEventListener('resize', formatWalletAddress)
  })

  const signTypedMessage = async () => {
    try {
      //sign message
      setFailMsg('');
      setLoadingSignature('loading');
      const address = address_w3a;
      const address_to_bind_chain = chainId;
      const message = `Bind Account ${address_to_bind} on chainId ${address_to_bind_chain} to ${address}`
      const signature = await signer.signMessage(message);

      // Send signature to backend
      // console.log(signature);
      if (signature) {
        const apiResponse = await signMessageForBinding(
            address_w3a,
            address_to_bind,
            1,
            message,
            signature
        );
        // setRes(apiResponse);
        if (apiResponse && apiResponse.status) {
          setLoadingSignature('done');
          // Successfully binded
          setBinded(true)
          await refreshAddress(address);
        } else {
        //   // Failed to bind
          setLoadingSignature('');
          setFailMsg('FAILED TO BIND WALLET');
          setBinded(false)
        }


      }
      // old
      // setLoadingSignature('done')
      // console.log(signature)
      // axios
      //   .post(
      //     `https://nifty-rewards.herokuapp.com/users/bind/${address_w3a}/${address_to_bind}`
      //   )
      //   .then((res) => {
      //     console.log(res)
      //     console.log(res.data)
      //   })
    } catch (err) {
      console.log(err)
    }
  }

  const homeHandler = () => {
    if (router && router.query && router.query.campaignId) {
      const _campaignId = (router.query.campaignId as string) || '';
      if (_campaignId && _campaignId !== '') {
        router.push(`${Routes.VIEW_CAMPAIGN}?campaignId=${_campaignId}`);
      }
    } else {
      router.push('/')
    }
  }

  return (
      <div className={styles.connect}>
      {/* loading signature*/}
      {loadingSignature === 'loading' && (
          <>
            <span>Please sign message from NFT wallet</span>
            <div className={styles.connect_connected}>
              <p className={styles.connect_connected_title}>Connected Wallet</p>

              {fullAddress ? (
                  <p className={styles.connect_connected_wallet}>{address_to_bind}</p>
              ) : (
                  <p className={styles.connect_connected_wallet}>
                    {address_to_bind.substring(0, 4)}...
                    {address_to_bind.substring(address_to_bind.length - 4)}
                  </p>
              )}
            </div>
            <br/>
            <p className={styles.connect_text}>Signing the message essentially proves that you<br/>are indeed the owner of the wallet address</p>
            <p className={styles.connect_text}>Mintology will not perform any transactions or<br/>require any approval from you.</p>

            <p className={styles.connect_connected_pending}>Pending signature...</p>
          </>

      )}

      {/* generated signature */}
      {loadingSignature === 'done' && (
          <>
            <p className={styles.connected_title}>Congratulations</p>
            <br/>
            <div className={styles.connected}>
              <BsFillCheckCircleFill className={styles.connected_icon} />
              <p className={styles.connected_text}>
                You have successfully created and binded your NFT wallet
              </p>
            </div>

            <button className={styles.connect_button} onClick={homeHandler}>Go back</button>
          </>

      )}

      {/* have not signed*/}
      {loadingSignature === '' && (
          <>
          <span>Bind Wallet</span>
          <div className={styles.connect_connected}>
            <p className={styles.connect_connected_title}>Connected Wallet</p>

              {fullAddress ? (
                  <p className={styles.connect_connected_wallet}>{address_to_bind}</p>
              ) : (
                  <p className={styles.connect_connected_wallet}>
                    {address_to_bind.substring(0, 4)}...
                    {address_to_bind.substring(address_to_bind.length - 4)}
                  </p>
              )}
          </div>
            <br/>
            <p className={styles.connect_text}>Signing the message essentially proves that you<br/>are indeed the owner of the wallet address</p>
            <p className={styles.connect_text}>Mintology will not perform any transactions or<br/>require any approval from you.</p>
            {
              failMsg === '' ? (<></>) : (
                  <p className={styles.connect_connected_pending}>{failMsg}</p>
              )
            }
            <br/>

          <button className={styles.connect_button} onClick={signTypedMessage}>Sign Message</button>
        </>
      )}

    </div>
  )
}

export default SignMessage
