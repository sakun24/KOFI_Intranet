import '../style.css'; // Import CSS file for styling
import DepartmentPage from '../../DepartmentPage';
import React, { useRef, useEffect } from 'react';

const links = [
  { id: 1, text: 'PURCHASING REQUEST E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeL6FFgPWWQiEIT1I_MNA6hx2MgaK04m0ATwzznV-Jr_gIKzA/viewform' },
  { id: 2, text: 'PURCHASING REQUEST STATUS', url: '/landing/procurement_purchase_update' },
  { id: 3, text: 'RECOMMENDATION E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfXvP7SM7T9CHBZAuhJfIM9rK9mKbqduqUNB7JTMfRLnVfy_Q/viewform' },
  { id: 4, text: 'ITEM CODE REGISTER E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScEOZKCuG6nxu4F_VhpsAMv7xR4zVkjTdQDZAR9lIhxdQk2iA/viewform' },
  { id: 5, text: 'PRODUCT PRICE LIST REQUEST E-FORM', url: 'https://docs.google.com/forms/d/e/1FAIpQLScG5Lao5uqh5Tp_1Dfs2KqdsLhsbTY5vKF4tpaUDO2ruwi9Gw/viewform' },
  { id: 6, text: 'OVERSEA PURCHASE ORDER', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfR6uSKzLXlM7_Ah0fzqQNQy72M9zVVJ3-RAvVmqryJ25nE3w/viewform' },
];

function ProcurementEform() {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLinkClick = (link) => {
    if (link.id === 2) {
      window.location.href = link.url;
    } else {
      window.open(link.url, '_blank');
    }
  };

  return (
    <div className="links-list">
      <DepartmentPage />
      <h1 ref={linksListRef}>SUPPLY CHAIN E-FORM</h1>
      <div className="links-container">
        {links.map((link) => (
          <div
            key={link.id}
            className={`link-box ${link.id === 2 ? 'color' : ''}`} // Add class 'red' if id is 2
            onClick={() => handleLinkClick(link)}
            style={{ cursor: 'pointer' }}
          >
            <div className="link-content">{link.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProcurementEform;
