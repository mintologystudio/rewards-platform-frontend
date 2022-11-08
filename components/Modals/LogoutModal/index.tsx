/* eslint-disable @next/next/no-img-element */
import styles from '../index.module.scss'
import {Dispatch, SetStateAction, useState} from 'react'
import {RiCloseCircleFill} from "react-icons/ri";
import {IoCopyOutline} from "react-icons/io5";
import {getDisplayAddress} from "../../../utils";

const LogoutModal = ({
  address,
  logout,
  toggleModal
}: {
  address: string
  logout: () => Promise<any>
  toggleModal: Dispatch<SetStateAction<boolean>>
}) => {

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  return (
    <li className={styles.background}>
      <div className={styles.logoutContainer}>
        <span className={styles.close} onClick={ () => toggleModal(false)}>
          <RiCloseCircleFill className={styles.close_icon}/>
        </span>
        <div style={{ display: "flex", flexDirection:'row', justifyContent: 'space-evenly', width: '18rem'}}>
          <p>{getDisplayAddress(address)}</p>
          <button className={styles.emptyBtn} onClick={() => copyToClipboard(address)}>
            <IoCopyOutline className={styles.copy_icon}/>
          </button>
        </div>
        {copied &&
        <div className={styles.copy} style={{position: 'absolute'}}>
          <span>Copied!</span>
        </div>
        }
        <div className={styles.logoutBtn}>
            <button className={styles.button} onClick={logout}>
              Disconnect Wallet
            </button>
        </div>
      </div>
    </li>
  )
}

export default LogoutModal
