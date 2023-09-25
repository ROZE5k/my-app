import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import styles from './VisualdesignBoard.module.css';
import './VisualdesignBoard.css';
import vdlogo from '../images/vdlogo.png';
import wdicon from '../images/wdicon.png';
import gdicon from '../images/gdicon.png';
import pdicon from '../images/pdicon.png';
import pddicon from '../images/pddicon.png';
import mgdicon from '../images/mgdicon.png';
import dwyd from '../images/dwyd.png';

function VisualdesignBoard(){
    
    const [VDcount, setVDcount]=useState(0);
    const [GDcount, setGDcount]=useState(0);
    const [PDcount, setPDcount]=useState(0);
    const [PDdcount, setPDdcount]=useState(0);
    const [MGcount, setMGcount]=useState(0);

    useEffect(() => {
        
        fetch('/api/postslength', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {

              const VDcountObj = data.find((item) => item.board === 6);
              const VDcount = VDcountObj ? VDcountObj.count : 0;
              setVDcount(VDcount);

              const GDcountObj = data.find((item) => item.board === 7);
              const GDcount = GDcountObj ? GDcountObj.count : 0;
              setGDcount(GDcount);

              const PDcountObj = data.find((item) => item.board === 8);
              const PDcount = PDcountObj ? PDcountObj.count : 0;
              setPDcount(PDcount);

              const PDdcountObj = data.find((item) => item.board === 9);
              const PDdcount = PDdcountObj ? PDdcountObj.count : 0;
              setPDdcount(PDdcount);

              const MGcountObj = data.find((item) => item.board === 10);
              const MGcount = MGcountObj ? MGcountObj.count : 0;
              setMGcount(MGcount);
    
          })
          .catch((error) => {
            console.error('Failed to fetch session data:', error);
          });
    
    
      }, []);

      
    return(
        <div className={`${styles.vdboardViewBox} ${isMobile&&styles.mobilevdboardViewBox}`}>
            <img className={styles.vdlogo} src={vdlogo} />
            <div className={styles.boardsubject}>
                <p>-services</p>
                <h2>Portfolio</h2>
            </div>
            <ul className={styles.vdcontents}>
                <li>
                    <div className={styles.vdicons}><img src={wdicon} /></div>
                    <h2>Web Design</h2>
                    <p>웹디자인, 웹 UI/UX, 웹 프론트-엔드/웹 백-엔드 개발, App UI/UX</p>
                    <p className={styles.vdcount}><font color="#69a745">{VDcount}</font> Objects</p>
                    <Link to="/WebDesignboard/">+</Link>
                </li>
                <li>
                    <div className={styles.vdicons}><img src={gdicon} /></div>
                    <h2>Graphic Design</h2>
                    <p>웹배너, 포스터, 브로슈어/카탈로그 등을 포함한 그래픽 디자인, 인쇄물 디자인</p>
                    <p className={styles.vdcount}><font color="#69a745">{GDcount}</font> Objects</p>
                    <Link to="/GraphicDesign/">+</Link>
                </li>
                <li>
                    <div className={styles.vdicons}><img src={pdicon} /></div>
                    <h2>Package Design</h2>
                    <p>상품 포장 패키지 디자인</p>
                    <p className={styles.vdcount}><font color="#69a745">{PDcount}</font> Objects</p>
                    <a href="">+</a>
                </li>
                <li>
                    <div className={styles.vdicons}><img src={pddicon} /></div>
                    <h2>Product Detail</h2>
                    <p>상품 랜딩페이지, 상세페이지 디자인</p>
                    <p className={styles.vdcount}><font color="#69a745">{PDdcount}</font> Objects</p>
                    <Link to="/ProductDetail/">+</Link>
                </li>
                <li>
                    <div className={styles.vdicons}><img src={mgdicon} /></div>
                    <h2>Motion Graphic</h2>
                    <p>2D 애니메이션, 광고/홍보 영상 제작</p>
                    <p className={styles.vdcount}><font color="#69a745">{MGcount}</font> Objects</p>
                    <Link to="/MotionGraphic/">+</Link>
                </li>
                <li>
                    <img src={dwyd} />
                </li>
            </ul>
        </div>
    );
};

export default VisualdesignBoard;