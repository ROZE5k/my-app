import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import styles from "./AboutRoze.module.css";

function AboutRoze(){
    const [mouseWheel, setmouseWheel]=useState(0);
    const [contentMove, setcontentMove]=useState(0);
    const outerDivRef = useRef();
    useEffect(() => {
      const wheelHandler = (e) => {
        e.preventDefault();
        const { deltaY } = e;
        if(deltaY>0){
            setmouseWheel(prevWheel => prevWheel + 1);
            setcontentMove(prevWheel => prevWheel + 1);
            if(contentMove >= document.documentElement.scrollWidth/16.5){
              setcontentMove(document.documentElement.scrollWidth/16.5);
            }
        }else{
            setmouseWheel(prevWheel => prevWheel - 1);
            setcontentMove(prevWheel => prevWheel - 1);
            if(contentMove <= 0){
              setcontentMove(0);
            }
        }
       
      };
      const outerDivRefCurrent = outerDivRef.current;
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
      return () => {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      };
    }, [mouseWheel]);

      /*const h1Style = {
          transform: `rotate(${mouseWheel * 15}deg)`,
          backgroundImage:`url("../about/b_wheel.png")`,
          bakcgroundRepeat:`no-repeat`,
        };*/

      const images = [
        { src: "../about/cloud.png", x: mouseWheel * (-2)},
        { src: "../about/front_cloud.png", x: mouseWheel * (-5)},
        { src: "../about/light_1.png"},
        { src: "../about/light_2.png"},
        { src: "../about/island.png", x: mouseWheel * (-8)},
        { src: "../about/front_land.png", x: mouseWheel * (-12)},
        { src: "../about/midtree.png", x: mouseWheel * (-15)},
        { src: "../about/front_tree.png", x: mouseWheel * (-18)},
        { src: "../about/road.png", x: mouseWheel * (-24)},
        { src: "../about/front_road.png", x: mouseWheel * (-32)},
      ];

      const a_cont_position = {
        left: `${contentMove *(-40)}px`,
      }
    
      return (
        <div ref={outerDivRef} className={styles.AboutRoze}>
           {images.map((image, index) => (
        <div
          key={index}
          className={styles.layout}
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundPosition: `${image.x}px`,
            backgroundRepeat:`repeat-x`,
            backgroundSize:`cover`,
          }}
        />
      ))}
        {/*<div className={styles.bicycle} >
             <img src="../about/bicycle.png" className={styles.bicycleImg}></img>
             <div style={h1Style} className={styles.wheel_right}></div>
             <div style={h1Style} className={styles.wheel_left}></div>
        </div>*/}
          <div className={styles.about_content} style={a_cont_position}>
            <div className={styles.aboutInfo}>
             <div className={styles.InfoBoxs}>
              <h1>작은 여행을 떠나요</h1>
              <h1 className={styles.bigTitle}>
                가끔은<br/>
                목적지가<br/>
                없어도<br/>
                괜찮아
              </h1>
              <p className={styles.subInfo}>
                무언가를 하고 싶을 때, 또 무언가를 표현하고 싶을 때, 순간순간 스쳐지나가는 생각들을 바쁘고 바쁜 일상에서
                정리하기에는 너무 버거운 일이 되었다.<br/><br/>정서, 색갈, 스토리, 기억... 조각들을 이 작은 공간에 모아 넣기 시작했다...
                <br/><br/>마치 목적없이 가는 작은 여행들로 쌓여진 추억들 처럼, 시간이 지나고 보니 이 공간이 바로 <span>"ROZE"</span> 그 자체가 아닌가 싶다.<br/><br/>
                그리고 이 공간이 누군가에게는 작은 힐링을 줄 수 있는 공간이었으면 하는 바람이다.
              </p>
              <div className={styles.scrollPlz}>스크롤 해보세요~</div>
              </div>
            </div>
            <div className={`${styles.aboutInfo} ${styles.pixelBox}`}>
            <div className={styles.InfoBoxs}>
              <h1><span><img src="/about/location.png" /></span>Art Work</h1>
              <p className={styles.subInfo}>
                인물, 풍경을 포함한 다양한 아트웍 - 한계가 없는 디지털 드로잉의 세계
              </p>
              <img src="/about/digital_drawing_info.png" />
              <Link to="/ArtworkBoard/">View more+</Link>
              <div className={styles.lineBox} />
              </div>
            </div>
            <div className={`${styles.aboutInfo} ${styles.pixelBox}`}>
            <div className={styles.InfoBoxs}>
              <h1><span><img src="/about/location.png" /></span>Visual Design</h1>
              <p className={styles.subInfo}>
                웹디자인, 그래픽 디자인 등 비쥬얼 디자인 작업물과 디자인 스토리
              </p>
              <img src="/about/concept_art_info.png" />
              <Link to="/VisualdesignBoard/">View more+</Link>
              <div className={styles.lineBox} />
              </div>
            </div>
            <div className={`${styles.aboutInfo} ${styles.pixelBox}`}>
            <div className={styles.InfoBoxs}>
              <h1><span><img src="/about/location.png" /></span>PhotoGraphy</h1>
              <p className={styles.subInfo}>
                풍경, 길거리, 스냅 촬영으로 일상의 순간을 기록한 사진들
              </p>
              <img src="/about/media_info.png" />
              <Link to="/PhotoGraphy/">View more+</Link>
              <div className={styles.lineBox} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  

export default AboutRoze;