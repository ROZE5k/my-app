import React from "react";
import {isMobile} from 'react-device-detect';
import p_main from "../images/p_main.jpg";
import p_medium from "../images/p_medium.jpg";
import p_small from "../images/p_small.jpg";
import styles from "./PhotoBox.module.css";
import  {Link} from 'react-router-dom';

function PhotoBox(){
    return(
        <div className={`${styles.photoBox} ${isMobile&&styles.mobilephotoBox}`}>
             <ul>
                <li className={styles.p_main}><img src={p_main} /></li>
                <li className={styles.p_sub}>
                    <ul>
                         <li className={styles.p_medium}><img src={p_medium} /></li>
                         <li className={styles.p_small}><img src={p_small} /></li>
                         <li className={styles.p_more_btn}>
                            <Link to={`/PhotoGraphy/`}>{isMobile?<p>more +</p>:<><p>+</p><p>more</p></>}</Link>
                         </li>
                    </ul>
                </li>
             </ul>
        </div>
    );
}

export default PhotoBox;