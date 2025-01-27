import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { OrbitProgress } from 'react-loading-indicators';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const BASE_URL = 'http://192.168.123.90:8080';
const KPOS_API_URL = `${BASE_URL}/api/kpos`;
const DEPARTMENTS_API_URL = `${BASE_URL}/api/departments`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedBSC, setSelectedBSC] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [latestRecord, setLatestRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kposResponse, departmentsResponse] = await Promise.all([
          axios.get(KPOS_API_URL),
          axios.get(DEPARTMENTS_API_URL),
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
    navigate('/landing/kofi_dashboard/department');
  };

  useEffect(() => {
    let filtered = data;

    // Filter by BSC
    if (selectedBSC) {
      filtered = filtered.filter((item) => item.bsc === selectedBSC);
    }

    // Filter by department
    if (selectedDepartment) {
      filtered = filtered.filter((item) => item.department_id === parseInt(selectedDepartment, 10));
    }

    setFilteredData(filtered);
  }, [selectedDepartment, selectedBSC, data]);

  useEffect(() => {
    if (data.length > 0) {
      const latest = data.reduce((latest, current) => {
        return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
      });
      setLatestRecord(latest);
    }
  }, [data]);

  const calculateSummary = () => {
    const totalMeet = filteredData.filter((item) => parseFloat(item.status) >= 90).length;
    const totalBehind = filteredData.filter((item) => parseFloat(item.status) < 90).length;
    return { meet: totalMeet, behind: totalBehind };
  };

  const summary = calculateSummary();

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleBSCChange = (e) => {
    setSelectedBSC(e.target.value);
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

  if (loading)
    return (
      <div className="loading-container">
        {loading && <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />}
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  // Group data by department and filter out departments with no matching BSC
  const groupedData = departments
    .map((department) => {
      const departmentData = filteredData.filter((item) => item.department_id === department.id);
      return {
        ...department,
        data: departmentData,
      };
    })
    .filter((department) => department.data.length > 0); // Only include departments with data

  return (
    <div className="dashboard">
      <motion.div className="header">
        <h1 className="header-text">KOFI DASHBOARD V1.0</h1>
        <button className="data_entry-button" onClick={handleClick}>
          DATA ENTRY
        </button>
      </motion.div>

      <motion.div
        className="main-container"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <div className="sub-detail-header">
          <h1 className="detail-header">
            BUSINESS COMPETENCY STANDARD <br /> (BCS)
          </h1>
        </div>
        <div className="sub-detail-boxes">
          <div className="box">OUR BUSINESS</div>
          <div className="box">OUR PROCESS</div>
          <div className="box">OUR CUSTOMER</div>
          <div className="box">OUR PEOPLE</div>
        </div>
      </motion.div>

      <motion.div
        className="main-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <div className="sub-detail-header">
          <h1 className="detail-header">BUSINESS COMPETENCY STANDARD (BCS)</h1>
        </div>
        <div
          className="sub-detail-boxes"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            { label: '(SALE)', value: '25M' },
            { label: '(AUTOMATION)', value: '100%' },
            { label: '(EES)', value: '85%' },
            { label: '(PDC)', value: '85%' },
          ].map((box, index) => (
            <div
              className="box1"
              key={index}
              whileHover={{
                scale: 1.1,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="text1">{box.label}</div>
              <div className="text2">{box.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary Section */}
      <motion.div
        className="summary-section"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="summary-content">
          <div className="summary-item">
            <h2>SUMMARY</h2>
            <div className="summary-value">{filteredData.length}</div>
          </div>
          <div className="summary-status">
            <h3>90% STATUS</h3>
            <div className="status-content">
              <div className="status-item">
                <h4>MEET</h4>
                <div className="status-value meet">{summary.meet}</div>
              </div>
              <div className="status-chart">
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="status-item">
                <h4>BEHIND</h4>
                <div className="status-value behind">{summary.behind}</div>
              </div>
            </div>
          </div>
          <div className="summary-total">
            <h4>TOTAL</h4>
            <p>OUR BUSINESS: {filteredData.filter((item) => item.bsc === 'Our Business').length}</p>
            <p>OUR PROCESS: {filteredData.filter((item) => item.bsc === 'Our Process').length}</p>
            <p>OUR CUSTOMER: {filteredData.filter((item) => item.bsc === 'Our Customer').length}</p>
            <p>OUR PEOPLE: {filteredData.filter((item) => item.bsc === 'Our People').length}</p>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-mid_container">
        <div className="latest-records">
          <div className="record-item">
            <strong>Created At: </strong>
            <span>{formatDate(filteredData[filteredData.length - 1]?.created_at)}</span>
          </div>
          <div className="record-item">
            <strong>Updated At: </strong>
            <span>{formatDate(filteredData[filteredData.length - 1]?.updated_at)}</span>
          </div>
        </div>

        <div className="filters">
          <div className="department-filter">
            <label htmlFor="department">Select Department:</label>
            <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className="department-filter">
            <label htmlFor="bsc">Select BCS:</label>
            <select id="bsc" value={selectedBSC} onChange={handleBSCChange}>
              <option value="">All BCS</option>
              <option value="Our Business">Our Business</option>
              <option value="Our Process">Our Process</option>
              <option value="Our Customer">Our Customer</option>
              <option value="Our People">Our People</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        {groupedData.length === 0 ? (
          <div className="no-data-message">
            <p>No data available for the selected filters.</p>
          </div>
        ) : (
          groupedData.map((department) => (
            <div key={department.id} className="department-table">
              <div className="department-header">{department.department_name}</div>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>KEY PERFORMANCE OBJECTIVE</th>
                    <th>BCS</th>
                    <th>Status</th>
                    <th>90% Status</th>
                    <th>KEY PROJECT INITIATIVE</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {department.data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: 'left' }}>{item.kpo_desc}</td>
                      <td>{item.bsc}</td>
                      <td className={parseFloat(item.status) >= 90 ? 'status-meet' : 'status-behind'}>
                        {item.status}%
                      </td>
                      <td>{parseFloat(item.status) >= 90 ? 'Meet' : 'Behind'}</td>
                      <td style={{ textAlign: 'left' }}>
                        {item.kpi_desc.split('\n').map((line, idx) => (
                          <span key={idx}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </td>
                      <td>{formatDate(item.time_frame)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;