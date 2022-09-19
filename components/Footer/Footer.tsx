import styles from './index.module.scss'
import FooterLogo from "../../public/assets/misc/logo-footer.png";
import { BsLinkedin , BsTwitter } from 'react-icons/bs';
import { FaEnvelope } from 'react-icons/fa';
import Image from "next/image";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.footer_main}>
                    <div className={styles.footer_main_div}>
                        <span className={styles.footer_main_image}>
                            <Image src={FooterLogo} alt="Main Logo" width={200} height={30}/>
                        </span>
                        <span className={styles.footer_main_title}>Enjoy real life brand benefits with your NFTs.</span>
                        <span className={styles.footer_main_copyright}>&copy; {currentYear} Mintology. All Rights Reserved</span>
                    </div>
                </div>
                <div className={styles.footer_div}>
                    <div className={styles.footer_div_title}>
                        <h3>Quick Links</h3>
                    </div>
                    <div className={styles.footer_div_items}>
                        <span className={styles.footer_div_items_item}>Request a demo</span>
                        <span className={styles.footer_div_items_item}>Merchant Signup</span>
                        <span className={styles.footer_div_items_item}>Contact Us</span>
                    </div>
                </div>
                <div className={styles.footer_div}>
                    <div className={styles.footer_div_title}>
                        <h3>Follow Us</h3>
                    </div>
                    <div className={styles.footer_div_items}>
                        <span className={styles.footer_div_items_icon}><BsLinkedin /></span>
                        <span className={styles.footer_div_items_icon}><BsTwitter /></span>
                        <span className={styles.footer_div_items_icon}><FaEnvelope /></span>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;
