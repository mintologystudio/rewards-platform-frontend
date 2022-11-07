import styles from './index.module.scss'
import FooterLogo from "../../public/assets/misc/logo-footer-v2.png";
import { BsDiscord, BsLinkedin , BsTwitter } from 'react-icons/bs';
import MediumIcon from "../../public/assets/misc/medium-icon-standard.svg";
import Image from "next/image";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.footer_main_div}>
                    <span className={styles.footer_main_image}>
                        <Image src={FooterLogo} alt="Main Logo"/>
                    </span>
                    <span className={styles.footer_main_title}>© 2022 Mintology. All rights reserved</span>
                    <div className={styles.footer_horizontal_line}></div>
                    <div className={styles.footer_navigation}>
                        <div className={styles.footer_navigation_spaceBetween}>
                            <div className={styles.footer_navigation_spaceBetween_general}>
                                <span>Request a demo</span>
                                <span>FAQs</span>
                                <span>Contact Us</span>
                                <span>Terms of Use</span>
                                <span>Privacy policy</span>
                            </div>
                            <div className={styles.footer_navigation_spaceBetween_social}>
                                <BsTwitter/>
                                <BsDiscord/>
                                <Image src={MediumIcon}/>
                                <BsLinkedin/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
