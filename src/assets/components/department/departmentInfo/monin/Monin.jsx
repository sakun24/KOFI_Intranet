import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';
import React, { useRef, useEffect } from 'react'; 

const links = [
  { id: 1, text: 'MONIN GENERAL FORM REQUEST', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeH9rX89wyzFHmoIC5dIo31VxhFHaVlmXFEfhSQFnCNsfz5qQ/viewform' },
];

const Monin = () => {
   const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list">
    <DepartmentPage/>

    <h1 ref={linksListRef}>MONIN E-FORM</h1>
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

export default Monin