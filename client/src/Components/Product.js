import React from 'react';
import styles from './Product.module.css';
import {isMobile} from 'react-device-detect';
import rozemary_logo from '../images/rozemary_logo.png';
import rozemary_inslogo from '../images/rozemary_inslogo.png';
import prd_1 from '../images/prd_1.jpg';
import prd_2 from '../images/prd_2.jpg';
import prd_3 from '../images/prd_3.jpg';
import prd_4 from '../images/prd_4.jpg';

function Product({hover}){
    return(
        <div className={`${styles.productViewbox} ${isMobile&&styles.mobileproductViewbox}`}>
            <div className={styles.videobanner}>
                <video width="100%" height="auto" autoPlay loop controls muted>
                       <source src="/rozemary/rozemary_videobanner.mp4" type="video/mp4" />
                </video>
                <div className={styles.rozemary_videologo}>
                     <img src={rozemary_logo} />
                     <h1>Workshop<span>| Healing Life Style</span></h1>
                </div>
            </div>
            <h1 className={styles.productSubject}>로즈마리 수제 마크라메<br/><span>A Workshop Creating New Ideas and Sensibilities for Your Lifestyle</span></h1>
            <div className={styles.macrameInfo}>
                <h2>마크라메(macrame)란?</h2>
                <p>마크라메는 기원전 13세기부터 중세 유럽과 아라비아 등 세계 여러 지역에서 전해져온 고대의 공예 기술로,<br/>
                여러 가닥의 실을 이용하여 아름다운 채움매듭을 짓습니다.<br/><br/>
                이 고유한 기술을 활용하여 다양한 패턴과 섬세한 디자인의 작품을 창조할 수 있으며,<br/>
                이러한 작품들은 대부분 집안의 장식이나 독특한 악세사리로 사용됩니다.<br/><br/>
                최근에는 마크라메가 다시 인기를 얻으며, 수공예를 즐기고 자연 소재에 관심이 있는 사람들 사이에서 특히 선호되고 있습니다.<br/>
                이를 통해 고풍스러운 분위기와 자연의 아름다움을 인테리어에 녹여내는 것이 주목받고 있습니다.
                </p>
                <a href="https://roze.kr" target='_blank' className={`${styles.rozemary_inslogo} ${hover && styles.rozemary_inslogohover} `}><img src={rozemary_inslogo} /></a>
                <p>로즈마리는 100% 수작업으로 제작한 마크라메 제품들을 고객에게 제공합니다.<br/>
                가장 익숙한 행잉 제품으로부터 새로운 아이디어 제품들까지 디자인 및 제작 중에 있습니다.<br/><br/>
                자연스럽고, 아름답고 또한 활용적인 마크라메 제품들을<br/>
                <font color="#69a748">ROZEMARY Mall</font>에서 만나보실 수 있습니다.
                </p>
            </div>
            <div className={styles.hotproducts}>
                <ul>
                    <li><img src={prd_1} /></li>
                    <li><img src={prd_2} /></li>
                    <li><img src={prd_3} /></li>
                    <li><img src={prd_4} /></li>
                </ul>
            </div>
        </div>
    );
};

export default Product;