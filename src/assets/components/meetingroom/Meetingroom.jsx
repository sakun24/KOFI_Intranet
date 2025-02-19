import React, { useState, useEffect } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Meetingroom.css';
import { motion } from 'framer-motion';

const BookingList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const scriptUrl = 'http://192.168.123.91:3000/api/allbook/all';
    
    fetch(scriptUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        setData(data.booked);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
        setLoading(false);
      });
  }, []);

  const currentDate = new Date();

  const filteredData = data?.filter(booked => new Date(booked['endTime']) > currentDate);
  const sortedData = filteredData?.sort((a, b) => new Date(a['startTime']) - new Date(b['startTime']));

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />
    </div>
  );

  const groupedData = sortedData.reduce((acc, booked) => {
    const room = booked['location'];
    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(booked);
    return acc;
  }, {});

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleButtonClick = () => {
    window.open('http://iis.kofi.com.kh:81/login', '_blank');
  };

  const isNoRoomSelected = !selectedRoom && Object.keys(groupedData).length === 0;
  const isNoBookingsForRoom = selectedRoom && !groupedData[selectedRoom]?.length;

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const handleClickOutside = (e) => {
    // Close modal if clicked outside the modal content
    if (e.target.classList.contains('modal')) {
      setSelectedBooking(null);
    }
  };

  const getStatus = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (currentDate >= start && currentDate <= end) return 'In Progress';
    if (currentDate < start) return 'Upcoming';
    return '';
  };


  return (
    <div>
      <h1 className='meeting_room_h1'>Meeting Room Information </h1>

      <div className="location_dropdown">
        <label htmlFor="roomSelect">Select Room:</label>
        <select id="roomSelect" onChange={handleRoomChange} value={selectedRoom}>
          <option value="">All Rooms</option>
          {Object.keys(groupedData).map((room, index) => (
            <option key={index} value={room}>
              {room}
            </option>
          ))}
        </select>
        
        <button onClick={handleButtonClick} className='meetingroom_button'>
          Book Room
        </button>
      </div>

      {isNoRoomSelected && (
        <p className="no-booking-message">
          Oops! It looks like there's no room available right now. 😔
          <br />
          But don't worry—click the button <a href="http://iis.kofi.com.kh:81/login" target='blank'>"Book Room"</a> to make your reservation and secure your spot! 🎉
        </p>
      )}

      {Object.keys(groupedData).map((room, index) => {
        if (selectedRoom && selectedRoom !== room) return null;
        return (
          <motion.div
            className="room_section"
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="room">{room}</h2>
            <div className="booking-grid">
              {groupedData[room].map((booked, bookingIndex) => (
                <motion.div
                  key={bookingIndex}
                  className="container_booking_room"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBookingClick(booked)}
                >
                  <div className="ticket">
                    <div className="ticket_left" style={{ backgroundColor: booked['backgroundColor'] }}>
                      <div className="ticket_info">
                        <h2 className="date">
                          {new Date(booked['startTime']).toLocaleDateString('en-GB', { day: '2-digit' })}
                        </h2>
                        <span style={{ color: 'white' }}>
                          {new Date(booked['startTime']).toLocaleString('default', { month: 'long' })}
                        </span>
                      </div>
                    </div>
                    <div className="ticket_right">
                      <div className="meeting_title">
                        <h3>{booked['meetingTopic']}</h3>
                      </div>
                      <div className="details">
                        <p>
                          <i className="fa-solid fa-calendar-days"></i> {new Date(booked['startTime']).getDate().toString().padStart(2, '0')}- 
                          {new Date(booked['startTime']).toLocaleString('default', { month: 'short' })}-
                          {new Date(booked['startTime']).getFullYear()}
                        </p>
                        <p>
                          <i className="fa-solid fa-location-dot"></i> {booked['location']}
                        </p>
                        <p>
                          <i className="fa-solid fa-user"></i> {booked['firstName']} {booked['lastName']}
                        </p>
                        <p>
                          <i className="fa-solid fa-clock"></i> {new Date(booked['startTime']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                          {new Date(booked['endTime']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | {' '}
                          {booked['duration'] <= 60 ? `${booked['duration']} Minutes` : `${(booked['duration'] / 60).toFixed(0)} Hours`}
                        </p>
                        <p><strong>Status:</strong> <span className={getStatus(booked['startTime'], booked['endTime']) === 'In Progress' ? 'status-in-progress' : 'status-upcoming'}>{getStatus(booked['startTime'], booked['endTime'])}</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {selectedBooking && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content ">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Booking Details</h2>
            <p><strong>Meeting Topic:</strong> {selectedBooking['meetingTopic']}</p>
            <p><strong>Location:</strong> {selectedBooking['location']}</p>
            <p><strong>Start Time:</strong> {new Date(selectedBooking['startTime']).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <p><strong>End Time:</strong> {new Date(selectedBooking['endTime']).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <p><strong>Duration:</strong> {selectedBooking['duration'] <= 60 ? `${selectedBooking['duration']} Minutes` : `${(selectedBooking['duration'] / 60).toFixed(0)} Hours`}</p>
            <p><strong>Organizer:</strong> {selectedBooking['firstName']} {selectedBooking['lastName']}</p>
            <p><strong>Phone Number:</strong> {selectedBooking['phoneNumber']}</p>
            <p><strong>Email:</strong> {selectedBooking['email']}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;
