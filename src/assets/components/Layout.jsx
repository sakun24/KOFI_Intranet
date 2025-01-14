import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './homePage/navigation/Navigation'; // Adjust the path as needed

const Layout = () => {
  const location = useLocation();
  console.log(location.pathname); // Debugging line to check current path
  
  // Determine if navigation should be hidden based on the current pathname
  const hideNav = [
    '/finance',
    '/finance_eform',
    // Add more paths if needed
  ].includes(location.pathname);

  return (
    <div>
      {!hideNav && <Navigation />}
      <Outlet />
    </div>
  );
};

export default Layout;
