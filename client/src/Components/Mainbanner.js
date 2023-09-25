import React from "react";
import { useState, useRef, useEffect } from 'react';
import {isMobile} from 'react-device-detect';
import styles from "./Mainbanner.module.css";
import { useScroll } from "../Hooks/useScroll";
import wind_logo from '../images/wind_logo.png';
import main_4 from '../images/main_4.png';
import main_3 from '../images/main_3.png';
import main_back from '../images/main_back.png';
import main_5 from '../images/main_5.png';
import main_6 from '../images/main_6.png';
import y_1 from '../images/y_1.png';
import y_2 from '../images/y_2.png';
import y_3 from '../images/y_3.png';
import b_fog from '../images/b_fog.png'
import mo_mainbanner_01 from '../images/mo_mainbanner_01.jpg';
import mo_mainbanner_02 from '../images/mo_mainbanner_02.png';
import mo_mainbanner_03 from '../images/mo_mainbanner_03.png';
import mo_mainbanner_04 from '../images/mo_mainbanner_04.png';
import mo_mainbanner_05 from '../images/mo_mainbanner_05.png';
import mo_mainbanner_06 from '../images/mo_mainbanner_06.png';
import mo_mainbanner_07 from '../images/mo_mainbanner_07.png';
import mo_mainbanner_08 from '../images/mo_mainbanner_08.png';
import mo_banner_light_01 from '../images/mo_banner_light_01.png';
import mo_banner_light_02 from '../images/mo_banner_light_02.png';
import mo_banner_light_03 from '../images/mo_banner_light_03.png';



function Mainbanner(){
    const [xy, setXY] = useState({x : 0, y : 0})

    const xyHandler = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setXY({x : mouseX, y: mouseY});
    
  }
  const ref = useRef(null);
  const { isShow } = useScroll(ref);

  const [scrollPosition, setScrollPosition] = useState(0);

  const mobannerScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', mobannerScroll);
    return () => {
      window.removeEventListener('scroll', mobannerScroll);
    };
  }, []);

    return(
        
        <>
        {isMobile?
        <div className={styles.mobileMainbanner} ref={ref}>
            {isShow && (<img className={styles.mo_mainbanner_01} src={mo_mainbanner_01}
            style={{ transform: `translate(0, ${scrollPosition * 0.15}px)` }}  
            />)}
            <img className={styles.mo_mainbanner_02} src={mo_mainbanner_02} />
            <img className={styles.mo_banner_light_01} src={mo_banner_light_01} />
            {isShow && (<img className={styles.mo_mainbanner_03} src={mo_mainbanner_03}
            style={{ transform: `translate(0, ${scrollPosition * -0.015}px)` }}  
            />)}
            <img className={styles.y_1} src={y_1} />
            <img className={styles.y_2} src={y_2} />
            <img className={styles.y_3} src={y_3} />
            <img className={styles.mo_banner_light_02} src={mo_banner_light_02} />
            {isShow && (<img className={styles.mo_mainbanner_04} src={mo_mainbanner_04}
            style={{ transform: `translate(${scrollPosition * 0.05}px, ${scrollPosition * 0.04}px)` }}  
            />)}
            {isShow && (<img className={styles.mo_mainbanner_05} src={mo_mainbanner_05}
            style={{ transform: `translate(${scrollPosition * -0.1}px, ${scrollPosition * 0.05}px)` }} 
            />)}
            {isShow && (<img className={styles.mo_mainbanner_06} src={mo_mainbanner_06} 
            style={{ transform: `translate(${scrollPosition * 0.02}px, ${scrollPosition * -0.05}px)` }}
            />)}
            {isShow && (<img className={styles.mo_mainbanner_07} src={mo_mainbanner_07}
            style={{ transform: `translate(${scrollPosition * 0.05}px, ${scrollPosition * -0.1}px)` }} 
            />)}
            {isShow && (<img className={styles.mo_mainbanner_08} src={mo_mainbanner_08}
            style={{ transform: `translate(${scrollPosition * -0.1}px, ${scrollPosition * -0.3}px)` }}
            />)}
            <img className={styles.mo_banner_light_03} src={mo_banner_light_03} />
        </div>
        :     
         <div className={styles.mainBanner} onMouseMove={xyHandler}>
            <img className={styles.mainBack} src={main_back} 
            style ={{transform : `translate(${-0.004*xy.x}px, ${-0.002*xy.y}px)`}}/>
            <img className={styles.main3} src={main_3} 
            style ={{transform : `translate(${0.015*xy.x}px, ${0.006*xy.y}px)`}}/>
            <img className={styles.main4} src={main_4} 
            style ={{transform : `translate(${0.03*xy.x}px, ${0.015*xy.y}px)`}}/>
            <img className={styles.windLogo} src={wind_logo} 
            style ={{transform : `translate(${0.025*xy.x}px, ${0.012*xy.y}px)`}}/>
            <img className={styles.main5} src={main_5} 
            style ={{transform : `translate(${0.02*xy.x}px, ${0.01*xy.y}px)`}}/>
            <img className={styles.main6} src={main_6} 
            style ={{transform : `translate(${0.04*xy.x}px, ${0.02*xy.y}px)`}}/>
            <div className={styles.b_fog}>
                <img className={styles.b_fog_1} src={b_fog} />
                <img className={styles.b_fog_2} src={b_fog} />
            </div>
            <img className={styles.y_1} src={y_1} />
            <img className={styles.y_2} src={y_2} />
            <img className={styles.y_3} src={y_3} />
        </div>
    }  
    </>
    );
}

export default Mainbanner;