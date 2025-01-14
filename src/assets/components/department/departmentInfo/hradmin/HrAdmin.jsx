import React, { useRef, useEffect } from 'react'; 
import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';

const links = [
  { id: 1, text: 'GENERAL FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScRHKMw0aUBfakn4hMach1vgQocJ1Nn1bPJOgHB8kSGBel7bg/viewform' },
  { id: 2, text: 'STAFF BENEFIT', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfBC82OpHzNCBD6sVXthc7hsdleL4qMe97mJ2-gbfxL_e6Oow/viewform' },
  { id: 3, text: 'BORROW MONEY', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdUKGiHAsi4F4cqsMdupyjUiZHs4x_SGgp8vKh2MvJNlBvNBw/viewform' },
  { id: 4, text: 'MISSION FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfNUyUuHYNutaUwN2UQ4DflThQuJNB6OlOMJ4ZAhoUSWyzs0g/viewform' },
  { id: 5, text: 'PAYROLL REQUEST FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScvS0D3GeAONW9XTedoO069EEb1pOs2DA6rjuqPaGXPSr0ehg/viewform' },
  { id: 6, text: 'SIM CARD AND GALSOLINE CARD', url: 'https://docs.google.com/forms/d/e/1FAIpQLSexMtlVsqv8PpJj6S8Q7Wo1gt2FCjMEiqaQ6MqFSv89V7Dq5A/viewform' },
  { id: 7, text: 'SMART PHONE REQUEST FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSf2Nt42jjw5EVbBsskH9ldJIF2Yt2IJR0qi5nIbxmBO-mdmww/viewform' },
];


const HrAdmin = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list">
    <DepartmentPage/>

    <h1 ref={linksListRef}>HR&ADMIN E-FORM</h1>
    <div className="links-container">
      {links.map(link => (
        <a href={link.url} key={link.id} className="link-box" target='_blank'>
          <div className="link-content">
            {link.text}
          </div>
        </a>
      ))}
    </div>
  </div>
  )
}

export default HrAdmin