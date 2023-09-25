import React,{useState, useEffect} from "react";
import Mainbanner from "./Mainbanner";
import Maincontent from './Maincontent';
import { throttle } from 'lodash';

const mainWrapper={
  width:'100%',
  position:'relative',
};

function Main({hover}) {
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = throttle(() => {
    setScrollPos(window.scrollY);
  }, 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  return (
    <div style={mainWrapper}>
      <Mainbanner />
      <Maincontent scrollPos={scrollPos} hover={hover} />
    </div>
  );
}

export default Main;
