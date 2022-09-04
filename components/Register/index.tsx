import useWeb3Auth from '../../hooks/useWeb3Auth'
import styles from './index.module.scss'

const Register = ({ handleLogin }: { handleLogin: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.main_tag}>Mintology</div>
        <h2>
          Bridging Brands with <br /> NFT Users
        </h2>
        <button type="button" onClick={handleLogin}>
          GET STARTED
        </button>
      </div>
    </div>
  )
}

export default Register
