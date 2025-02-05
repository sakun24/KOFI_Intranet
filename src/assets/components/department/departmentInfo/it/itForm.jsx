import React, { useRef, useEffect } from 'react';
import '../style.css';
import DepartmentPage from '../../DepartmentPage';

const files = [
  {
    number: '1',
    title: 'New Users Registration Form',
    filePath: '/files/01-New Users Registration Form_v1.4.pdf', // Relative path
    fileName: '01-New Users Registration Form_v1.4.pdf'
  },
  {
    number: '2',
    title: 'CCTV CAMERA REQUEST FORM',
    filePath: '/files/CCTV CAMERA REQUEST FORM.pdf', // Relative path
    fileName: 'CCTV CAMERA REQUEST FORM.pdf'
  },
];

function ItForm() {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="finance-container">
      <DepartmentPage />
      <h1 ref={linksListRef}>IT Form</h1>
      <table className="finance-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Document Title</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.number}>
              <td>{file.number}</td>
              <td>{file.title}</td>
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

export default ItForm;