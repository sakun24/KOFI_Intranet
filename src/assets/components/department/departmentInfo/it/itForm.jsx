import React, { useRef, useEffect } from 'react'; 
import '../style.css';
import DepartmentPage from '../../DepartmentPage';

const urlpath = "http://iis.kofi.com.kh:8888/landing";

const files = [
    {
        number: '1',
        title: 'New Users Registration Form',
        // date: '2024-09-01',
        filePath: urlpath+'/files/01-New Users Registration Form_v1.4.pdf',
        fileName: '01-New Users Registration Form_v1.4.pdf'
      },
      {
        number: '2',
        title: 'CCTV CAMERA REQUEST FORM',
        // date: '2024-09-01',
        filePath: urlpath+'/files/CCTV CAMERA REQUEST FORM.pdf',
        fileName: 'CCTV CAMERA REQUEST FORM.pdf'
      },
      
  ];

function itForm() {
    const linksListRef = useRef(null);

    useEffect(() => {
      if (linksListRef.current) {
        linksListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);
  return (
    <div className="finance-container">
    <DepartmentPage />
    <h1  ref={linksListRef} >IT Form</h1>
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
              <a href={file.filePath} download={file.fileName} className="download-link">
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default itForm