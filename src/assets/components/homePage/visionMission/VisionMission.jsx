import React from 'react';
import './VisionMission.css'; // Import the CSS file
import Img1 from '../../../images/KOFI-Career.png';
import Img2 from '../../../images/our-mission.png';
import Img3 from '../../../images/VisionMission.png';
import { motion } from 'framer-motion';
import year from '../../../images/15th-year-cover.png'

function VisionMission() {
  return (
    <>

{/* <div className='mission-section'>
  <motion.div className="text" 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <h1 className="heading">
      <span className="our">Our </span>
      <span className="highlight">Vision</span>
    </h1>
    <p>
      To become an internationally renowned and leading innovative coffee brand.
    </p>
    <h1>
      <span className="our">Our </span>
      <span className="highlight">Mission</span>
    </h1>
    <p>
      Professionalism is a seldom word we hear. To us it means we are equipped with specialized knowledge and skills, so that we are qualified to serve others with standard, character, and ethic. Innovation means we have to continuously update ourselves to keep on leading and finding more innovations as well as more efficient ways to support our customers and partners better.
    </p>
  </motion.div>
    <div className="img_vission_mission">
    <motion.img 
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    src={Img2} alt="Mission" className="section-img"
  />
  <motion.img 
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 2
    }}
    src={Img2} alt="Innovation" className="section-img"
  />

  <motion.img 
    initial={{ opacity: 0, x: 200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    src={Img2} alt="Vision Image" className="section-img"
  />

</div>
</div> */}
      <motion.div className='final-img-container'
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
      >
        <img src={Img3} alt="Vision and Mission" className="final-img" />
        <img src={year  } alt="Vision and Mission" className="final-img" />
      </motion.div>

      
    </>
  );
}

export default VisionMission;
