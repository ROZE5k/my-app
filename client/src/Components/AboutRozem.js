import React, { useState } from "react";
import {Link} from 'react-router-dom';
import styles from "./AboutRozem.module.css";

function AboutRozem() {
  const [dragDistance, setDragDistance] = useState(0);
  const [startY, setStartY] = useState(null);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (startY !== null) {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // 드래그 방향에 따라 translateY를 조절
      setDragDistance((prevDistance) => prevDistance + deltaY);
      setStartY(currentY);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };
  
  const backgroundImageUrl = "url(../about/road_bg.jpg)";
  const backgroundCarUrl = "url(../about/road_car.png)";
  const backgroundStreeUrl = "url(../about/road_smalltree.png)";
  const backgroundBirdUrl = "url(../about/road_bird.png)";
  const backgroundBtreeUrl = "url(../about/road_bigtree.png)";
  const backgroundFtreeUrl = "url(../about/road_flytree.png)";

  return (
    <div
      className={styles.AboutRozem}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      >
      <div className={styles.roadBox}
      style={{
        backgroundImage: backgroundImageUrl, // 배경 이미지로 대체
        backgroundSize: "cover", // 배경 이미지 크기 조절
        backgroundRepeat:"repeat-y",
        backgroundPosition: `0px ${-dragDistance*1.5}px`, // 배경 이미지의 top을 dragDistance에 연결
        transition: "background-position 0.5s ease", // 부드러운 이동을 위한 트랜지션 추가
      }}
    >
    </div>
    <div className={styles.roadBox}
      style={{
        backgroundImage: backgroundCarUrl, // 배경 이미지로 대체
        backgroundSize: "cover", // 배경 이미지 크기 조절
        backgroundRepeat:"no-repeat",
      }}
    >
    </div>
    <div className={styles.roadBox}
      style={{
        backgroundImage: backgroundStreeUrl, // 배경 이미지로 대체
        backgroundSize: "cover", // 배경 이미지 크기 조절
        backgroundRepeat:"repeat-y",
        backgroundPosition: `0px ${-dragDistance*1.6}px`, // 배경 이미지의 top을 dragDistance에 연결
        transition: "background-position 0.5s ease", // 부드러운 이동을 위한 트랜지션 추가
      }}
    >
    </div>
    <div className={styles.roadBox}
      style={{
        backgroundImage: backgroundBirdUrl, // 배경 이미지로 대체
        backgroundSize: "cover", // 배경 이미지 크기 조절
        backgroundRepeat:"repeat",
        backgroundPosition: `${dragDistance*0.5}px ${-dragDistance*1.65}px`, // 배경 이미지의 top을 dragDistance에 연결
        transition: "background-position 0.5s ease", // 부드러운 이동을 위한 트랜지션 추가
      }}
    >
    </div>
    <div className={styles.roadBox}
      style={{
        backgroundImage: backgroundBtreeUrl, // 배경 이미지로 대체
        backgroundSize: "cover", // 배경 이미지 크기 조절
        backgroundRepeat:"repeat-y",
        backgroundPosition: `0px ${-dragDistance*1.7}px`, // 배경 이미지의 top을 dragDistance에 연결
        transition: "background-position 0.5s ease", // 부드러운 이동을 위한 트랜지션 추가
      }}
    >
    </div>
    <div className={styles.roadBox}
      style={{
        backgroundImage: backgroundFtreeUrl, // 배경 이미지로 대체
        backgroundSize: "cover", // 배경 이미지 크기 조절
        backgroundRepeat:"repeat-y",
        backgroundPosition: `0px ${-dragDistance*2}px`, // 배경 이미지의 top을 dragDistance에 연결
        transition: "background-position 0.5s ease", // 부드러운 이동을 위한 트랜지션 추가
      }}
    >
    </div>
    <div className={styles.littletravel}>
      <h1>작은 여행을 떠나요</h1>
      <h2>가끔은<br/>목적지가<br/>없어도<br/>괜찮아</h2>
      <div className={styles.scrollIcon}>
        <img src="../about/scrollicon.png" className={styles.scrollImg} />
      </div>
    </div>
    <div className={styles.travelContent}>
    <p className={styles.sectionInfo}>무언가를 하고 싶을 때, 또 무언가를 표현하고 싶을 때, 순간순간 스쳐지나가는 생각들을 바쁘고 바쁜 일상에서 정리하기에는 너무 버거운 일이 되었다.<br/><br/>
      정서, 색갈, 스토리, 기억... 조각들을 이 작은 공간에 모아 넣기 시작했다...<br/><br/>
      마치 목적없이 가는 작은 여행들로 쌓여진 추억들 처럼, 시간이 지나고 보니 이 공간이 바로 "ROZE" 그 자체가 아닌가 싶다.<br/><br/>
      그리고 이 공간이 누군가에게는 작은 힐링을 줄 수 있는 공간이었으면 하는 바람이다.</p>
      <div className={styles.Contentmap}>
        <h1><span><img src="/about/location.png" /></span>Art Work</h1>
        <p className={styles.subInfo}>
          인물, 풍경을 포함한 다양한 아트웍 - 한계가 없는 디지털 드로잉의 세계
        </p>
        <img src="/about/digital_drawing_info.png" />
        <Link to="/ArtworkBoard/">View more+</Link>
      </div>
      <div className={styles.Contentmap}>
        <h1><span><img src="/about/location.png" /></span>Visual Design</h1>
          <p className={styles.subInfo}>
            웹디자인, 그래픽 디자인 등 비쥬얼 디자인 작업물과 디자인 스토리
          </p>
          <img src="/about/concept_art_info.png" />
          <Link to="/VisualdesignBoard/">View more+</Link>
      </div>
      <div className={styles.Contentmap}>
        <h1><span><img src="/about/location.png" /></span>PhotoGraphy</h1>
          <p className={styles.subInfo}>
            풍경, 길거리, 스냅 촬영으로 일상의 순간을 기록한 사진들
          </p>
          <img src="/about/media_info.png" />
          <Link to="/PhotoGraphy/">View more+</Link>
      </div>
    </div>
    </div>
  );
}

export default AboutRozem;
