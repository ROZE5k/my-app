import React,{useEffect, useState} from "react";
import HTMLReactParser from 'html-react-parser';
import {isMobile} from 'react-device-detect';
import styles from './RozeMary.module.css';
import rozemary_logo from '../images/rozemary_logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper";
import './RozeMary.css';


function RozeMary(){
  const [RMbanners, setRMbanners]=useState([]);

  useEffect(() => {
    fetch('/api/rmbanners/')
      .then((response) => response.json())
      .then((data) => {
        setRMbanners(data);
      })
      .catch((error) => {
        console.error('Failed to fetch RMbanners:', error);
      });
  }, []);

    return(
        <div 
        className={`${styles.RozeMary} ${isMobile&&styles.mobileRozeMary}`}
        >
            <div className={styles.RozeMary_Logo}>
                 <a href=""><img src={rozemary_logo} /></a>
                 <p>Workshop<br/><span>Healing Life Style</span></p>
            </div>
            <div className={styles.RMinnerRolling}>
              {isMobile?
              <Swiper
              spaceBetween={0}
              slidesPerView={1}
              speed={1500}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="RmSwiper mobileRmSwiper"
             >
              {
                RMbanners.map((RMimage, index) =>
                  <SwiperSlide key={index}>
                   {HTMLReactParser(`${RMimage.rmbanner}_mo.jpg" />`)}
                   {HTMLReactParser(RMimage.rmcontent)}
                  </SwiperSlide>
                )
              }
              </Swiper>
              :
              <Swiper
                   spaceBetween={0}
                   slidesPerView={1}
                   speed={1500}
                   pagination={{
                     clickable: true,
                   }}
                   modules={[Pagination]}
                   className="RmSwiper"
                  >
                   {
                     RMbanners.map((RMimage, index) =>
                       <SwiperSlide key={index}>
                        {HTMLReactParser(`${RMimage.rmbanner}.jpg" />`)}
                        {HTMLReactParser(RMimage.rmcontent)}
                       </SwiperSlide>
                     )
                   }
              </Swiper>
              }
            </div>
        </div>
    );
};

export default RozeMary;