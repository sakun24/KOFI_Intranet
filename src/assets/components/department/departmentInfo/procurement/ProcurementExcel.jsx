import React, { useRef, useEffect } from 'react'; 
import '../style.css';
import DepartmentPage from '../../DepartmentPage';

const files = [
    {
        number: '1',
        title: 'Flower-Shop-Catalog',
        // date: '2024-09-01',
        filePath: '/files/Flower-Shop-Catalog.pdf',
        fileName: 'Flower-Shop-Catalog.pdf'
      },
      {
        number: '2',
        title: 'Purchasing-Request-Form-Original-KOFI',
        // date: '2024-09-01',
        filePath: '/files/Purchasing-Request-Form-Original-KOFI.xlsx',
        fileName: 'Purchasing-Request-Form-Original-KOFI.xlsx'
      },
      {
        number: '3',
        title: 'Purchasing-Request-Form-Original-Koona',
        // date: '2024-09-01',
        filePath: '/files/Purchasing-Request-Form-Original-Koona.xlsx',
        fileName: 'Purchasing-Request-Form-Original-Koona.xlsx'
      },
  ];
const ProcurementExcel = () => {
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
              {/* <th>Date</th> */}
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.number}>
                <td>{file.number}</td>
                <td>{file.title}</td>
                {/* <td>{file.date}</td> */}
                <td>
                <a
                  href={file.filePath}
                  download={file.fileName}
                  className="download-link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(file.filePath, '_blank').onerror = () => {
                      alert('Failed to open the file. Please check the file path and server configuration.');
                    };
                  }}
                >
                  Download
                </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default ProcurementExcel