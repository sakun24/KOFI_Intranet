// src/components/Footer.jsx
import React from 'react';
import './footer.css'; // Add any specific styles for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} KOFI Co.,Ltd. All rights reserved.</p>
        {/* <p>Contact us: <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></p> */}
        {/* <p>Follow us on:
          <a href="" target="_blank" rel="noopener noreferrer">Facebook</a>,
          <a href="" target="_blank" rel="noopener noreferrer">Twitter</a>,
          <a href="" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p> */}
        <p>Developed by IT Department</p>
      </div>
    </footer>
  );
};

export default Footer;
