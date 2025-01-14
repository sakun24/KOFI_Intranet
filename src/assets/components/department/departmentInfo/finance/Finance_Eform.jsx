// src/assets/components/LinksList.jsx
import React, { useRef, useEffect } from 'react';
import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';


const links = [
  { id: 1, text: 'PETTY CASH E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSchX9svBFuEtiJPw-5NIdVbIEtKhmz7ms5mWpK_x25F2vT6hA/viewform' },
  { id: 2, text: 'PAYMENT REQUEST E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScZkxNsa1rYo0e0bDVNlEUsviTCh7YIeWneZSTbDCzmpgoGKQ/viewform' },
  { id: 3, text: 'ADVANCE PAYMENT E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdUya9RimcUtsmJZ1_VB48c0QURRWmNZIoGO1SVGwLBD3mXzw/viewform' },
  { id: 4, text: 'CLEAR ADVANCE PAYMENT E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSecgaDRooDF814mXdGCE_GbOtHttYc8J09jzGVhsU8_hip92w/viewform' },
  { id: 5, text: 'PRODUCT REQUEST E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdqqkiRro8h4JQss8gG2YhazaiY6tbOTn7r_Vby3BwhH-GkTQ/viewform' },
  { id: 6, text: 'PAYMENT VOUCHER E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScpiQGJ3DhhZQjj3Hz65Ay3KHjPNS1OTiND7FtbJgCOj8Tm2Q/viewform' },
  { id: 7, text: 'FINANCE GENERAL E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeekku85TzZIe-fv6C7kchYZYhvZ0LTE0RVPP1xDj74Ho5I5g/viewform' },
];

const LinksList = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <DepartmentPage />
      <div className="links-list" ref={linksListRef}>
        <h1>FINANCE E-FORM</h1>
        <div className="links-container">
          {links.map(link => (
            <a href={link.url} key={link.id} className="link-box" target='_blank' rel='noopener noreferrer'>
              <div className="link-content">
                {link.text}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default LinksList;
