import { useContext, useState } from 'react'
import { Web3Context } from '../../context/web3Context'
import useSignMessage from '../../hooks/useSignMessage'
import { getDisplayAddress } from '../../utils'
import { signMessageForBinding } from '../../utils/api/niftyRewards'
import styles from './index.module.scss'
import { MoonLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import Routes from '../../utils/constants/routes'

const instructions = [
  'Signing the message essentially proves that you are indeed the owner of the wallet address',
  'Mintology will not perform any transactions or require any approval from you',
]
const BindWallet = () => {
  const router = useRouter()
  const { appState: Web3State } = useContext(Web3Context)
  const {
    data: signatureMessage,
    loading: signingMessage,
    error: errorMessage,
    signMessage,
  } = useSignMessage()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [binded, setBinded] = useState<boolean>(false)

  const handleBinding = async () => {
    setLoading(true)
    const message = `Bind Account ${Web3State.address_w3a} on chainId ${Web3State.chainId} to ${Web3State.address_to_bind}`

    // Sign message to network
    const signature = await signMessage(message)

    // Send signature to backend
    if (signature) {
      const apiResponse = await signMessageForBinding(
        Web3State.address_w3a,
        Web3State.address_to_bind,
        1,
        message,
        signature
      )

      if (apiResponse) {
        // Successfully binded
        setBinded(true)
      } else {
        // Failed to bind
        setBinded(false)
      }
    }

    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {binded ? (
          <>
            <h2>Congratulations</h2>
            <p className={styles.main_text}>
              You have successfully created and binded your NFT wallet
            </p>
            <button type="button" onClick={() => router.push(Routes.HOME)}>
              GO TO HOME
            </button>

            <div className={styles.address}>
              <div className={styles.address_tag}>Connected Wallet</div>
              <p>{getDisplayAddress(Web3State.address_to_bind)}</p>
            </div>
          </>
        ) : (
          <>
            <h2>Bind Wallet</h2>
            <ul className={styles.instructions}>
              {instructions.map((instruct, index: number) => (
                <li key={`Instruction_${index}`}>{instruct}</li>
              ))}
            </ul>
            {loading ? (
              <button disabled className={styles.loader}>
                <MoonLoader loading={true} color="white" size={30} />
              </button>
            ) : (
              <button type="button" onClick={handleBinding}>
                SIGN MESSAGE
              </button>
            )}

            <div className={styles.address}>
              <div className={styles.address_tag}>Connected Wallet</div>
              <p>{getDisplayAddress(Web3State.address_to_bind)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BindWallet
