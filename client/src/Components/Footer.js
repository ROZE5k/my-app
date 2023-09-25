import React from "react";
import {isMobile} from 'react-device-detect';
import styles from "./Footer.module.css";
import youtuicon from "../images/youtuicon.png";
import insicon from "../images/insicon.png";
import rozefooterlogo from "../images/rozefooterlogo.png";

function Footer(){
    return(
        <div className={`${styles.Footer} ${isMobile&&styles.mobileFooter}`}>
            <img src={rozefooterlogo} className={styles.rozefooterlogo}/>
            <div className={styles.snssection}>
                <a href="https://www.youtube.com/channel/UCtRLfKa-17BiJs2OrKYSe1w" target="_blank" rel="noopener noreferrer"><img src={youtuicon} /></a>
                <a href="https://www.instagram.com/roeweol/" target="_blank" rel="noopener noreferrer"><img src={insicon} /></a>
            </div>
            <p className={styles.copyright}>Copyright© ROZE. All Rights Reserved.</p>
        </div>
    );
};

export default Footer;