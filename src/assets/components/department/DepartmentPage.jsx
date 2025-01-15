import React, { useState , useEffect } from 'react';
import DepartmentBox from './DepartmentBox'; // Adjust path as needed
import './DepartmentPage.css'; // Import CSS file for styling

const departments = [
  {
    name: 'ITD',
    options: [  
      { id: 1, name: 'SUPPORT REQUEST', url: 'https://t.me/ITKOFIBOT' }, 
      { id: 2, name: 'IT BONUS', url: 'https://docs.google.com/forms/d/e/1FAIpQLSc78Qdh43gjYEeQawEoOOvvUohAgWvkZmxBDJUaFK5B_26EDg/viewform?usp=send_form' }, 
      { id: 3, name: 'IT Form', url: '/landing/it_form' }, 
    ],
  },
  {
    name: 'HR & ADMIN',
    options: [
      { id: 1, name: 'HR SYSTEM', url: 'http://192.168.123.15/bluehcm//applogin.aspx' }, 
      { id: 2, name: 'HR & ADMIN E-FORM', url: '/landing/hradmin_eform' }, 
      { id: 3, name: 'IDP & MDP & CF', url: '/landing/hr-idp' },
      { id: 4, name: 'ON BOARDING PROGRAM', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gTLIU7dI9KQPoqc_?e=0Oe7SN' }, 
      { id: 5, name: 'ON BOARDING PROCESS', url: 'https://docs.google.com/spreadsheets/d/1fOeBOhMygMlkTWf5eULMhpUH4hPHjh98/edit?gid=955140752#gid=955140752' }, 
    ],
  },
  {
    name: 'FINANCE',
    options: [
      { id: 1, name: 'POLICY & PROCEDURE', url: '/landing/finance'}, // External link
      { id: 2, name: 'FINANCE E-FORM', url: '/landing/finance_eform' }, // External link
    ],
  },
  {
    name: 'SUPPLY CHAIN',
    options: [
      { id: 1, name: 'PROCUREMENT E-FORM', url: '/landing/procurement_eform' }, // External link
      { id: 2, name: 'PROCUREMENT FILES', url: '/landing/procurement_files' }, // External link
      // { id: 3, name: 'PURCHASE UPDATE', url: '/landing/procurement_purchase_update' }, // External link
    ],
  },
  {
    name: 'TECHNICAL SERVICE',
    options: [
      { id: 1, name: 'TECHNICAL E-FORM', url: '/landing/technical_eform'}, // External link
    ],
  },
  {
    name: 'OPERATION',
    options: [
      { id: 1, name: 'OPERATION E-FORM', url: '/landing/operation_eform'}, // External link
    ],
  },
  {
    name: 'MONIN',
    options: [
      { id: 1, name: 'MONIN E-FORM', url: '/landing/monin_eform'}, // External link
    ],
  },{
    name: 'SALES',
    options: [
      { id: 1, name: 'SALES E-FORM', url: '/landing/sales_eform'}, // External link
    ],
  },
  {
    name: 'PRODUCTION',
    options: [
      { id: 1, name: 'PRODUCTION E-FORM', url: '/landing/production_eform'}, // External link
    ],
  },
  {
    name: 'COMMERCIAL',
    options: [
      // { id: 1, name: 'NO Items Yet', url: '/landing/departments'}, // External link
    ],
  },
  {
    name: 'R&D',
    options: [
      // { id: 1, name: 'NO Items Yet', url: '/landing/departments'}, // External link
    ],
  },
  {
    name: 'CSR',
    options: [
      // { id: 1, name: 'NO Items Yet', url: '/landing/departments'}, // External link
    ],
  },
  {
    name: 'ACADEMY',
    options: [
      // { id: 1, name: 'NO Items Yet', url: '/landing/departments'}, // External link
    ],
  },
  // Add other departments similarly
];

const DepartmentPage = ({ isBlocked }) => {
  const [iframeUrls, setIframeUrls] = useState([]);

  const handleOptionChange = (url) => {
    setIframeUrls(prevUrls => {
      if (!prevUrls.includes(url)) {
        return [...prevUrls, url];
      }
      return prevUrls;
    });
  };

  if (isBlocked) {
    return <div>Access to this page is blocked.</div>;
  }
  useEffect(()=> {
    document.title = "KOFI - Departments"
  },[]);

  return (
    <div className="department-page">
      {departments.map(department => (
        <DepartmentBox
          key={department.name}
          departmentName={department.name}
          options={department.options}
          onOptionChange={handleOptionChange} // Pass the handleOptionChange function as a prop
        />
      ))}
 
    </div>
  );
};

export default DepartmentPage;
