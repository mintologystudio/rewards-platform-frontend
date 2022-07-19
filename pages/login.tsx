import { useWeb3Auth } from '../utils/services/web3auth'
import ConnectWallet from '../views/LoggedIn/ConnectWallet'
import Register from '../views/register'

const Login = () => {
  const { provider } = useWeb3Auth()

  return (
    <div>
      {provider ? (
        <>
          <ConnectWallet />
        </>
      ) : (
        <Register />
      )}
    </div>
  )
}

export default Login
