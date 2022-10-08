/* eslint-disable @next/next/no-img-element */
import styles from '../index.module.scss'
import Link from 'next/link'
import { IVoucher } from '../../../utils/interfaces'
import {Dispatch, DispatchWithoutAction, SetStateAction, useState} from 'react'
import {RiCloseCircleFill} from "react-icons/ri";
import {IoCopyOutline} from "react-icons/io5";
import Barcode from 'react-jsbarcode'
import Routes from '../../../utils/constants/routes'
import { useRouter } from 'next/router'
import Badge from "../../Badge";
import Image from "next/image";
import NftSearch from "../../../public/assets/misc/searchnft.svg";

const RedemptionModal = ({
  website,
  voucher,
  company,
  toggleModal,
  isEmpty
}: {
  voucher: IVoucher
  website: string | undefined | null
  company: string
  isEmpty?: boolean
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const url = website && (website.includes('https://') || website.includes('http://')) ?
      website : `https://${website}`;

  const redirect = () => {
    if (website) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toggleModal(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  return (
    <li className={styles.background}>
      <div className={styles.container}>
        <span className={styles.close} onClick={ () => toggleModal(false)}>
          <RiCloseCircleFill className={styles.close_icon}/>
        </span>

     {!isEmpty ? (
       <>
          <p>Successfully Redeemed:</p>
            <div className={styles.company}>
              <Badge company={company} width={'20rem'}/>
              <p>{voucher.title}</p>
            </div>
            <div className={styles.voucher}>
                <div className={styles.voucher_title}>Voucher Code</div>
                <div className={styles.voucher_code}>{voucher.code}</div>
                <div className={styles.copy}>
                  {!copied ?
                      <button className={styles.emptyBtn} onClick={() => copyToClipboard(voucher.code)}>
                        <IoCopyOutline className={styles.copy_icon}/>
                      </button>
                      :
                      <span>Copied!</span>
                  }
                </div>
                {/*<Barcode value={voucher.code} options={{ format: 'code128' }} />*/}
            </div>
            <div className={styles.info}>
                <span className={styles.info_text}>
                    You can review and manage your perks in “My Perks”.
                    <Link href={'/perk'}><span className={styles.info_link}>Go there</span></Link>
                </span>
            </div>

         <a target="_blank" href={url} rel="noopener noreferrer">
           <button className={styles.button}>
           Use Now
           </button>
         </a>


        </>
     ) : (
        <>
          <p>{"Not eligible for this offer"}</p>
            <div className={styles.logo_image}>
              <Image src={NftSearch} alt="Nft Search" layout="fill" />
            </div>
          <div className={styles.info}>
                <span className={styles.info_text}>
                  {"We couldn't find any qualifying NFTs in your wallet."}
                </span>
          </div>

          <button
            className={styles.button}
            onClick={() => {
                toggleModal(false)
            }}
          >
            Back
          </button>
          </>
        )

        }
      </div>
    </li>
  )
}

export default RedemptionModal
