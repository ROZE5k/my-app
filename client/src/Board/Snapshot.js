import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import HTMLReactParser from 'html-react-parser';
import { animateScroll} from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Thumbs} from "swiper";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import 'swiper/css';
import styles from './Snapshot.module.css';
import './Snapshot.css';

function Snapshot() {
  const [snapshotData, setSnapshotData] = useState({
    year:'',
    season:'',
    content:''
  });
  
  const[banners, setBanners]=useState([]);
  const [snapShow, setSnapshow]=useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [years, setYears]=useState([]);
  const [clickTab, setClicktab]=useState(null);

  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [optionShow, setOptionshow]=useState(false);
  const scrollRef = useRef(null);

  const handleButtonClick = async (selectedYear, selectedSeason) => {
    try {
      const response = await axios.get(`/api/snapshot?year=${selectedYear}&season=${selectedSeason}`);
      setSnapshotData(response.data);
      setSnapshow(true);
    } catch (message) {
      setSnapshow(false);
      alert('준비중입니다!');
    }
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('/api/snapbanner');
        const uniqueYears = [...new Set(response.data.map(banner => banner.banneryear))];
        setYears(uniqueYears);
        const sortedBanners = response.data.sort((a, b) => {
          return b.year - a.year;
        });
        const startIndex = Math.max(sortedBanners.length - 4, 0);
        const slicedBanners = sortedBanners.slice(startIndex);
        setBanners(slicedBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
  
    fetchBanners();

    const fetchData = async () => {
      try {
        const response = await fetch('/api/sanpbannerlenght');
        const data = await response.json();
        const uniqueBannerYears = [...new Set(data.banneryear)]; // 중복되지 않는 banneryear 값 추출
        const totalCount = uniqueBannerYears.length;
        setClicktab(totalCount-1);
      } catch (error) {
        console.log('Error fetching banner count:', error);
      }
    };

    fetchData();


    fetch('/api/getSessionData', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const userId = data.userId;
        setUserId(userId); // userId 업데이트
        if (userId === 'zero5k') {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch session data:', error);
      });


  }, []);  

  const handleYearClick = async (yearlist, index) => {
    try {
      const response = await axios.get(`/api/snapyear?banneryear=${yearlist}`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
    setClicktab(index);
  };

  const toggleOption=()=>{
    setOptionshow(!optionShow);
   }
   

   const handleScrollTop = () => {
    animateScroll.scrollToTop({
      container: scrollRef.current,
      smooth: true
    });
  };

  const closeSnapBox=()=>{
    scrollRef.current.scrollTop = 0;
      setSnapshow(false);
  }


  return (
    <div className={`${styles.Snapshot} ${isMobile&&styles.mobileSnapshot}`}>
      <div className={styles.yearOption}>
        <ul>
        {
          years.map((yearlist, index)=>(
            <li key={index} onClick={() => handleYearClick(yearlist, index)} className={index === clickTab ? styles.active : styles.null}>
              {yearlist}
            </li>
          ))
        }
        </ul>
        <p className={styles.subJect}>A Snapshot for Love</p>
      </div>
      {isMobile?
      <>
      <Swiper
      spaceBetween={0}
      slidesPerView={1}
      speed={1500}
      mousewheel={true}
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[Mousewheel, Pagination, Thumbs]}
      className="mySwiper mobileSnapbanner"
     >
      <ul className={styles.bannerOption}>
        <li onClick={toggleOption}>...
          <ul className={optionShow?styles.optionShow:styles.null}>
            {admin?<li><Link to="/SnapbannerEditor/">Edit</Link></li>:null}
            <li>좋아요</li>
          </ul>
        </li>
      </ul>
      {
        banners.map((banner, index) =>
          <SwiperSlide key={index}>
            <img src={`/snapshot/banners/${banner.bannerthumb}_mo.jpg`} />
            <div className="bannerInfo">
               <button onClick={() => handleButtonClick(`${banner.banneryear}`, `${banner.bannerseason}`)}>{banner.bannerbutton}</button>
               <p>{banner.bannercomment}</p>
            </div>
          </SwiperSlide>
        )
      }
      </Swiper>
      <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={0}
      slidesPerView={1}
      speed={1500}
      allowTouchMove={false}
      direction={"vertical"}
      modules={[Mousewheel, Pagination, Thumbs]}
      className="mySwiper2"
     >
      {
        banners.map((banner, index) =>
          <SwiperSlide key={index}>
            <img src={`/snapshot/banners/${banner.bannerthumb}_mo.jpg`} />
          </SwiperSlide>
        )
      }
      </Swiper>
      </>
      :
      <>
      <Swiper
      spaceBetween={0}
      slidesPerView={1}
      speed={1500}
      mousewheel={true}
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[Mousewheel, Pagination, Thumbs]}
      className="mySwiper"
     >
      <ul className={styles.bannerOption}>
        <li onClick={toggleOption}>...
          <ul className={optionShow?styles.optionShow:styles.null}>
            {admin?<li><Link to="/SnapbannerEditor/">Edit</Link></li>:null}
            <li>좋아요</li>
          </ul>
        </li>
      </ul>
      {
        banners.map((banner, index) =>
          <SwiperSlide key={index}>
            <img src={`/snapshot/banners/${banner.bannerthumb}.jpg`} />
            <div className="bannerInfo">
               <button onClick={() => handleButtonClick(`${banner.banneryear}`, `${banner.bannerseason}`)}>{banner.bannerbutton}</button>
               <p>{banner.bannercomment}</p>
            </div>
          </SwiperSlide>
        )
      }
      </Swiper>
      <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={0}
      slidesPerView={1}
      speed={1500}
      allowTouchMove={false}
      direction={"vertical"}
      modules={[Mousewheel, Pagination, Thumbs]}
      className="mySwiper2"
     >
      {
        banners.map((banner, index) =>
          <SwiperSlide key={index}>
            <img src={`/snapshot/banners/${banner.bannerthumb}.jpg`} />
          </SwiperSlide>
        )
      }
      </Swiper>
      </>
      }
      
      <div className={`${snapShow?styles.snapBoxshow:styles.snapBoxhide} ${isMobile&&'mobileSnapBox'}`} ref={scrollRef}>
        <div>{HTMLReactParser(snapshotData.content)}</div>
        <button onClick={closeSnapBox} className={styles.closeSnapBox}>Close</button>
        <button onClick={handleScrollTop} className={styles.goTopbtn}>Up</button>
      </div>
    </div>
  );
}

export default Snapshot;
