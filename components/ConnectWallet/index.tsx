import useWeb3Modal from '../../hooks/useWeb3Modal'
import styles from './index.module.scss'

const instructions = [
  'Make sure you are connecting the wallet that is holding your NFT collection',
  'Each wallet can only be binded once to your web3auth account',
]
const ConnectWallet = () => {
  const { initialConnect } = useWeb3Modal()

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>
          Connect your <br />
          NFT wallet
        </h2>
        <ul className={styles.instructions}>
          {instructions.map((instruct, index: number) => (
            <li key={`Instruction_${index}`}>{instruct}</li>
          ))}
        </ul>
        <button type="button" onClick={initialConnect}>
          WEB3MODAL
        </button>
      </div>
    </div>
  )
}

export default ConnectWallet
