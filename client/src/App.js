import React,{useState} from 'react';
import Navibar from './Components/Navibar';
import styles from './App.module.css';
import Main from './Components/Main';
import AboutRoze from './Components/AboutRoze';
import AboutRozem from './Components/AboutRozem';
import UserBoard from './Board/UserBoard';
import PhotoGraphy from './Board/PhotoGraphy';
import BoardContent from './Board/BoardContent';
import Profile from './Components/Profile';
import PostingBoard from './Admin/PostingBoard';
import Login from './Components/Login';
import Landscape from './Board/Landscape';
import Productshot from './Board/Productshot';
import SnapshotUpload from './Admin/SnapshotUpload';
import Snapshot from './Board/Snapshot';
import Management from './Admin/Management';
import PostingEditor from './Admin/PostingEditor';
import SnapbannerEditor from './Admin/SnapbannerEditor';
import ArtworkBoard from './Board/ArtworkBoard';
import DigitalPainting from './Board/DigitalPainting';
import ConceptArtBoard from './Board/ConceptArtBoard';
import RozemaryUpload from './Admin/RozemaryUpload';
import RozemaryEditor from './Admin/RozemaryEditor';
import Illustration from './Board/Illustration';
import VisualdesignBoard from './Board/VisualdesignBoard';
import WebDesignboard from './Board/WebDesignboard';
import ProductDetail from './Board/ProductDetail';
import GraphicDesign from './Board/GraphicDesign';
import Product from './Components/Product';
import Motiongraphic from './Board/Motiongraphic';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { isMobile } from 'react-device-detect';



function App(){

  const [hover,setHover]=useState(false);
  const onEnter=()=>{
      setHover(true);
  }
  const onLeave=()=>{
      setHover(false);
  }
    return(
      <Router>
        <div className={`${isMobile ? styles.mobileWrapper : styles.Wrapper}`}>
          <Navibar onEnter={onEnter} onLeave={onLeave} hover={hover} />
          <div className={`rozeContent ${hover ? styles.active : styles.rightContents} ${isMobile ? styles.mobileContents : ''}`}>
            <Routes>
              <Route path="/" element={<Main hover={hover}/>} />
              <Route path="/Main/" element={<Main hover={hover}/>} />
              <Route path="/AboutRoze/" element={<AboutRoze />} />
              <Route path="/AboutRozem/" element={<AboutRozem />} />
              <Route path="/BoardContent/:idx" element={<BoardContent />} />
              <Route path="/UserBoard/" element={<UserBoard />} />
              <Route path="/Profile/" element={<Profile />} />
              <Route path="/PostingBoard/" element={<PostingBoard />} />
              <Route path="/PhotoGraphy/" element={<PhotoGraphy hover={hover} />} />
              <Route path="/ArtworkBoard/" element={<ArtworkBoard hover={hover} />} />
              <Route path="/DigitalPainting/" element={<DigitalPainting />} />
              <Route path="/Illustration/" element={<Illustration />} />
              <Route path="/ConceptArtBoard/" element={<ConceptArtBoard />} />
              <Route path="/Login/" element={<Login hover={hover}/>} />
              <Route path="/Landscape/" element={<Landscape />} />
              <Route path="/Productshot/" element={<Productshot />} />
              <Route path="/SnapshotUpload/" element={<SnapshotUpload />} />
              <Route path="/Snapshot/" element={<Snapshot />} />
              <Route path="/RozemaryUpload/" element={<RozemaryUpload />} />
              <Route path="/RozemaryEditor/" element={<RozemaryEditor />} />
              <Route path="/Product/" element={<Product hover={hover} />} />
              <Route path="/VisualdesignBoard/" element={<VisualdesignBoard />} />
              <Route path="/WebDesignboard/" element={<WebDesignboard />} />
              <Route path="/ProductDetail/" element={<ProductDetail />} />
              <Route path="/Motiongraphic/" element={<Motiongraphic />} />
              <Route path="/Management/" element={<Management />} />
              <Route path="/GraphicDesign/" element={<GraphicDesign />} />
              <Route path="/PostingEditor/" element={<PostingEditor />} />
              <Route path="/SnapbannerEditor/" element={<SnapbannerEditor />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
};

export default App;
