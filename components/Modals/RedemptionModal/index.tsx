/* eslint-disable @next/next/no-img-element */
import styles from '../index.module.scss'
import Link from 'next/link'
import { IVoucher } from '../../../utils/interfaces'
import { Dispatch, DispatchWithoutAction, SetStateAction } from 'react'
import Barcode from 'react-jsbarcode'
import Routes from '../../../utils/constants/routes'
import { useRouter } from 'next/router'

const RedemptionModal = ({
  voucher,
  toggleModal,
}: {
  voucher: IVoucher
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter()
  return (
    <li className={styles.background}>
      <div className={styles.container}>
        <p>You have successfully redeemed:</p>
        <h3>{voucher.title}</h3>
        <div>
          <Barcode value={voucher.code} options={{ format: 'code128' }} />
        </div>
        <button
          className={styles.button}
          onClick={() => {
            toggleModal(false)
            router.push('/')
          }}
        >
          BACK
        </button>
      </div>
    </li>
  )
}

export default RedemptionModal
