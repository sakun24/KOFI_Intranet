import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link styling
import './navigation.css';
import logo from '../../../images/KOFI LOGO-01 1 (1) 1.png';

const Navigation = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <nav>
      <div className="logo">
        <NavLink exact to="/landing/" end activeClassName="active"><img src={logo} alt="KOFI Logo" /></NavLink>
      </div>
      <div className="text-nav">
        <ul>
          <li><NavLink exact to="/landing/" end activeClassName="active">HOME</NavLink></li>
          <li className="nav_dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <NavLink to="/landing/meeting-room" disable activeClassName="active">MEETING ROOM</NavLink>
            {isDropdownOpen && (
              <ul className="nav_dropdown-menu">
              <li>
  		<NavLink to="https://kofiroom.youcanbook.me/" activeClassName="active" target="_blank" rel="noopener noreferrer">
    			BOOK ROOM
  		</NavLink>
		</li>


                <li><NavLink to="/landing/meeting-room/booking-room-detail" activeClassName="active">BOOK ROOM DETAIL</NavLink></li>
              </ul>
            )}
          </li>
          <li><NavLink to="/landing/contact-list" activeClassName="active">CONTACT LIST</NavLink></li>
          <li><NavLink to="/landing/departments" activeClassName="active">DEPARTMENTS</NavLink></li>
          <li><NavLink to="/landing/kofi_dashboard" activeClassName="active">KOFI DASHBOARD</NavLink></li>
          <li><NavLink to="/landing/foodmenu" activeClassName="active">FOOD MENU</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
