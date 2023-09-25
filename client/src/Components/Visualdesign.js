import React,{useState} from "react";
import {Link} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import styles from './visualDesign.module.css';
import webdesign from '../images/webdesign.jpg';
import graphicdesign from '../images/graphicdesign.jpg';
import packagedesign from '../images/packagedesign.jpg';
import productdetail from '../images/productdetail.jpg';
import motiongraphic from '../images/motiongraphic.gif'
import mowebdesign from '../images/mowebdesign.jpg';
import mographicdesign from '../images/mographicdesign.jpg';
import mopackagedesign from '../images/mopackagedesign.jpg';
import moproductdetail from '../images/moproductdetail.jpg';
import momotiongraphic from '../images/momotiongraphic.gif'

function Visualdesign(){
    const [visualNum, setVnum] = useState(1);

    const VisualHover = (vNum) => {
      setVnum(vNum);
      // 해당 요소에 대한 이벤트 처리
    };

    return(
        <div className={`${styles.visualDesign} ${isMobile&&styles.mobileVisualDesign}`}>
         {isMobile?
            <div className={styles.titleBox}>
                <h1>Visual Design</h1>
            </div>:
            null
            }
            <ul>
                <li onMouseEnter={() => VisualHover(1)} className={visualNum === 1 ? styles.vHover : styles.vClose}>
                   <p><Link to="">Web design</Link></p>
                   {isMobile?<img src={mowebdesign} />:
                   <img src={webdesign} />
                   }
                </li>
                <li onMouseEnter={() => VisualHover(2)} className={visualNum === 2 ? styles.vHover : styles.vClose}>
                   <p><Link to="">Product detail</Link></p>
                   {isMobile?<img src={moproductdetail} />:
                   <img src={productdetail} />
                   }
                </li>
                <li onMouseEnter={() => VisualHover(3)} className={visualNum === 3 ? styles.vHover : styles.vClose}>
                   <p><Link to="">Package design</Link></p>
                   {isMobile?<img src={mopackagedesign} />:
                   <img src={packagedesign} />
                   }
                </li>
                <li onMouseEnter={() => VisualHover(4)} className={visualNum === 4 ? styles.vHover : styles.vClose}>
                   <p><Link to="">Graphic design</Link></p>
                   {isMobile?<img src={mographicdesign} />:
                   <img src={graphicdesign} />
                   }
                </li>
                <li onMouseEnter={() => VisualHover(5)} className={visualNum === 5 ? styles.vHover : styles.vClose}>
                   <p><Link to="">Motion graphic</Link></p>
                   {isMobile?<img src={momotiongraphic} />:
                   <img src={motiongraphic} />
                   }
                </li>
                {isMobile?null:
                <li>
                   <Link to="/VisualdesignBoard/">+<br/>More</Link>
                </li>
                }
            </ul>
            {isMobile?null:
            <div className={styles.titleBox}>
                <h1>Visual Design</h1>
            </div>
            }
        </div>
    );
};

export default Visualdesign;