import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/autoplay';
// Import required modules
import { EffectCreative, Autoplay } from 'swiper/modules';

import './aboutus.css';
import img1 from '../../../images/business-consultant01.png';
import img2 from '../../../images/img2.jpg';
import img3 from '../../../images/img3.png';

const AboutUs = () => {
  return (
    <section className="about-us-section">
      {/* Left Side: Text animation */}
      <motion.div
        className="left"
        initial={{ opacity: 0, x: -50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
      >
        <div className="about">
          - About <span>KO<span className='fi'>FI</span></span>
        </div>
        <h1>
        <span>KO<span className='fi'>FI</span></span> is the biggest supplier of coffee beans, machines, and coffee-related products in <span>Cambodia</span>.
        </h1>
        <p>
          We are a local company with the ambition to be an international one. We currently have 5 branches in
          different cities and provinces with distribution all over the country. KOFI focuses on providing quality
          products with exceptional service to help our clients. We believe that we can only succeed when our clients
          succeed. Hence, our tagline “Your business is our priority.” We want to be a driving force pushing Cambodian
          Coffee Culture to the next level.
        </p>
      </motion.div>

      {/* Right Side: Swiper animation */}
      <motion.div
        className="right"
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
      >
        <Swiper
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          autoplay={{
            delay: 8000, // Time between slides in ms
            disableOnInteraction: false, // Keep autoplay running when user interacts
          }}
          loop={true} // Enable looping of slides
          modules={[EffectCreative, Autoplay]} // Include Autoplay module
          className="mySwiper"
        >
          <SwiperSlide>
            <motion.img
              src={img1}
              alt="Slide 1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src={img2}
              alt="Slide 2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src={img3}
              alt="Slide 3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </section>
  );
};

export default AboutUs;
