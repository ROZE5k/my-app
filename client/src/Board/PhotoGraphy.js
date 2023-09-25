import React from "react";
import {isMobile} from 'react-device-detect';
import styles from './PhotoGraphy.module.css';
import land_bg from '../images/land_bg.jpg';
import story_bg from '../images/story_bg.jpg';
import product_bg from '../images/product_bg.jpg';
import lightshadow_bg from '../images/lightshadow_bg.jpg';
import behind_bg from '../images/behind_bg.jpg';
import  {Link} from 'react-router-dom';


function PhotoGraphy({hover}){
    return(
        <div className={`${styles.PhotoGraphy} ${hover && styles.active} ${isMobile&&styles.mobilePhotoGraphy}`}>
		   <div className={styles.landscape_photography}>
			<img className={styles.bg_img} src={land_bg}/>
			<div className={styles.p_icon}>
			 <h2>Landscape Photography</h2>
			 <p>풍경 사진</p>
		    </div>
			{isMobile?
			<ul className={styles.box_line}>
			     <li></li>
			     <li></li>
			     <li></li>
			     <li></li>
				 <li></li>
			     <li></li>
				 <li></li>
				 <li></li>
			     <li></li>
		    </ul>
			:
			<ul className={styles.box_line}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			}
			<Link to={`/Landscape/`}></Link>
		</div>
		<div className={styles.story_photography}>
			<img className={styles.bg_img} src={story_bg}/>
            <div className={styles.p_icon}>
			 <h2>Snapshot</h2>
			 <p>일상 & 추억</p>
		    </div>
			{isMobile?
			<ul className={styles.box_line}>
			     <li></li>
			     <li></li>
			     <li></li>
			     <li></li>
				 <li></li>
			     <li></li>
		    </ul>
			:
			<ul className={styles.box_line}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			}
			<Link to={`/Snapshot/`}></Link>
		</div>
		<div className={styles.photography_title}><h1>Photography<span>|</span>ROZE</h1></div>
		<div className={styles.product_photography}>
            <img className={styles.bg_img} src={product_bg}/>
            <div className={styles.p_icon}>
			 <h2>Product Photography</h2>
			 <p>제품 촬영</p>
		    </div>
			{isMobile?
			<ul className={styles.box_line}>
			     <li></li>
			     <li></li>
			     <li></li>
			     <li></li>
				 <li></li>
			     <li></li>
		    </ul>
			:
			<ul className={styles.box_line}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			}
			<Link to={`/Productshot/`}></Link>
        </div>
		<div className={styles.special_photography}>
            <img className={styles.bg_img} src={lightshadow_bg}/>
			<div className={styles.p_icon}>
			 <h2>Special Photograpy</h2>
			 <p>빛/색의 연출</p>
		    </div>
			{isMobile?
			<ul className={styles.box_line}>
			     <li></li>
			     <li></li>
			     <li></li>
			     <li></li>
				 <li></li>
			     <li></li>
		    </ul>
			:
			<ul className={styles.box_line}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			}
			<a href=""></a>
        </div>
        <div className={styles.behind_story}>
            <img className={styles.bg_img} src={behind_bg}/>
			<div className={styles.p_icon}>
			 <h2>Behind Story</h2>
			 <p>사진 이야기</p>
		    </div>
			{isMobile?
			<ul className={styles.box_line}>
			     <li></li>
			     <li></li>
			     <li></li>
		    </ul>
			:
			<ul className={styles.box_line}>
				<li></li>
				<li></li>
			</ul>
			}
			<a href=""></a>
        </div>
	</div>
    );
};

export default PhotoGraphy;

