import React, { useState, useEffect } from "react";
import {isMobile} from 'react-device-detect';
import styles from './AboutTitle.module.css';
import about_btn from '../images/about_btn.png';
import roze_text from '../images/roze_text.png';
import about_text from '../images/about_text.png';

function AboutTitle({scrollPos}) {
  const [aboutPos, setAboutPos] = useState(-100);
  const [rozePos, setRozePos] = useState(100);
  const [btnShow, setbtnShow]=useState(false);

  useEffect(() => {
    const newAboutPos = -100 + 0.2 * scrollPos;
    const newRozePos = 100 - 0.2 * scrollPos;

    if (newAboutPos >= 0) {
      setAboutPos(0);
    } else {
      setAboutPos(newAboutPos);
    }
    if (newRozePos <= 0) {
      setRozePos(0);
      setbtnShow(true);
    } else {
      setRozePos(newRozePos);
      setbtnShow(false);
    }
  }, [scrollPos]);

  return(
    <div className={`${styles.active} ${isMobile&&styles.mobileActive}`}>
      <ul>
        <li style={{marginLeft:`${aboutPos}%`}}><img src={about_text} /></li>
        <li style={{marginLeft:`${rozePos}%`}}><a href=""><img src={about_btn} className={btnShow?styles.btnShow:styles.btnHide}/></a><span><img src={roze_text} /></span></li>
      </ul>
    </div>
  );
}

export default AboutTitle;
