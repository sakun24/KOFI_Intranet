import React, { useState, useEffect } from 'react';
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
      { id: 1, name: 'ON BOARDING PROCESS', url: 'https://docs.google.com/spreadsheets/d/1fOeBOhMygMlkTWf5eULMhpUH4hPHjh98/edit?gid=955140752#gid=955140752' },
      { id: 2, name: 'INDUCTION PROGRAM', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gTLIU7dI9KQPoqc_?e=0Oe7SN' },
      { id: 3, name: 'MDP 1.0', url: '/landing/hr-idp' },
      {
        id: 4,
        name: 'ORG CHART',
        subOptions: [
          { id: 1, name: '2025', url: '/orgchart/team-structure' },
        ],
      },
      { id: 5, name: 'HR & ADMIN E-FORM', url: '/landing/hradmin_eform' },
      { id: 6, name: 'HR SYSTEM', url: 'http://192.168.123.15/bluehcm//applogin.aspx' },
    ],
  },
  {
    name: 'FINANCE',
    options: [
      { id: 1, name: 'POLICY & PROCEDURE', url: '/landing/finance' },
      { id: 2, name: 'FINANCE E-FORM', url: '/landing/finance_eform' },
    ],
  },
  {
    name: 'SUPPLY CHAIN',
    options: [
      { id: 1, name: 'PROCUREMENT E-FORM', url: '/landing/procurement_eform' },
      { id: 2, name: 'PROCUREMENT FILES', url: '/landing/procurement_files' },
    ],
  },
  {
    name: 'TECHNICAL SERVICE',
    options: [
      // Add options here
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
    if (!iframeUrls.includes(url)) {
      setIframeUrls((prevUrls) => [...prevUrls, url]);
    }
  };

  useEffect(() => {
    document.title = 'KOFI - Departments';
  }, []);

  if (isBlocked) {
    return <div>Access to this page is blocked.</div>;
  }

  return (
    <div className="department-page">
      {departments.map((department, index) => (
        <DepartmentBox
          key={index}
          departmentName={department.name}
          options={department.options}
          onOptionChange={handleOptionChange}
        />
      ))}
    </div>
  );
};

export default DepartmentPage;
