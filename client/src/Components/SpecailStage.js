import React, { useRef } from "react";
import { useScroll } from "../Hooks/useScroll";
import {isMobile} from 'react-device-detect';
import styles from "./SpecailStage.module.css";
import special_2 from "../images/special_2.png";
import special_3 from "../images/special_3.png";
import special_5 from "../images/special_5.png";
import gogi_2 from "../images/gogi_2.png";
import gogi_3 from "../images/gogi_3.png";
import ry from "../images/ry.png";
import special_4 from "../images/special_4.png";
import special_6 from "../images/special_6.png";
import gogi_1 from "../images/gogi_1.png";
/* 모바일 이미지 */
import mospecial_2 from "../images/mospecial_2.png";
import mospecial_3 from "../images/mospecial_3.png";
import mospecial_5 from "../images/mospecial_5.png";
import mogogi_2 from "../images/mogogi_2.png";
import mogogi_3 from "../images/mogogi_3.png";
import mory from "../images/mory.png";
import mospecial_4 from "../images/mospecial_4.png";
import mospecial_6 from "../images/mospecial_6.png";
import mogogi_1 from "../images/mogogi_1.png";


function SpecailStage({ name, hover}) {
  const ref = useRef(null);
  const { isShow } = useScroll(ref);
  
  return (
  <div ref={ref} className={`${name} 
  ${isShow ? styles.stageShow : styles.stageHide}
  ${hover ? styles.stageHover : styles.stageBack}
  ${isMobile&&styles.mobilestageShow}
  `}
  >
   {isMobile?
   <>
    <img className={styles.lay_img_2} src={mospecial_2} />
    <img className={styles.lay_img_3} src={mospecial_3} />
    <img className={styles.lay_img_4} src={mospecial_5} />
    <img className={styles.lay_img_5} src={mogogi_2} />
    <img className={styles.lay_img_6} src={mogogi_3} />
    <img className={styles.lay_img_7} src={mory} />
    <img className={styles.lay_img_8} src={mospecial_4} />
    <img className={styles.lay_img_9} src={mospecial_6} />
    <img className={styles.lay_img_10} src={mogogi_1} />
   </>:
   <>
    <img className={styles.lay_img_2} src={special_2} />
    <img className={styles.lay_img_3} src={special_3} />
    <img className={styles.lay_img_4} src={special_5} />
    <img className={styles.lay_img_5} src={gogi_2} />
    <img className={styles.lay_img_6} src={gogi_3} />
    <img className={styles.lay_img_7} src={ry} />
    <img className={styles.lay_img_8} src={special_4} />
    <img className={styles.lay_img_9} src={special_6} />
    <img className={styles.lay_img_10} src={gogi_1} />
    </>
   }
  </div>
  );
}

export default SpecailStage;
