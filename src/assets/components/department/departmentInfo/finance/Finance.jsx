// src/assets/components/Finance.jsx
import React, { useRef, useEffect } from 'react'; 
import '../style.css';
import DepartmentPage from '../../DepartmentPage';

const urlpath = "http://iis.kofi.com.kh:8888/landing";

const files = [
  {
    number: '1',
    title: 'KOFI_Finance_Customer Overpayment Policy and Procedure',
    date: '2024-09-01',
    filePath: urlpath+'/files/CUSTOMER-OVER-PAYMENT-CLAIM.pdf',
    fileName: 'KOFI_Finance_Customer Overpayment Policy and Procedure.pdf'
  },
  {
    number: '2',
    title: 'KOFI_Finance_Entertainment Claim Policy',
    date: '2024-09-02',
    filePath: urlpath+'/files/KOFI_Finance_Entertainment-Claim-Policy.pdf',
    fileName: 'KOFI_Finance_Entertainment-Claim-Policy.pdf'
  },
  {
    number: '3',
    title: 'KOFI_Finance_Memo Of Over Credit Limit Approval',
    date: '2024-09-03',
    filePath: urlpath+'/files/KOFI_Finance_Memo-Of-Over-Credit-Limit-Approval.pdf',
    fileName: 'KOFI_Finance_Memo-Of-Over-Credit-Limit-Approval.pdf'
  },
  {
    number: '4',
    title: 'KOFI_Finance_Rebate to customers Policy and Procedure',
    date: '2024-09-04',
    filePath: urlpath+'/files/KOFI_Finance_Rebate-to-customers-Policy-and-Procedure.pdf',
    fileName: 'KOFI_Finance_Rebate-to-customers-Policy-and-Procedure.pdf'
  }
];

const Finance = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="finance-container">
      <DepartmentPage />
      <h1  ref={linksListRef} >Policy and Procedure</h1>
      <table className="finance-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Document Title</th>
            <th>Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.number}>
              <td>{file.number}</td>
              <td>{file.title}</td>
              <td>{file.date}</td>
              <td>
                <a href={file.filePath} download={file.fileName} className="download-link">
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Finance;
