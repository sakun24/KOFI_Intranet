// BookingRoom.js
import React, { useEffect } from 'react';
import './Meetingroom.css'

const BookingRoom = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "https://kofiroom.youcanbook.me") {
        document.getElementById("ycbmiframekofiroom").style.height = event.data + "px";
      }
    };

    window.addEventListener("message", handleMessage, false);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
    <h1 className='bookh1'>Booking Room</h1>
    <div className="booking-room-container">
      <iframe 
        id="ycbmiframekofiroom" 
        style={{ width: '100%', height: '100%', border: '0px' }} 
        src="https://kofiroom.youcanbook.me/" 
        frameBorder="0" 
      ></iframe>
    </div></>
  );
};

export default BookingRoom;
