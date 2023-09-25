import React from "react";
import {isMobile} from 'react-device-detect';
import styles from "./photoGraphy.module.css";

function Photography({hover}) {

  
  return (
  <div className={`${hover ? styles.phoHover : styles.phoBack} ${isMobile&&styles.mobilephoBack}`}>
    <h1 className={styles.phoTitle}>PHOTOGRAPHY</h1>
    <p className={styles.phoText}>일상을 담은 스냅샷부터 제품 촬영까지</p>
  </div>
  );
}

export default Photography;
