import React, { useRef, useEffect } from 'react'; 
import '../style.css'; 
const links = [
  { id: 1, text: '2025', url: '/landing/hr-idp/department_idp' },
];


const HrIdp = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list_idp">
    {/* <DepartmentPage/> */}

    <h2 ref={linksListRef} class="development-plans-title">Master Development Plan (MDP)
    </h2>

    <div className="links-container">
      {links.map(link => (
        <a href={link.url} key={link.id} className="link-box" >
          <div className="link-content">
            {link.text}
          </div>
        </a>
      ))}
    </div>
  </div>
  )
}

export default HrIdp