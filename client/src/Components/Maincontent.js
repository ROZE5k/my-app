import React,{useEffect, useState} from "react";
import AboutTitle from "./AboutTitle";
import styles from './Maincontent.module.css';
import Conceptart from "./Conceptart";
import Artwork from "./Artwork";
import Visualdesign from "./Visualdesign";
import Photography from "./Photography";
import PhotoBox from "./PhotoBox";
import SpecailStage from "./SpecailStage";
import StageBox from "./StageBox";
import RozeMary from "./RozeMary";
import Footer from "./Footer";

function Maincontent({scrollPos, hover}) {
    const [topValue, setTopValue] = useState(0);
    useEffect(() => {
      setTopValue(-0.2 * scrollPos);
    }, [scrollPos]);
  
    return (
      <div className={styles.mainContents} style={{marginTop: topValue}}>
        <AboutTitle scrollPos={scrollPos}/>
        <Conceptart />
        <Artwork name="Artwork" hover={hover}/>
        <Visualdesign />
        <Photography hover={hover} />
        <PhotoBox />
        <SpecailStage name="Specailstage" hover={hover} />
        <StageBox />
        <RozeMary hover={hover}/>
        <Footer />
      </div>
    );
  }
  
export default Maincontent;