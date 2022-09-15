/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from "next/image";

const delay = 500000000

const ListOfNFTs = [
    {
        url: 'assets/nfts/dummyNfts/azuki1.png',
        title: 'Digital religious fanatic',
        desc: 'Digital religious'
    },
    {
        url: 'assets/nfts/dummyNfts/azuki2.png',
        title: 'Digital religious fanatic',
        desc: 'Digital religious'
    },
    {
        url: 'assets/nfts/dummyNfts/azuki3.png',
        title: 'Digital religious fanatic',
        desc: 'Digital religious'
    },
    {
        url: 'assets/nfts/dummyNfts/doodle1.png',
        title: 'Digital religious fanatic',
        desc: 'Digital religious'
    },
];

const NFTGallery = ({ nft }
: {
    nft: {
        url: string,
        title: string,
        desc: string,
    }
}) => {
  return (
      <div className={styles.nft}>
        {/*<div className={styles.nft_imgholder}*/}
        {/*     style={{ backgroundImage: `url(${nft.url})` }}*/}
        {/*>*/}
        <div className={styles.nft_img}>
            <Image src={`/${nft.url}`} alt={nft.title} layout={'fill'}/>
        </div>
        {/*</div>*/}
        <div className={styles.nft_detail}>
          <div className={styles.nft_title}>{nft.title}</div>
          <div className={styles.nft_desc}>{nft.desc}</div>
        </div>
      </div>
  )
}

const NFTList = ({ }) => {
  return (
      <div className={styles.main}>
        <div className={styles.nfts}>
            <h2>My NFTs</h2>
            <div className={styles.nftscontainer}>
            {ListOfNFTs.map(nft => (
                <NFTGallery nft={nft}/>
            ))}
            </div>
        </div>
      </div>
  )
}

export default NFTList
