import React from "react";
import {isMobile} from 'react-device-detect';
import styles from './ArtworkBoard.module.css';
import digital_bg from '../images/digital_bg.jpg';
import concept_bg from '../images/concept_bg.jpg';
import drawing_bg from '../images/drawing_bg.jpg';
import illu_bg from '../images/illu_bg.jpg';
import special_s_bg from '../images/special_s_bg.jpg';
import  {Link} from 'react-router-dom';


function ArtworkBoard({hover}){
    return(
        <div className={`${styles.Artwork} ${hover && styles.active} ${isMobile&&styles.mobileArtwork}`}>
		   <div className={styles.digital_painting}>
			<img className={styles.bg_img} src={digital_bg}/>
			<div className={styles.p_icon}>
			 <h2>Digital Painting</h2>
			 <p>디지털 드로잉</p>
		    </div>
			<ul className={styles.box_line}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<Link to="/DigitalPainting/"></Link>
		</div>
		<div className={styles.concept_art}>
			<img className={styles.bg_img} src={concept_bg}/>
            <div className={styles.p_icon}>
			 <h2>Concept Art</h2>
			 <p>컨셉아트</p>
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
			</ul>:
			<ul className={styles.box_line}>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
		    </ul>
			}
			<Link to="/ConceptArtBoard/"></Link>
		</div>
		<div className={styles.Artwork_title}><h1>Art Work<span>|</span>ROZE</h1></div>
		<div className={styles.drawing}>
            <img className={styles.bg_img} src={drawing_bg}/>
            <div className={styles.p_icon}>
			 <h2>Drawing</h2>
			 <p>드로잉</p>
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
			<Link to={``}></Link>
        </div>
		<div className={styles.illustration}>
            <img className={styles.bg_img} src={illu_bg}/>
			<div className={styles.p_icon}>
			 <h2>Illustration</h2>
			 <p>일러스트</p>
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
			<Link to="/Illustration/"></Link>
        </div>
        <div className={styles.special_stage}>
            <img className={styles.bg_img} src={special_s_bg}/>
			<div className={styles.p_icon}>
			 <h2>Special Stage</h2>
			 <p>스페셜 스테이지</p>
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
			</ul>
            }
			<a href=""></a>
        </div>
	</div>
    );
};

export default ArtworkBoard;

