import React, { useState, useEffect } from 'react';

export const useScroll = (el) => { 
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const target = typeof el === 'string' ? document.querySelector(`.${el}`) : el.current;
    if (!target) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsShow(true);
        } else {
          setIsShow(false); // add this line
        }
      });
    });
    observer.observe(target);
    return () => observer.disconnect();
  },[el]);

  return { isShow };
};

