import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3 from 'web3'
import axios from 'axios'
import router, { useRouter } from 'next/router'
import { useWeb3Auth } from '../../utils/services/web3auth'
import styles from '../../styles/Login.module.scss'
import { Web3Context } from '../../context/web3Context'

interface Props {
  connector: any
  address_to_bind: string
  chainId: number
}

const SignMessage = ({ connector, address_to_bind, chainId }: Props) => {
  const { web3Auth } = useWeb3Auth()
  const [address_w3a, setAddressW3A] = useState('')
  const [loadingSignature, setLoadingSignature] = useState('')
  const [fullAddress, setFullAddress] = useState(window.innerWidth >= 410)

  const router = useRouter()

  const provider = new ethers.providers.Web3Provider(window.ethereum)
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
      setLoadingSignature('loading')
      const address = address_w3a
      const address_to_bind_chain = chainId
      const message = `Bind Account ${address_to_bind} on chainId ${address_to_bind_chain} to ${address}`
      const signature = await signer.signMessage(message)
      setLoadingSignature('done')
      console.log(signature)
      axios
        .post(
          `https://nifty-rewards.herokuapp.com/users/bind/${address_w3a}/${address_to_bind}`
        )
        .then((res) => {
          console.log(res)
          console.log(res.data)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const homeHandler = () => {
    router.push('/')
  }

  return (
    <div className={styles.info_loggedin}>
      {/* loading signature*/}
      {loadingSignature === 'loading' && (
        <div className={styles.info_loading}>
          <h2>Please sign message from nft wallet</h2>
          <button disabled className={styles.loading}>
            Pending signature...
          </button>
        </div>
      )}

      {/* generated signature */}
      {loadingSignature === 'done' && (
        <div className={styles.info_loading}>
          <h2>Congratulations</h2>
          <p className={styles.info_text}>
            You have successfully created and binded your NFT wallet
          </p>
          <button onClick={homeHandler}>Go to Home</button>
        </div>
      )}

      {/* have not signed*/}
      {loadingSignature === '' && (
        <div className={styles.info_loading}>
          <h2>Bind Wallet</h2>
          <div className={styles.info_subheading}>
            <ul>
              <li>
                Signing the message essentially proves that you are indeed the
                owner of the wallet address
              </li>
              <li>
                Mintology will not perform any transactions or require any
                approval from you
              </li>
            </ul>
          </div>

          <button onClick={signTypedMessage}>Sign Message</button>
        </div>
      )}

      <div className={styles.web3}>
        <div className={styles.web3_wallet}>Connected Wallet:</div>
        <div className={styles.web3_address}>
          {fullAddress ? (
            <p>{address_to_bind}</p>
          ) : (
            <p>
              {address_to_bind.substring(0, 4)}...
              {address_to_bind.substring(address_to_bind.length - 4)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignMessage
