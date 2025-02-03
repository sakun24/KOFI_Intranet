import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { OrbitProgress } from 'react-loading-indicators';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase, 
  faCogs,     
  faUsers,     
  faUserFriends, 
  faShoppingCart,
  faFaceGrinHearts,
  faGraduationCap  , 
} from '@fortawesome/free-solid-svg-icons';

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
  const [count, setCount] = useState(0);
  const targetCount = filteredData.length;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [kposResponse, departmentsResponse] = await Promise.all([
        axios.get(KPOS_API_URL),
        axios.get(DEPARTMENTS_API_URL),
      ]);

      setData(kposResponse.data);
      setDepartments(departmentsResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => clearTimeout(timer);
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

  useEffect(() => {
    let start = 0;
    const end = targetCount;
    if (start === end) return;

    let totalDuration = 1200; // duration in ms
    let incrementTime = totalDuration / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetCount]);

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

  // Dynamic Doughnut Chart Data
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

  if (error)
    return (
      <div className="error-container">
        <p>Oops! Something went wrong. Please try to Refresh again.</p>
      </div>
    );

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
        <h1 className="header-text">KOFI DASHBOARD 1.0</h1>
        <button className="data_entry-button" onClick={handleClick}>
          <i className="fas fa-user-tie"></i> DATA ENTRY
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
            BUSINESS COMPETENCY STANDARD 
          </h1>
        </div>
       <div className="sub-detail-boxes">
          <div className="box">
            <FontAwesomeIcon icon={faBriefcase} className="icon" /> OUR BUSINESS
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faCogs} className="icon" /> OUR PROCESS
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faUsers} className="icon" /> OUR CUSTOMER
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faUserFriends} className="icon" /> OUR PEOPLE
          </div>
        </div>
      </motion.div>

      <motion.div
        className="main-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <div className="sub-detail-header">
          <h1 className="detail-header">OUR DIRECTION 2025</h1>
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
         {[{ label: '(SALE)', value: '25M', icon: faShoppingCart },
            { label: '(AUTOMATION)', value: '100%', icon: faCogs },
            { label: '(EES)', value: '85%', icon: faFaceGrinHearts },
            { label: '(PDC)', value: '85%', icon: faGraduationCap },
          ].map((box, index) => (
            <div
              className="box1"
              key={index}
              whileHover={{
                scale: 1.1,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <FontAwesomeIcon icon={box.icon} className="icon" />
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
            <div className="summary-value">{count}</div>
          </div>
          <div className="summary-status">
            <h3>90% STATUS</h3>
            <div className="status-content">
              <div className="status-item">
                <h4>MEET</h4>
                <div className="status-value meet">{summary.meet}</div>
              </div>
              <div className="status-chart">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
              <div className="status-item">
                <h4>BEHIND</h4>
                <div className="status-value behind">{summary.behind}</div>
              </div>
            </div>
          </div>
          <div className="summary-total">
            <h2>TOTAL</h2>
            <div className="grid_text">
                <p>OUR BUSINESS <br /> <span style={{fontSize:'30px'}}>{filteredData.filter((item) => item.bsc === 'Our Business').length}</span></p>
                <p>OUR PROCESS <br /> <span style={{fontSize:'30px'}}>{filteredData.filter((item) => item.bsc === 'Our Process').length}</span></p>
                <p>OUR CUSTOMER <br /> <span style={{fontSize:'30px'}}>{filteredData.filter((item) => item.bsc === 'Our Customer').length}</span></p>
                <p>OUR PEOPLE <br /> <span style={{fontSize:'30px'}}>{filteredData.filter((item) => item.bsc === 'Our People').length}</span></p>
            </div>
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
              <table style={{ width: "100%", tableLayout: "fixed" }}>
               <thead>
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th style={{ width: "5%" }}>No</th>
                  <th style={{ textAlign: "left", width: "35%" }}>KEY PERFORMANCE OBJECTIVE</th>
                  <th style={{ width: "10%" }}>BCS</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "10%" }}>90% Status</th>
                  <th style={{ textAlign: "left", width: "25%" }}>KEY PROJECT INITIATIVE</th>
                  <th style={{ width: "10%" }}>Deadline</th>
                </tr>
              </thead>
                <tbody>
                  {department.data.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="No">{index + 1}</td>
                      <td data-label="KEY PERFORMANCE OBJECTIVE" style={{ textAlign: 'left' }}>{item.kpo_desc}</td>
                      <td data-label="BCS" style={{ whiteSpace: "nowrap", textAlign: 'left' }}>{item.bsc}</td>
                      <td data-label="Status" className={parseFloat(item.status) >= 90 ? 'status-meet' : 'status-behind'}>
                        {item.status}%
                      </td>
                      <td data-label="90% Status">{parseFloat(item.status) >= 90 ? 'Meet' : 'Behind'}</td>
                      <td data-label="KEY PROJECT INITIATIVE" style={{ textAlign: 'left' , color:'#ff8c00'}}>{item.kpi_desc}</td>
                      <td data-label="Deadline" style={{whiteSpace:'nowrap'}}>{formatDate(item.time_frame)}</td>
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