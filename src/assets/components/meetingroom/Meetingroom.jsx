import React, { useState, useEffect } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BookingList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(''); // State for the selected room

  useEffect(() => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxgSQDBMTfxEsHaePMeYt9FO-eF64UJ8IwVfYhkXjIsrmleWUXEl28f2jWZL-UXhs0s/exec';
    
    // Fetch data from the Google Apps Script
    fetch(scriptUrl)
      .then((response) => response.json()) // Assuming the response is in JSON format
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data from Google Apps Script:', error));
  }, []);

  // Get the current date and time
  const currentDate = new Date();

  // Filter out bookings where the end time is before the current date
  const filteredData = data?.filter(booking => new Date(booking['End Time']) > currentDate);

  // Sort the filtered data by 'Start Time' (A-Z)
  const sortedData = filteredData?.sort((a, b) => new Date(a['Start Time']) - new Date(b['Start Time']));

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

  // Group the data by 'Which Room'
  const groupedData = sortedData.reduce((acc, booking) => {
    const room = booking['Which Room'];
    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(booking);
    return acc;
  }, {});

  // Handle change in selected room
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  // Add button click handler
  const handleButtonClick = () => {
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
          But don't worry—click the button <a href="https://kofiroom.youcanbook.me/" target='blank'>"Book Room"</a> to make your reservation and secure your spot! 🎉
        </p>
      )}
      


      {/* Displaying data for selected room */}
      {Object.keys(groupedData).map((room, index) => {
        if (selectedRoom && selectedRoom !== room) return null; // Skip rooms that are not selected
        return (
          <div className='room_section' key={index}>
            <h2 id='room'>{room}</h2>
            {groupedData[room].map((booking, bookingIndex) => (
              <div key={bookingIndex} className="container_booking_room">
                <div className="ticket">
                  <div className="ticket_left">
                    <div className="ticket_info">
                    <h2 className="date">
                      {new Date(booking['Start Time']).toLocaleDateString('en-GB', { day: '2-digit' })}
                    </h2>
                      <span >
                        {new Date(booking['Start Time']).toLocaleString('default', { month: 'long' })}
                      </span>
                    </div>
                  </div>
                  <div className="ticket_right">
                    <div className="meeting_title">
                      <h3>{booking['MEETING TOPIC']}</h3>
                    </div>
                    <div className="details">
                      <p>
                        <i className="fa-solid fa-calendar-days"></i>{' '}
                        {new Date(booking['Start Time']).getDate().toString().padStart(2, '0')}- 
                        {new Date(booking['Start Time']).toLocaleString('default', { month: 'short' })}-
                        {new Date(booking['Start Time']).getFullYear()}
                      </p>
                      <p>
                        <i className="fa-solid fa-location-dot"></i> {booking['Which Room']}
                      </p>
                      <p>
                        <i className="fa-solid fa-user"></i> {booking['First Name']} {booking['Last Name']}
                      </p>
                      <p>
                        <i className="fa-solid fa-clock"></i> {new Date(booking['Start Time']).toLocaleTimeString()} -{' '}
                        {new Date(booking['End Time']).toLocaleTimeString()} | {booking['Duration']}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default BookingList;
