import React, {useState} from "react";
import Styles from './Navibar.module.css';
import Rpng from '../images/r.png'
import Opng from '../images/o.png'
import Zpng from '../images/z.png'
import Epng from '../images/e.png'
import over_home from '../images/over_home.png';
import over_search from '../images/over_search.png';
import over_sub_cate from '../images/over_sub_cate.png';
import over_cate_line from '../images/over_cate_line.png'
import over_about from '../images/over_about.png';
import top_profile_icon from '../images/top_profile_icon.png';
import top_profile_click from '../images/top_profile_click.png';
import chat from '../images/chat.png';
import sendmail from '../images/sendmail.png';
import  {Link} from 'react-router-dom';
import { isMobile } from 'react-device-detect';


function Navibar({onEnter, onLeave, hover}){
  const [openedMenu, setOpenedmenu]=useState(false);

  const openMenu=()=>{
      setOpenedmenu(!openedMenu);
  }
  const resetMenu=()=>{
      setOpenedmenu(false);
  }
    return(
      <>
      {isMobile?(
        <div className={Styles.mobileNavibar}>
          <ul className={Styles.mobileLogo}>
                <li><img src={Rpng}/></li>
                <li><img src={Opng}/></li>
                <li><img src={Zpng}/></li>
                <li><img src={Epng}/></li>
          </ul>
          <ul className={Styles.mobileMenu}>
            <li><Link to="/Main/" onClick={resetMenu}>Home</Link></li>
            <li><Link to="/Login/" onClick={resetMenu}>Login</Link></li>
            <li>
              {isMobile?
                <Link to="/AboutRozem/" onClick={resetMenu}>About</Link>
                :
                <Link to="/AboutRoze/" onClick={resetMenu}>About</Link>
              }
            </li>
            <li><Link to="/Profile/" onClick={resetMenu}>Profile</Link></li>
            <li>
            <div className={`${Styles.mobileCategory} ${openedMenu&&Styles.mobileCategoryOpened}`} onClick={openMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
            </li>
          </ul>
          <div className={Styles.mobilechatMail}>
              <Link to={`/UserBoard/`}><img src={chat} /></Link>
              <a href="mailto:roze_roze@naver.com"><img src={sendmail} /></a>
          </div>
          <div className={`${Styles.openedCate} ${openedMenu&&Styles.openedCatetrue}`}>
            <h1>CateGory</h1>
          <ul>
            <li><Link to="/ArtworkBoard/" onClick={openMenu}>Art Work</Link>
              <ul>
                <li><Link to="/DigitalPainting/" onClick={openMenu}>Digital Painting</Link></li>
                <li><Link to="/ConceptArtBoard/" onClick={openMenu}>Concept Art</Link></li>
                <li><a href="" onClick={openMenu}>Drawing</a></li>
                <li><Link to="/Illustration/" onClick={openMenu}>Illustration</Link></li>
                <li><a href="" onClick={openMenu}>Special Stage</a></li>
              </ul>
            </li>
            <li><Link to="/VisualdesignBoard/" onClick={openMenu}>Visual Design</Link>
              <ul>
                <li><Link to="/WebDesignboard/" onClick={openMenu}>Web Design</Link></li>
                <li><Link to="/GraphicDesign/" onClick={openMenu}>Graphic Design</Link></li>
                <li><a href="" onClick={openMenu}>Package Design</a></li>
                <li><Link to="/ProductDetail/" onClick={openMenu}>Product Detail</Link></li>
                <li><Link to="/Motiongraphic/" onClick={openMenu}>Motion Graphic</Link></li>
              </ul>
            </li>
            <li><Link to={`/PhotoGraphy/`} onClick={openMenu}>PhotoGraphy</Link>
              <ul>
                <li><Link to={`/Landscape/`} onClick={openMenu}>Landscape Photography</Link></li>
                <li><Link to={`/Snapshot/`} onClick={openMenu}>Snapshot</Link></li>
                <li><Link to={`/Productshot/`} onClick={openMenu}>Product Photography</Link></li>
                <li><a href="" onClick={openMenu}>Special Photography</a></li>
                <li><a href="" onClick={openMenu}>Behind Story</a></li>
              </ul>
            </li>
            <li><Link to="/Product/" onClick={openMenu}>Product</Link>
            </li>
            <li><a href="" onClick={openMenu}>Community</a>
            </li>
          </ul>
          </div>
        </div>
      ):(
        <div className={hover?Styles.NavibarActive:Styles.Navibar} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <ul className={hover?Styles.Logoactive:Styles.Logo}>
                <li><img src={Rpng}/></li>
                <li><img src={Opng}/></li>
                <li><img src={Zpng}/></li>
                <li><img src={Epng}/></li>
            </ul>
            <Link className={hover?Styles.iconFadein:Styles.iconFadeout} to={`/Profile/`}>
                <img src={top_profile_icon} />
            </Link>
            <div className={hover?Styles.lineOn:Styles.lineOff}></div>
            <Link  className={hover?Styles.iconRoll:Styles.iconOut} to={`/Profile/`}>
              <div>
                <img src={top_profile_click} />
              </div>
            </Link>
            <ul className={Styles.cateGory}>
              <li>
                <img src={over_home} className={hover?Styles.setMargin:Styles.unsetMargin}/>
                <div className={hover?Styles.cateOpen:Styles.cateClose}>
                  <Link to={`/Main/`}><p>HOME</p></Link>
                </div>
              </li>
              <li>
              <img src={over_search} className={hover?Styles.setMargin:Styles.unsetMargin}/>
                <div className={hover?Styles.cateOpen:Styles.cateClose}>
                  <p><Link to={`/Login/`}>LOGIN | JOIN</Link></p>
                </div>
              </li>
              <li>
              <img src={over_about} className={hover?Styles.setMargin:Styles.unsetMargin}/>
                <div className={hover?Styles.cateOpen:Styles.cateClose}>
                  <p><Link to="/AboutRoze/">ABOUT ROZE</Link></p>
                </div>
              </li>
              <li>
              <img src={over_cate_line} className={hover?Styles.setMargin:Styles.unsetMargin}/>
                <div className={hover?Styles.cateOpen:Styles.cateClose}>
                </div>
              </li>
              <li>
              <img src={over_sub_cate} className={hover?Styles.setMargin:Styles.unsetMargin}/>
                <div className={hover?Styles.cateOpen:Styles.cateClose}>
                  <ul>
                    <li>CATEGORY
                      <ul>
                        <li><Link to="/ArtworkBoard/">Art Work</Link>
                          <ul>
                            <li><Link to="/DigitalPainting/">Digital Painting</Link></li>
                            <li><Link to="/ConceptArtBoard/">Concept Art</Link></li>
                            <li><a href="">Drawing</a></li>
                            <li><Link to="/Illustration/">Illustration</Link></li>
                            <li><a href="">Special Stage</a></li>
                          </ul>
                        </li>
                        <li><Link to="/VisualdesignBoard/">Visual Design</Link>
                          <ul>
                            <li><Link to="/WebDesignboard/">Web Design</Link></li>
                            <li><Link to="/GraphicDesign/">Graphic Design</Link></li>
                            <li><a href="">Package Design</a></li>
                            <li><Link to="/ProductDetail/">Product Detail</Link></li>
                            <li><Link to="/Motiongraphic/">Motion Graphic</Link></li>
                          </ul>
                        </li>
                        <li><Link to={`/PhotoGraphy/`}>PhotoGraphy</Link>
                          <ul>
                            <li><Link to={`/Landscape/`}>Landscape Photography</Link></li>
                            <li><Link to={`/Snapshot/`}>Snapshot</Link></li>
                            <li><Link to={`/Productshot/`}>Product Photography</Link></li>
                            <li><a href="">Special Photography</a></li>
                            <li><a href="">Behind Story</a></li>
                          </ul>
                        </li>
                        <li><Link to="/Product/">Product</Link>
                        </li>
                        <li><a href="">Community</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className={Styles.chatMail}>
              <Link to={`/UserBoard/`}><img src={chat} /></Link>
              <a href="mailto:roze_roze@naver.com"><img src={sendmail} /></a>
            </div>
        </div>)}
        </>
    );
};

export default Navibar;