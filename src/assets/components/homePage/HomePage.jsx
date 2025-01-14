import React,{useEffect} from 'react'
import AboutUs from './aboutUs/AboutUs'
import SlideShow from './slideShow/SlideShow'
// import BOD from './bod/BOD'
import './homepage.css'
import Bussioness from './bussionessPartner/Bussioness.jsx'
import ProductsLine from './productlines/ProductsLine.jsx'
import VisionMission from './visionMission/VisionMission.jsx'
import Announcement from './announcement/Announcement.jsx'
import CoreValue from './coreValue/CoreValue.jsx'
const HomePage = () => {
  useEffect(()=>{document.title = "Welcome - KOFI Intranet"},[]);
  return (
    <>
      <SlideShow/>
      <CoreValue/>
      <Announcement/>
      <AboutUs/>
      {/* <BOD/> */}
      <VisionMission/>
      <div className="scroll">
        <h1>Product Line and Business Partner</h1>
      </div>
      <ProductsLine/>
      <Bussioness/>
    </>
  )
}

export default HomePage