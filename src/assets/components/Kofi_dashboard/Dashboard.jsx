import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { OrbitProgress } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const KPOS_API_URL = 'http://192.168.120.151:8080/api/kpos';
const DEPARTMENTS_API_URL = 'http://192.168.120.151:8080/api/departments';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [latestRecord, setLatestRecord] = useState(null); // To hold the latest record

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kposResponse, departmentsResponse] = await Promise.all([
          axios.get(KPOS_API_URL),
          axios.get(DEPARTMENTS_API_URL)
        ]);

        setData(kposResponse.data);
        setDepartments(departmentsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/landing/kofi_dashboard/department'); // Change this to the route you want to navigate to
  };

  useEffect(() => {
    // Filter or group data based on selected department
    if (selectedDepartment) {
      if (selectedDepartment === '') {
        setFilteredData(data); // Show all data when "All Departments" is selected
      } else {
        setFilteredData(data.filter(item => item.department_id === parseInt(selectedDepartment, 10)));
      }
    } else {
      setFilteredData(data); // Show all data if no department is selected
    }
  }, [selectedDepartment, data]);

  useEffect(() => {
    if (data.length > 0) {
      // Sort data to find the latest record based on created_at or updated_at
      const latest = data.reduce((latest, current) => {
        return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
      });
      setLatestRecord(latest);
    }
  }, [data]);

  const calculateSummary = () => {
    const totalMeet = filteredData.filter(item => parseFloat(item.status) >= 90).length;
    const totalBehind = filteredData.filter(item => parseFloat(item.status) < 90).length;
    return { meet: totalMeet, behind: totalBehind };
  };

  const summary = calculateSummary();

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value); // Update selected department
  };

  // Dynamic Pie Chart Data
  const chartData = {
    labels: ['Meet', 'Behind'],
    datasets: [
      {
        data: [summary.meet, summary.behind],
        backgroundColor: ['#4CAF50', '#FF5722'],
        hoverBackgroundColor: ['#66BB6A', '#FF7043'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  // Format deadline as dd-mmm-yyyy
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh' // or any suitable height
    }}>
      {loading && <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />}
    </div>
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard">
      <div className="header">
        <h1 style={{ textAlign: 'center' }}>KOFI DASHBOARD V1.0</h1>
        <button onClick={handleClick}>DATA ENTRY</button>
      </div>

      {/* Summary Section */}
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#317AAE', padding: '20px', borderRadius: '10px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
            <h2>SUMMARY</h2>
            <div style={{ fontSize: '50px', fontWeight: 'bold' }}>{filteredData.length}</div>
          </div>
          <div>
            <h3>90% STATUS</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <h4>MEET</h4>
                <div style={{ fontSize: '30px', color: 'green' }}>{summary.meet}</div>
              </div>
              <div style={{ width: '100px', height: '100px' }}>
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div>
                <h4>BEHIND</h4>
                <div style={{ fontSize: '30px', color: 'red' }}>{summary.behind}</div>
              </div>
            </div>
          </div>
          <div>
            <h4>TOTAL</h4>
            <p>OUR BUSINESS: {filteredData.filter(item => item.bsc === 'Our Business').length}</p>
            <p>OUR PROCESS: {filteredData.filter(item => item.bsc === 'Our Process').length}</p>
            <p>OUR CUSTOMER: {filteredData.filter(item => item.bsc === 'Our Customer').length}</p>
            <p>OUR PEOPLE: {filteredData.filter(item => item.bsc === 'Our People').length}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 20px' }}>

        {/* Latest records section (created_at and updated_at) */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '16px', fontWeight: '600' }}>Created At: </strong>
            <span style={{ fontSize: '14px', color: '#555' }}>
              {formatDate(filteredData[filteredData.length - 1]?.created_at)}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '16px', fontWeight: '600' }}>Updated At: </strong>
            <span style={{ fontSize: '14px', color: '#555' }}>
              {formatDate(filteredData[filteredData.length - 1]?.updated_at)}
            </span>
          </div>
        </div>

        {/* Department filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label
            htmlFor="department"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginRight: '10px',
              color: '#333', // Dark text color for better contrast with background
            }}
          >
            Select Department:
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            style={{
              padding: '10px 20px', // Balanced padding for better appearance
              backgroundColor: '#ff8c00', // Slightly lighter orange for a modern look
              color: '#fff', // White text for contrast
              fontSize: '14px',
              borderRadius: '6px', // Softer rounded corners
              border: '1px solid #e57e00', // Matching border color
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Softer shadow for depth
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease', // Smooth transition for hover effects
            }}
          >
            <option value="" style={{ padding: '8px 12px' }}>
              All Departments
            </option>
            {departments.map(department => (
              <option
                key={department.id}
                value={department.id}
                style={{
                  padding: '10px', // Consistent padding
                  backgroundColor: '#fff', // White background for options
                  color: '#333', // Dark text for readability
                  fontSize: '14px',
                  borderRadius: '4px',
                  border: '1px solid #ccc', // Lighter border for options
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Soft shadow
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease', // Smooth background transition
                }}
              >
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render the table for all departments or the selected department */}
      <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '10px', borderRadius: '10px', color: '#000' }}>
        {/* Display tables for all departments if no department is selected */}
        {(selectedDepartment === '' || selectedDepartment === 'all') && departments.map(department => {
          const departmentData = filteredData.filter(item => item.department_id === department.id);
          return (
            <div key={department.id} style={{ marginBottom: '20px' }}>
              {/* Department Header */}
              <div
                style={{
                  backgroundColor: '#317AAE',
                  color: 'white',
                  textAlign: 'center',
                  padding: '10px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                {department.department_name}
              </div>

              {/* Table for Department */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'center' }}>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>No</th>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>KEY PERFORMANCE OBJECTIVE</th>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>BCS</th>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>Status</th>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>90% Status</th>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>KEY PROJECT INITIATIVE</th>
                    <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentData.map((item, index) => (
                    <tr key={item.id} style={{ textAlign: 'center' }}>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index + 1}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.kpo_desc}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.bsc}</td>
                      <td
                        style={{
                          padding: '8px',
                          border: '1px solid #ddd',
                          color: parseFloat(item.status) >= 90 ? 'green' : 'red',
                        }}
                      >
                        {item.status}%
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {parseFloat(item.status) >= 90 ? 'Meet' : 'Behind'}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {item.kpi_desc.split('\n').map((line, idx) => (
                          <span key={idx}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{formatDate(item.time_frame)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Render the table for a selected department */}
        {selectedDepartment !== '' && selectedDepartment !== 'all' && departments.map(department => {
          if (department.id === parseInt(selectedDepartment, 10)) {
            const departmentData = filteredData.filter(item => item.department_id === department.id);
            return (
              <div key={department.id} style={{ marginBottom: '20px' }}>
                {/* Department Header */}
                <div
                  style={{
                    backgroundColor: '#317AAE',
                    color: 'white',
                    textAlign: 'center',
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  {department.department_name}
                </div>

                {/* Table for Department */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'center' }}>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>No</th>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>KEY PERFORMANCE OBJECTIVE</th>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>BCS</th>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>Status</th>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>90% Status</th>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>KEY PROJECT INITIATIVE</th>
                      <th style={{ padding: '8px', fontSize: '16px', border: '1px solid #ddd' }}>Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.map((item, index) => (
                      <tr key={item.id} style={{ textAlign: 'center' }}>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index + 1}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.kpo_desc}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.bsc}</td>
                        <td
                          style={{
                            padding: '8px',
                            border: '1px solid #ddd',
                            color: parseFloat(item.status) >= 90 ? 'green' : 'red',
                          }}
                        >
                          {item.status}%
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {parseFloat(item.status) >= 90 ? 'Meet' : 'Behind'}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {item.kpi_desc.split('\n').map((line, idx) => (
                            <span key={idx}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{formatDate(item.time_frame)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Dashboard;
