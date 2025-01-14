import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';
import React, { useRef, useEffect } from 'react'; 

const links = [
  { id: 1, text: 'GOODs TRANFER FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdVZVysaKw0VtInBkQDVxLJ_GcPCBhhoqz-R-1anMlm9SgnCA/viewform' },
];
const Operation = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list">
    <DepartmentPage/>

    <h1 ref={linksListRef}>OPERATION E-FORM</h1>
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

export default Operation