import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} KOFI Co.,Ltd. All rights reserved.</p>
        <p>Developed by IT Department</p>
      </div>
      <div className="footer_scroll">
        <button onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
