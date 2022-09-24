/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../../context/web3Context";
import {getNFTs} from "../../utils/api/niftyRewards";
import {extractMetaData} from "../../utils";
import {INFT} from "../../utils/interfaces";

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
const myLoader=({src}:{src:string})=>`${src}`;
const NFTImage = ({ nft }
: {
    nft: INFT
}) => {
    const srcUrl = nft.url != '' && (
        nft.url.startsWith('https://') ||
        nft.url.startsWith('http://')
    ) ? nft.url : `/${nft.url}`;

    return (
        <Image loader={myLoader} unoptimized={true}
               src={srcUrl} alt={nft.title} layout={'fill'}/>

    )
}

const NFTGallery = ({ nft }
: {
    nft: INFT
}) => {
  return (
      <div className={styles.nft}>
        {/*<div className={styles.nft_imgholder}*/}
        {/*     style={{ backgroundImage: `url(${nft.url})` }}*/}
        {/*>*/}
        <div className={styles.nft_img}>
            <NFTImage nft={nft} />
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
    const { appState } = useContext(Web3Context);
    const [loading, setLoading] = useState<boolean>(false)
    const [nfts, setNfts] = useState<Array<INFT>>([]);

    const getMyNfts = async () => {
        try {
            // const address = `0xA63dDdB69E6e470Bf3d236B434EF80a213B998A7`;
            const address = appState.address_w3a;

            // load from api
            console.log("bindAddress", address);
            if (address && address != '') {
                const apiResponse = await getNFTs(address);

                if (apiResponse.status) {
                    const extractMeta = extractMetaData(apiResponse.nfts);
                    setNfts(extractMeta);
                }
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getMyNfts();
    }, [appState.address_w3a]);

    let key = 1;

  return (
      <div className={styles.main}>
        <div className={styles.nfts}>
            <h2>My NFTs</h2>
            <div className={styles.nftscontainer}>
                {/*{ListOfNFTs.map(nft => (*/}
                {
                    nfts.length == 0?
                        (
                            <div className={styles.emptynft}>
                                <span>No NFTs found from you wallet</span>
                            </div>
                        ) : (
                            <>
                            {nfts.map(nft => (
                                <NFTGallery nft={nft} key={key++}/>
                                ))}
                            </>
                        )
                }

            </div>
        </div>
      </div>
  )
}

export default NFTList
