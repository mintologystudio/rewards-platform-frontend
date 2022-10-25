/* eslint-disable @next/next/no-img-element */
import styles from '../index.module.scss'
import Link from 'next/link'
import { IVoucher } from '../../../utils/interfaces'
import {Dispatch, SetStateAction, useState} from 'react'
import {RiCloseCircleFill} from "react-icons/ri";
import {IoCopyOutline} from "react-icons/io5";
import MoonLoader from "react-spinners/MoonLoader";
import Barcode from 'react-jsbarcode'
import Routes from '../../../utils/constants/routes'
import Badge from "../../Badge";
import Image from "next/image";
import NftSearch from "../../../public/assets/misc/searchnft.svg";
import {getHttpsUrl} from "../../../utils";

const RedeemSuccess = ({
  website,
  voucher,
  company,
  toggleModal,
}: {
  voucher?: IVoucher
  website: string | undefined | null
  company: string
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [copied, setCopied] = useState(false);

  const url = website ? getHttpsUrl(website) : '/';

  const vc = voucher ? voucher : undefined;
  //     {
  //     title: '10% Off Footwear',
  //     description:
  //         '10% off when you purchase any footwear on atmosusa.com!',
  //     tnc: [
  //         'Limited to 1 redemption per user. Limited redemptions are available for the period.',
  //         'Claims are available until June 20, 2022, or while supplies last.',
  //         'Applicable only for online purchases on atmosusa.com.',
  //         'Other Atmos T&Cs apply.'
  //     ],
  //     code: 'Q1238372421',
  // };

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
      <>
        <p>Successfully Redeemed:</p>
        <div className={styles.company}>
          <Badge company={company} width={'20rem'}/>
          <p>{vc?.title}</p>
        </div>
        <div className={styles.voucher}>
          <div className={styles.voucher_title}>Voucher Code</div>
          <div className={styles.voucher_code}>{vc?.code}</div>
          <div className={styles.copy}>
            {!copied ?
                <button className={styles.emptyBtn} onClick={() => copyToClipboard((vc?vc.code:''))}>
                  <IoCopyOutline className={styles.copy_icon}/>
                </button>
                :
                <span>Copied!</span>
            }
          </div>
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
  )
}

const RedemptionModal = ({
  website,
  voucher,
  company,
  showLoading,
  toggleModal,
  isEmpty
}: {
  voucher?: IVoucher
  website: string | undefined | null
  company: string
  isEmpty?: boolean
  showLoading?: boolean
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {

  return (
    <li className={styles.background}>
      <div className={styles.container}>
        <span className={styles.close} onClick={ () => toggleModal(false)}>
          <RiCloseCircleFill className={styles.close_icon}/>
        </span>

        {
          showLoading ? (
              <>
                  <MoonLoader color="#E717A7" size={100}/>
              </>
          ) : (

             !isEmpty && !!voucher ? (
                 <RedeemSuccess website={website} company={company} toggleModal={toggleModal} voucher={voucher} />

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
            )
        }
      </div>
    </li>
  )
}

export default RedemptionModal
