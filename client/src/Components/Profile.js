import React,{useState} from "react";
import DountChart from "./Chart/DountChart";
import styled from "styled-components";
import { isMobile } from 'react-device-detect';
import styles from "./Profile.module.css";
import profile_thumb from '../images/profile_thumb.jpg';
import name from '../images/name.png';
import tel from '../images/tel.png';
import email from '../images/email.png';


const Dount = styled.div`
display: flex;
width: 100%;
justify-content:space-between;
padding: ${(isMobile ? '30px 30px 30px 10px' : '70px 12.67%')};
flex-wrap:wrap;
box-sizing:border-box;
position:relative;
z-index:2;
`;

function Profile() {

  const [activeTab, setActiveTab] = useState('aboutMe');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
  <div className={`${styles.Profile} ${isMobile&&styles.mobileProfile}`}>
    <div className={`${styles.profileBox} ${activeTab==='aboutMe' || !isMobile?styles.profileBox:styles.hide}`}>
      <div className={styles.chartScroll}>
        <div className={styles.aboutMe}>
          <div className={styles.profileImg}>
            <div className={styles.thumbImg}>
                <img src={profile_thumb} />
            </div>
          </div>
          <ul className={styles.subTitle}>
            <li>Creator</li>
            <li>ROZE</li>
          </ul>
          <p className={styles.aboutText}>안녕하세요.<br/>
          단순한 디자인을 뛰어넘는 진정한 크리에이터를 향해 달리고 있는 Designer ROZE 입니다.</p>
          <div className={styles.layout_box}>
						<ul className={styles.layout_contents_right}>
							<li></li>
							<li>
								<b>Personal<br/>Creed</b>
								<p>평범하지 않은 사람으로 평범한 삶을 누리자.</p>
							</li>
						</ul>
					</div>
					<div className={styles.layout_box}>
						<ul className={styles.layout_contents_left}>
							<li>
								<b>KeyWord</b>
								<p>#자유<br/>#아트<br/>#가치<br/>#진정성</p>
							</li>
							<li></li>
						</ul>
					</div>
				    <div className={styles.layout_box}>
						<ul className={styles.layout_contents_right}>
							<li>
							</li>
							<li>
								<b>Contact</b>
								<p><img src={name} className={styles.contact_icon}/>ROZE(로즈)</p>
								<p><img src={tel} className={styles.contact_icon}/>010-9532-6633</p>
								<p><img src={email} className={styles.contact_icon}/>roze_roze@naver.com</p>
							</li>
						</ul>
					</div>
        </div>
      </div>
      <div className={styles.centerBgbox}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.mainTitle}>
       <h1>ABOUT ME</h1>
      </div>
    </div>
    <div className={`${styles.profileBox} ${activeTab==='experience' || !isMobile?styles.profileBox:styles.hide}`}>
      <div className={styles.chartScroll}>
       <ul className={styles.expirence}>
        <li><div className={styles.dottBox}></div><b>2022.10 ~</b><p>(주)태리</p></li>
        <li><div className={styles.dottBox}></div><b>2021.02 ~ 2022.09</b><p>(주)명도물산</p></li>
        <li><div className={styles.dottBox}></div><b>2019.03 ~ 2021.02</b><p>제이씨현시스템(주)</p></li>
        <li><div className={styles.dottBox}></div><b>2017.09 ~ 2019.03</b><p>(주)프로젝터매니아</p></li>
        <li><div className={styles.dottBox}></div><b>2016.07 ~ 2017.06</b><p>쇼핑몰 창업</p></li>
        <li><div className={styles.dottBox}></div><b>2015.06 ~ 2016.06</b><p>(주)아이클럽</p></li>
       </ul>
      </div>
      <div className={styles.centerBgbox}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.mainTitle}>
       <h1>WORK<br/>EXPIRENCE</h1>
      </div>
    </div>
    <div className={`${styles.dountChart} ${activeTab==='skills' || !isMobile?styles.dountChart:styles.hide}`}>
      <div className={styles.chartScroll}>
      <Dount>
        <DountChart color="#2189d2" percent={0.96} size="33.33%" name="Ps" />
        <DountChart color="#eb9e32" percent={0.90} size="33.33%" name="Ai" />
        <DountChart color="#664498" percent={0.90} size="33.33%" name="Xd" />
        <DountChart color="#444798" percent={0.85} size="33.33%" name="Ae" />
        <DountChart color="#444798" percent={0.80} size="33.33%" name="Pr" />
        <DountChart color="#f27f40" percent={0.96} size="33.33%" name="HTML" />
        <DountChart color="#2189d2" percent={0.95} size="33.33%" name="CSS" />
        <DountChart color="#eccb32" percent={0.90} size="33.33%" name="JS" />
        <DountChart color="#7577b0" percent={0.70} size="33.33%" name="PHP" />
        <DountChart color="#43853d" percent={0.80} size="33.33%" name="Node.js" />
        <DountChart color="#61dafb" percent={0.90} size="33.33%" name="React" />
        <DountChart color="#3E6E93" percent={0.70} size="33.33%" name="Mysql" />
      </Dount>
        <ul className={styles.subTitle}>
            <li>Future</li>
            <li>Plans</li>
        </ul>
        <p className={styles.planText}>Programming language :: Python | Java<br/>Design tools :: Blander</p>
      </div>
      <div className={styles.leftBgbox}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.rightBgbox}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.mainTitle}>
       <h1>SKILL and<br/>ABILITY</h1>
      </div>
    </div>
    {isMobile?(
    <div className={styles.aboutTab}>
       <ul>
        <li onClick={() => handleTabClick('aboutMe')} className={`${activeTab==='aboutMe'?styles.clicked:styles.null}`}>ABOUT ME</li>
        <li onClick={() => handleTabClick('experience')} className={`${activeTab==='experience'?styles.clicked:styles.null}`}>WORK EXPERIENCE</li>
        <li onClick={() => handleTabClick('skills')} className={`${activeTab==='skills'?styles.clicked:styles.null}`}>SKILL and ABILITY</li>
      </ul>
    </div>
      ):(
        null
        )}
  </div>
  );
}

export default Profile;