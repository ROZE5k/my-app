import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Thumbs} from "swiper";
import "swiper/css/thumbs";
import 'swiper/css';
import styles from "./Conceptart.module.css";
import './Conceptart.css';
import aw_b_bg from '../images/aw_b_bg.png';
import digital_paiting from '../images/digital_painting.jpg';
import concept_art from '../images/concept_art.jpg';
import drawing from '../images/drawing.jpg';
import illustration from '../images/illustration.jpg';

function Conceptart() {
  const [artNum, setArtnum] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleArtHover = (aNum) => {
    setArtnum(aNum);
    // 해당 요소에 대한 이벤트 처리
  };

  return (
    <>
    {isMobile?
    <div className={styles.mobileConceptArt}>
      <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={0}
      slidesPerView={3}
      speed={1500}
      modules={[Thumbs]}
      className={`${styles.conceptThumbs} conceptThumbs`}
     >
      <SwiperSlide>Digital Painting</SwiperSlide>
      <SwiperSlide>Concept Art</SwiperSlide>
      <SwiperSlide>Drawing</SwiperSlide>
      <SwiperSlide>Illustration</SwiperSlide>    
    </Swiper>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      speed={1500}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[Thumbs]}
      className={styles.conceptSwiper}
     >
      <SwiperSlide>
          <Link to="/DigitalPainting/">
            <img src={digital_paiting} />
            <p>View More →<br/><span>디지털 드로잉 더보기</span></p>
          </Link>
      </SwiperSlide>
      <SwiperSlide>
          <Link to="/ConceptArtBoard/">
            <img src={concept_art} />
            <p>View More →<br/><span>컨셉아트 더보기</span></p>
          </Link>
      </SwiperSlide>
      <SwiperSlide>
          <a href="">
            <img src={drawing} />
            <p>View More →<br/><span>드로잉 더보기</span></p>
          </a>
      </SwiperSlide>
      <SwiperSlide>
          <Link to="/Illustration">
            <img src={illustration} />
            <p>View More →<br/><span>일러스트 더보기</span></p>
          </Link>
      </SwiperSlide>
     </Swiper>
    </div>:
    <div className={styles.conceptArt}>
      <ul>
        <li onMouseEnter={() => handleArtHover(1)} className={artNum === 1 ? styles.artOpen : styles.artClose}>
            <img src={aw_b_bg} />
            <Link to="/DigitalPainting/">Digital Painting</Link>
        </li>
        <li onMouseEnter={() => handleArtHover(2)} className={artNum === 2 ? styles.artOpen : styles.artClose}>
            <img src={aw_b_bg} />
            <Link to="/ConceptArtBoard/">Concept Art</Link>
        </li>
        <li onMouseEnter={() => handleArtHover(3)} className={artNum === 3 ? styles.artOpen : styles.artClose}>
            <img src={aw_b_bg} />
            <a href="">Drawing</a>
        </li>
        <li onMouseEnter={() => handleArtHover(4)} className={artNum === 4 ? styles.artOpen : styles.artClose}>
            <img src={aw_b_bg} />
            <Link to="/Illustration">Illustration</Link>
        </li>
      </ul>
    </div>
    }
    </>
  );
}

export default Conceptart;
