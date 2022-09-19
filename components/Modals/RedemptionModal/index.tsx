/* eslint-disable @next/next/no-img-element */
import styles from '../index.module.scss'
import Link from 'next/link'
import { IVoucher } from '../../../utils/interfaces'
import { Dispatch, DispatchWithoutAction, SetStateAction } from 'react'
import Barcode from 'react-jsbarcode'
import Routes from '../../../utils/constants/routes'
import { useRouter } from 'next/router'
import Badge from "../../Badge";
import Image from "next/image";
import NftSearch from "../../../public/assets/misc/searchnft.svg";

const RedemptionModal = ({
  voucher,
  company,
  toggleModal,
  isEmpty
}: {
  voucher: IVoucher
  company: string
  isEmpty?: boolean
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter()
  return (
    <li className={styles.background}>
      <div className={styles.container}>

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
                {/*<Barcode value={voucher.code} options={{ format: 'code128' }} />*/}
            </div>
            <div className={styles.info}>
                <span className={styles.info_text}>
                    You can review and manage your perks in “My Perks”.
                    <Link href={'/perk'}><span className={styles.info_link}>Go there</span></Link>
                </span>
            </div>

          <button
            className={styles.button}
            onClick={() => {
              toggleModal(false)
              // router.push('/')
            }}
          >
            Use Now
          </button>
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
