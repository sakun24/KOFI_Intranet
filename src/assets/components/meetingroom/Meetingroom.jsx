import React, { useState, useEffect } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Meetingroom.css'
import { motion } from 'framer-motion';

const BookingList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(''); // State for the selected room

  useEffect(() => {
    const scriptUrl = 'http://192.168.123.91:3000/api/allbook/all';
    
    // Fetch data from the API
    fetch(scriptUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        setData(data.booked); // Update this line if the structure is different
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  // Get the current date and time
  const currentDate = new Date();

  // Filter out bookings where the endTime is before the current date
  const filteredData = data?.filter(booked => new Date(booked['endTime']) > currentDate);

  // Sort the filtered data by 'startTime' (A-Z)
  const sortedData = filteredData?.sort((a, b) => new Date(a['startTime']) - new Date(b['startTime']));

  // Render loading state or actual data
  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />
    </div>
  );

  // Group the data by 'location'
  const groupedData = sortedData.reduce((acc, booked) => {
    const room = booked['location'];
    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(booked);
    return acc;
  }, {});

  // Handle change in selected room
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  // Add button click handler
  const handleButtonClick = () => {
    // window.open('http://192.168.123.90:81/login', '_blank');
    window.open('https://kofiroom.youcanbook.me/', '_blank');
  };

  // Check if no rooms are available for selected room
  const isNoRoomSelected = !selectedRoom && Object.keys(groupedData).length === 0;
  const isNoBookingsForRoom = selectedRoom && !groupedData[selectedRoom]?.length;

  return (
    <div>
      <h1 className='meeting_room_h1'>Meeting Room Information </h1>

      {/* Dropdown for selecting room */}
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
        
        {/* Button */}
        <button onClick={handleButtonClick} className='meetingroom_button'>
          Book Room
        </button>
      </div>

      {/* Message when no room is available or selected */}
      {isNoRoomSelected && (
        <p className="no-booking-message">
          (Testing) <br /><br />
          Oops! It looks like there's no room available right now. 😔
          <br />
          But don't worry—click the button <a href="http://192.168.123.90:81/login" target='blank'>"Book Room"</a> to make your reservation and secure your spot! 🎉
        </p>
      )}
      

      {/* Displaying data for selected room */}

      {Object.keys(groupedData).map((room, index) => {
        if (selectedRoom && selectedRoom !== room) return null; // Skip rooms that are not selected
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
                          <i className="fa-solid fa-calendar-days"></i>{' '}
                          {new Date(booked['startTime']).getDate().toString().padStart(2, '0')}-
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
                          {booked['duration'] <= 60
                            ? `${booked['duration']} Minutes`
                            : `${(booked['duration'] / 60).toFixed(0)} Hours`}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

    </div>
  );
};
export default BookingList;