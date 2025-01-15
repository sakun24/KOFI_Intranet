import React, { useState } from 'react';
import '../style.css';  // Import your CSS file

const HrDashboard = () => {
  const [data, setData] = useState([
    {
      direction: 'HRAD',
      kpo: [
        { name: 'KOFI Reward 1.0', status: '96%', timeframe: 'January' },
        { name: '500 Pipeline', status: '106%', timeframe: 'February' },
        { name: 'SCP 1.0', status: '84%', timeframe: 'March' },
        { name: 'YPP 1.0', status: '75%', timeframe: 'March' },
      ]
    },
    {
      direction: 'FND',
      kpo: [
        { name: 'Expense Review', status: '50%', timeframe: 'January' },
        { name: 'E-Form 1.0', status: '50%', timeframe: 'February' },
        { name: 'SAP 1.0', status: '70%', timeframe: 'March' },
        { name: 'Finance Learning Day 1.0', status: '75%', timeframe: 'March' },
      ]
    },
    {
      direction: 'ITD',
      kpo: [
        { name: 'IT Productivity 1.0', status: '50%', timeframe: 'January' },
        { name: 'Autonomation 1.0', status: '50%', timeframe: 'February' },
        { name: 'IT Excellence 1.0', status: '70%', timeframe: 'March' },
        { name: 'Monthly ITD Learning Day', status: '75%', timeframe: 'March' },
      ]
    },
    {
      direction: 'SPD',
      kpo: [
        { name: 'IT Productivity 1.0', status: '50%', timeframe: 'January' },
        { name: 'Autonomation 1.0', status: '50%', timeframe: 'February' },
        { name: 'IT Excellence 1.0', status: '70%', timeframe: 'March' },
        { name: 'Monthly ITD Learning Day', status: '75%', timeframe: 'March' },
      ]
    },
  ]);

  return (
    <div className="HrDashboard">
        <div className="hrDashboard_header">
            <h1 className='hrDashboard_header_h1'hrDashboard_header>HR Dashboard</h1>
        </div>
        <div className="hrDashboard_bse">
            <table className="hrDashboard_table">
              <thead>
                <tr>
                  <th>Direction</th>
                  <th>2025</th>
                  <th>Key Performance Objective (KPO)</th>
                  <th>Status</th>
                  <th>Key Project Initiative (KPI)</th>
                  <th>Timeframe</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                <>
               {row.kpo.map((kpo, kpoIndex) => (
  <tr key={`${index}-${kpoIndex}`}>
    {/* Display number for each KPO */}
    {kpoIndex === 0 && (
      <>
        <td rowSpan={row.kpo.length}>{kpoIndex += 1}</td> {/* Number for each KPO */}
        <td rowSpan={row.kpo.length}>{row.direction}</td> {/* Direction for the first row in each group */}
      </>
    )}
    
    <td>{kpo.name}</td>
    <td>{kpo.status}</td>
    <td>{kpo.name}</td>
    <td>{kpo.timeframe}</td>
  </tr>
))}

              </>
                ))}
              </tbody>
            </table>
        </div>
    </div>
  );
};

export default HrDashboard;
