import styles from './index.module.scss'
import FooterLogo from "../../public/assets/misc/logo-footer-v2.png";
import { BsDiscord, BsLinkedin , BsTwitter } from 'react-icons/bs';
import TwitterIcon from "../../public/assets/misc/Twitter.svg";
import DiscordIcon from "../../public/assets/misc/Discord.svg";
import MediumIcon from "../../public/assets/misc/medium-icon-standard.svg";
import Linkedin from "../../public/assets/misc/Linkedin.svg";
import Image from "next/image";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <section className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_container_10}>
                    <Image width={216} height={"33.63px"} src={FooterLogo} alt="Main Logo"/>
                </div>
                <div className={styles.footer_bottom_2}>
                    <div className={styles.footer_bottom_2_copyright_2}>© 2022 Mintology. All rights reserved</div>
                </div>
                <div className={styles.footer_divider_two_2}></div>
                <div className={styles.footer_wrapper_three}>
                    <div className={styles.footer_wrapper_three_block_three}>
                        <a href="mailto:hello@mintology.studio" className="footer-link">Contact Us</a>
                        <a href="https://mintology.studio/faqs" className="link">FAQs</a>
                        <a href="https://mintology.studio/termsofuse" className="link">Terms of Use</a>
                        <a href="https://mintology.studio/privacypolicy">Privacy Policy</a>
                    </div>
                    <div className={styles.footer_wrapper_three_block_three_2}>
                        <a href="https://twitter.com/MintologyStudio" className="footer-link"><Image src={TwitterIcon} /></a>
                        <a href="https://discord.com/invite/48NFUtjPcc" className="link"><Image src={DiscordIcon}/></a>
                        <a href="https://medium.com/@mintology.studio" className="link"><Image src={MediumIcon} /></a>
                        <a href="https://www.linkedin.com/company/mintology-studio/"><Image src={Linkedin} /></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;
