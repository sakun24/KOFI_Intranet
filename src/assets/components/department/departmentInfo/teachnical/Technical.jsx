import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';
import React, { useRef, useEffect } from 'react'; 


const links = [
  { id: 1, text: 'WARRANTY CLAIM FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6Jx3sgXNbbIuujOBvP-zWnqLbLDwc1yawzYFOecHuZTVuDw/viewform' },
  { id: 2, text: 'TAKE OFF SPARE PART REQUEST', url: 'https://docs.google.com/forms/d/e/1FAIpQLSddnELBXve_TTYXS9judjipatxP9d4XIJuZHjG7QiybC2aEMw/viewform' },
  { id: 3, text: ' TAKE OFF SPARE PART RETURN', url: 'https://forms.gle/TKhGiQUPZ7eYrDhK7' },
  { id: 4, text: 'STANDBY MACHINE REQUEST FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScjovl5jYyYbwWxjBUjqlMUu8pTYIDSNUxdR6WcRuupf0Krgw/viewform' },
  { id: 5, text: 'MONTHLY TECHNICIAN BONUS EVALUATION', url: 'https://docs.google.com/forms/d/e/1FAIpQLSd2EVZQGhu_-rxpmx5t7Sh0OM9cFle1Q4fHK4X_0UNd32Jq6A/viewform' },
  { id: 6, text: 'KOFI STANBY MACHINE CUTTING REQUEST FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSc7SYDVqfgtVSF3zkw7EG4LXCyVC2WLZr3N12Lj1H_pr-VMCg/viewform' },
  { id: 7, text: 'TECHNICAL SERVICE OVER TIME REQUEST FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSe_6IOLp0O3Ytz8Wa3-6DGhk532Gyk9y9vbJkU-rylIEB27Bw/viewform' },
];
const Technical = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list">
    <DepartmentPage/>

    <h1 ref={linksListRef}>TECHNICAL E-FORM</h1>
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

export default Technical