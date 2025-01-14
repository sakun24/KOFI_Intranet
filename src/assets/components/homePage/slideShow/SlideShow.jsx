import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay styles

// Import required images
import slide1 from '../../../images/slide2.jpg';
import slide2 from '../../../images/slide1.jpg';

import './slideshow.css';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

function SlideShow() {
  // State for the loading count
  const [loadingCount, setLoadingCount] = useState(0);

useEffect(() => {
  const startDate = new Date(2009, 4, 1); // May 1, 2009
  const currentDate = new Date();

  // Calculate the difference in years, considering if the current date is before May 1st
  let yearsOfExperience = currentDate.getFullYear() - startDate.getFullYear();

  if (currentDate.getMonth() < startDate.getMonth() || 
      (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() < startDate.getDate())) {
    yearsOfExperience--;
  }

  // Update loading count incrementally
  const interval = setInterval(() => {
    setLoadingCount((prev) => {
      if (prev < yearsOfExperience) {
        return prev + 1;
      } else {
        clearInterval(interval);
        return yearsOfExperience; // Stop at the calculated years
      }
    });
  }, 100); // Adjust speed of loading

  return () => clearInterval(interval); // Clear interval on unmount
}, []);



  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000, // Time between slides in ms (5 seconds)
        disableOnInteraction: false, // Keep autoplay running when user interacts
      }}
      loop={true} // Enable looping of slides
      modules={[Pagination, Autoplay]} // Include Autoplay module
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="items_slideshow">
          <img src={slide1} alt="Slide 1" />
          <div id="loading-count">
            <h1>{loadingCount}+</h1>
            <p>YEAR OF EXPERIENCES</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="items_slideshow">
        <img src={slide2} alt="Slide 2" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default SlideShow;
