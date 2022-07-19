/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from 'next/image'
import { IOwnedNFTDataSelection } from '../../utils/interfaces'

const NFTCard = ({
  selected,
  collectionAddr,
  token,
  handleSelect,
}: {
  selected: IOwnedNFTDataSelection | undefined
  collectionAddr: string
  token: IOwnedNFTDataSelection
  handleSelect: (token: IOwnedNFTDataSelection) => void
}) => {
  return (
    <li
      onClick={() => handleSelect(token)}
      className={`${styles.token} ${
        selected === token ? styles.token_selected : ''
      } ${token.redeemed ? styles.token_redeemed : ''}`}
    >
      <Image
        src={token.tokenImage || '/assets/misc/UnableToLoad.png'}
        alt={`${collectionAddr.slice(1, 5)}_${token.tokenId}`}
        layout="fill"
      />
      <div className={styles.token_id}>
        <p>#{token.tokenId}</p>
      </div>
    </li>
  )
}

export default NFTCard
