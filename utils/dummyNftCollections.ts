import Azuki1 from '../public/assets/nfts/dummyNfts/azuki1.png'
import Azuki2 from '../public/assets/nfts/dummyNfts/azuki2.png'
import Azuki3 from '../public/assets/nfts/dummyNfts/azuki3.png'
import Doodle1 from '../public/assets/nfts/dummyNfts/doodle1.png'
import Doodle2 from '../public/assets/nfts/dummyNfts/doodle2.png'
import Karafuru1 from '../public/assets/nfts/dummyNfts/karafuru1.png'
import Karafuru2 from '../public/assets/nfts/dummyNfts/karafuru2.png'
import Karafuru3 from '../public/assets/nfts/dummyNfts/karafuru3.png'
import { IOwnedNFTData } from './interfaces'

const listOfNftsByCollection = (collectionAddr: string): IOwnedNFTData[] => {
  switch (collectionAddr) {
    // Azuki
    case '0xED5AF388653567Af2F388E6224dC7C4b3241C544':
      return [
        {
          tokenId: 123,
          tokenImage: Azuki1.src,
        },
        {
          tokenId: 896,
          tokenImage: Azuki3.src,
        },
        {
          tokenId: 6784,
          tokenImage: Azuki2.src,
        },
      ]

    // Doodles
    case '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e':
      return [
        {
          tokenId: 1223,
          tokenImage: Doodle1.src,
        },
        {
          tokenId: 345,
          tokenImage: Doodle2.src,
        },
      ]

    // Karafuru
    case '0xd2F668a8461D6761115dAF8Aeb3cDf5F40C532C6':
      return [
        {
          tokenId: 896,
          tokenImage: Karafuru3.src,
        },
        {
          tokenId: 13,
          tokenImage: Karafuru1.src,
        },
        {
          tokenId: 9007,
          tokenImage: Karafuru2.src,
        },
      ]
    default:
      return []
  }
}

export default listOfNftsByCollection
