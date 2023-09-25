import React from "react";
import {isMobile} from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./stageBox.module.css"
import monster_back from "../images/monster_back.jpg";
import monster_1 from "../images/monster_1.png";
import monster_2 from "../images/monster_2.png";
import monster_3 from "../images/monster_3.png";
import monster_4 from "../images/monster_4.png";
import lr_bg from "../images/lr_bg.jpg";
import lr_1 from "../images/lr_1.png";
import lr_2 from "../images/lr_2.png";
import lr_3 from "../images/lr_3.png";
import lr_4 from "../images/lr_4.png";
import pirates_bg from "../images/pirates_bg.jpg";
import pirates_1 from "../images/pirates_1.png";
import pirates_2 from "../images/pirates_2.png";
import pirates_3 from "../images/pirates_3.png";
import pirates_4 from "../images/pirates_4.png";
import "./StageBox.css";

function StageBox(){
    return(
        <div className={styles.stageBox}>
            {isMobile?
            <Swiper
            spaceBetween={0}
            slidesPerView={1}
            speed={1500}
            pagination={{
              clickable: true,
            }}
            className="SsSwiper"
           >
            <SwiperSlide className="mobox_wrapper momonster_box">
                 <img src={monster_back} />
                 <img className="momonster_1" src={monster_1} />
                 <h1>MONSTER HUNTER</h1>
                 <img className="momonster_2" src={monster_2} />
                 <img className="momonster_3" src={monster_3} />
                 <img className="momonster_4" src={monster_4} />
                 <a href="">view more+</a>
              </SwiperSlide>
              <SwiperSlide className="mobox_wrapper mopirates_box">
                 <img src={pirates_bg} />
                 <img className="mopirates_1" src={pirates_1} />
                 <img className="mopirates_2" src={pirates_2} />
                 <img className="mopirates_3" src={pirates_3} />
                 <h1>THE PIRATES</h1>
                 <img className="mopirates_4" src={pirates_4} />
                 <a href="">view more+</a>
              </SwiperSlide>
              <SwiperSlide className="mobox_wrapper moromance_box">
                 <img src={lr_bg} />
                 <img className="molr_1" src={lr_1} />
                 <img className="molr_2" src={lr_2} />
                 <img className="molr_3" src={lr_3} />
                 <h1>THE LAST ROMANCE</h1>
                 <img className="molr_4" src={lr_4} />
                 <a href="">view more+</a>
              </SwiperSlide>
            </Swiper>
            :
            <>
             <div className={`${styles.box_wrapper} ${styles.monster_box}`}>
                 <img src={monster_back} />
                 <img className={styles.monster_1} src={monster_1} />
                 <h1>MONSTER HUNTER</h1>
                 <img className={styles.monster_2} src={monster_2} />
                 <img className={styles.monster_3} src={monster_3} />
                 <img className={styles.monster_4} src={monster_4} />
                 <a href="">view more+</a>
              </div>
              <div className={`${styles.box_wrapper} ${styles.pirates_box}`}>
                 <img src={pirates_bg} />
                 <img className={styles.pirates_1} src={pirates_1} />
                 <img className={styles.pirates_2} src={pirates_2} />
                 <img className={styles.pirates_3} src={pirates_3} />
                 <h1>THE PIRATES</h1>
                 <img className={styles.pirates_4} src={pirates_4} />
                 <a href="">view more+</a>
              </div>
              <div className={`${styles.box_wrapper} ${styles.romance_box}`}>
                 <img src={lr_bg} />
                 <img className={styles.lr_1} src={lr_1} />
                 <img className={styles.lr_2} src={lr_2} />
                 <img className={styles.lr_3} src={lr_3} />
                 <h1>THE LAST ROMANCE</h1>
                 <img className={styles.lr_4} src={lr_4} />
                 <a href="">view more+</a>
              </div>
              </>
             }
        </div>
    );
}

export default StageBox;