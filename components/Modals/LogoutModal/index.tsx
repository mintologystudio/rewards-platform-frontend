/* eslint-disable @next/next/no-img-element */
import styles from '../index.module.scss'
import {Dispatch, SetStateAction} from 'react'

const LogoutModal = ({
  logout,
  toggleModal
}: {
  logout: () => Promise<any>
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {

  return (
    <li className={styles.background}>
      <div className={styles.logoutContainer}>
        <p>Confirm Logout?</p>
        <div className={styles.logoutBtn}>
          <div className={styles.actionBtn}>
            <button className={styles.buttonCancel} onClick={ () => toggleModal(false)}>
              Cancel
            </button>
          </div>
          <div className={styles.actionBtn}>
            <button className={styles.button} onClick={logout}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LogoutModal
