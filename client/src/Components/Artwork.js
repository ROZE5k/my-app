import React, { useRef } from "react";
import { useScroll } from "../Hooks/useScroll";
import {isMobile} from 'react-device-detect';
import styles from "./artWork.module.css";

function Artwork({ name, hover }) {
  const ref = useRef(null);
  const { isShow } = useScroll(ref);
  
  return (
  <div ref={ref} className={`${name} ${isShow ? styles.artShow : styles.artHide} ${hover ? styles.artHover : styles.artBack} ${isMobile&&styles.mobileArt}` }>
    <div className={styles.artRight}>
      <p>About</p>
      <h1>ART WORK</h1>
      <div className={styles.artLine}></div>
      <h2>다양한 컨셉의 드로잉으로 펼쳐지는 아트의 세계</h2>
      <p className={styles.artText}>- 디지털 드로잉 / 컨셉아트 / 일러스트 등 아트웍 작품들을 직접 확인해보세요.</p>
      {isMobile?
      <div className={styles.arrowTop}></div>:null
      }
    </div>
  </div>
  );
}

export default Artwork;
