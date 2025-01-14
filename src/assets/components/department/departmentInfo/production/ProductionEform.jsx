// src/assets/components/LinksList.jsx
import React, { useRef, useEffect } from 'react';
import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';


const links = [
  { id: 1, text: 'PRODUCTION E-FORM', url: 'https://drive.google.com/drive/folders/10lqGUCp_Ab04VfPd98XMuGYQHU3dwD7o' },
];

const ProductionEform = () => {
    const linksListRef = useRef(null);
  
    useEffect(() => {
      if (linksListRef.current) {
        linksListRef.current.scrollIntoView({ behavior: 'smooth' });
        // window.open(links[0].url, '_blank');
      }
    }, []);

return (
    <>
      <DepartmentPage />
      <div className="links-list" ref={linksListRef}>
        <h1>PRODUCTION E-FORM</h1>
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
export default ProductionEform