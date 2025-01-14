// BookingRoomDetail.js
import React from 'react';
import './Meetingroom.css'

const BookingRoomDetail = () => {
  return (
    <>
    <h1 className='bookh1'>Booking Room Detail</h1>
    <div className="booking-room-container-detail">
      <iframe 
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQi_MQU6KJ51Pw_erCmSSh8yj-fusVda8h3jXLd1UL-DnxYE9jN1Q56FL7STlxgtiHuDMSwV6frw3Kq/pubhtml?widget=true&amp;headers=false" 
        width="100%" 
        height="100%" 
        style={{ border: '0px' }}
      ></iframe>
    </div></>
  );
};

export default BookingRoomDetail;
