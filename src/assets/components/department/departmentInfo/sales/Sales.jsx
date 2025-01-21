import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';
import React, { useRef, useEffect } from 'react'; 


const links = [
  { id: 1, text: 'SALES GENERAL FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScjpviDvJ-lbfEyL-BpcLWgAPKYCDb5Huf9M5tHN4t9J1cKtw/viewform' },
  { id: 2, text: 'Request cutting new machine to standby machine', url: 'https://forms.gle/UhSq5ERSLGUjc749A' },
];

const Sales = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list">
    <DepartmentPage/>

    <h1 ref={linksListRef}>SALES E-FORM</h1>
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
  );
}

export default Sales