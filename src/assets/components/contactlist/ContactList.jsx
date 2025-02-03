import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './contactList.css'; // Ensure this CSS file exists
import BOD from '../homePage/bod/BOD';
import { OrbitProgress } from 'react-loading-indicators';

const ContactList = () => {
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const api = 'http://192.168.123.90/api/employees';
  const [showGoToTop, setShowGoToTop] = useState(false);
  const allEmployees = Object.values(employeesByDepartment).flat();
  const latestCreated = allEmployees.length > 0 ? new Date(Math.max(...allEmployees.map(emp => new Date(emp.created_at)))) : null;
  const latestUpdated = allEmployees.length > 0 ? new Date(Math.max(...allEmployees.map(emp => new Date(emp.updated_at)))) : null;

  useEffect(() => {
    document.title = "KOFI - Contact List";
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        setEmployeesByDepartment(response.data.employees_by_department);
        setDepartments(response.data.departments);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => setShowGoToTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleRoleFilterChange = (role) => {
    setFilterRole(role);
  };

  const handleCopyEmails = () => {
    const emails = filteredEmployeesByDepartment.flatMap(departmentData =>
      departmentData.employees
        .filter(employee => employee.email)
        .map(employee => employee.email)
    );
    const emailList = emails.join(', ');

    if (!emailList) {
      showAlert('No emails to copy');
      return;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailList)
        .then(() => showAlert('Emails copied to clipboard!'))
        .catch(err => console.error('Failed to copy emails:', err));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = emailList;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showAlert('Emails copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Failed to copy emails', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const showAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '20px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.backgroundColor = '#4CAF50';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  };

  const handleCopyEmail = (email) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email)
        .then(() => showAlert(`Copied: ${email}`))
        .catch(err => console.error('Failed to copy email:', err));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showAlert(`Copied: ${email}`);
      } catch (err) {
        console.error('Fallback: Failed to copy email', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const filteredEmployees = Object.keys(employeesByDepartment).reduce((result, departmentName) => {
    const employees = employeesByDepartment[departmentName];
    
    // Filter employees based on role and search term
    const filteredEmployees = employees.filter(employee =>
      (filterRole === '' || 
      (filterRole === 'is_HOD' && employee.is_HOD) || 
      (filterRole === 'is_admin' && employee.is_admin)) &&
      (
        // Search by employee number (ID)
        String(employee.employee_number).includes(searchTerm) ||
        // Search by name
        employee.name.toLowerCase().includes(searchTerm) ||
        // Search by contact number
        employee.contact_number && employee.contact_number.toLowerCase().includes(searchTerm) ||
        // Search by email
        employee.email && employee.email.toLowerCase().includes(searchTerm) ||
        // You can add more filters here as needed
        employee.position.toLowerCase().includes(searchTerm) ||
        employee.company.toLowerCase().includes(searchTerm)
      )
    );
  
    if (filteredEmployees.length > 0) {
      // Special handling for BOD department
      if (departmentName === 'BOARD OF DIRECTOR (BOD)') {
        result[departmentName] = filteredEmployees;  // Keep BOD employees as they are
      } else {
        // Sort by is_HOD, is_admin, and employee_number
        filteredEmployees.sort((a, b) => {
          // Sort by is_HOD first, then is_admin
          if (a.is_HOD && !b.is_HOD) return -1;
          if (!a.is_HOD && b.is_HOD) return 1;
          if (a.is_admin && !b.is_admin) return -1;
          if (!a.is_admin && b.is_admin) return 1;
          
          // If employee_number is a string, use localeCompare for alphabetical order
          if (typeof a.employee_number === 'string' && typeof b.employee_number === 'string') {
            return a.employee_number.localeCompare(b.employee_number);
          }
          
          // If employee_number is numeric, perform numeric sorting
          return a.employee_number - b.employee_number;
        });
        result[departmentName] = filteredEmployees;
      }
    }
  
    return result;
  }, {});
  
  

  const filteredDepartments = departments
  .filter(department =>
    department.name !== 'Management Team' && 
    (selectedDepartment === '' || selectedDepartment === department.name) &&
    Object.keys(filteredEmployees).includes(department.name)
  );

  const filteredEmployeesByDepartment = filteredDepartments.map(department => ({
    department,
    employees: filteredEmployees[department.name] || []
  }));

  const departmentOptions = departments
  .filter(department => department.name !== 'Management Team')
  .map(department => (
    <option key={department.name} value={department.name}>
      {department.name}
    </option>
  ));

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      {loading && <OrbitProgress variant="split-disc" dense color="#f79100" size="large" text="" textColor="" />}
    </div>
  );

  if (error) return <p style={{ color: 'black' }}>We are currently undergoing maintenance. We appreciate your patience and kindly ask you to try again later. Thank you for your understanding.</p>;

  return (
    <div className="contact-list">
      <BOD />

<h1 id="contactList-h1">Contact List</h1>
      {latestCreated && latestUpdated && (
        <div className="latest-employee">
          <div className="text_lastest">
            <h2>Latest Employee Record</h2>
            <div className="record-created">
              <p>
                <strong>Created:</strong> {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(latestCreated).replace(/\s/g, '-')}
              </p>
            </div>
            <div className="record-updated">
              <p>
                <strong>Updated:</strong> {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(latestUpdated).replace(/\s/g, '-')}
              </p>
            </div>
          </div>
          <div className="mail_all_staff">
            <button onClick={handleCopyEmails} className="copy-email-btn">
              {selectedDepartment ? `Copy All Emails By ${selectedDepartment}` : 'Copy All Emails'}
            </button>
          </div>
        </div>
      )}


      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID Name Position Email..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="dropdown-container-department">
        <select
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departmentOptions}
        </select>
      </div>

      <div className="filter-buttons">
        <button onClick={() => handleRoleFilterChange('')} className={filterRole === '' ? 'active' : ''}>
          Show All Staff
        </button>
        <button onClick={() => handleRoleFilterChange('is_HOD')} className={filterRole === 'is_HOD' ? 'active' : ''}>
          Show HODs
        </button>
        <button onClick={() => handleRoleFilterChange('is_admin')} className={filterRole === 'is_admin' ? 'active' : ''}>
          Show Admins
        </button>
      </div>

      

      <div className="table-container">
        <table id="contactTable">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Contact Number</th>
              <th>Mail Address</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployeesByDepartment.length > 0 ? (
              filteredEmployeesByDepartment.map(departmentData => (
                <React.Fragment key={departmentData.department.id}>
                  <tr className="section-header">
                    <td colSpan="7">{departmentData.department.name}</td>
                  </tr>
                  {departmentData.employees.length > 0 ? (
                    departmentData.employees.map((employee, index) => (
                      <tr key={employee.id}>
                        <td id='center'>{index + 1}</td>
                        <td>
                          {departmentData.department.name !== 'BOARD OF DIRECTOR' && employee.employee_number != null
                            ? String(employee.employee_number).padStart(4, '0')
                            : ''}
                        </td>
                        <td  style={{textAlign:'left'}}>{employee.name}</td>
                        <td id='center'>{employee.position}</td>
                        <td id="center" style={{ whiteSpace: 'nowrap' }}>
                          {employee.contact_number || 'N/A'}
                        </td>
                        <td  style={{textAlign:'left'}}>
                          {employee.email ? (
                            <>
                              <a
                                href={`mailto:${employee.email}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCopyEmail(employee.email);
                                }}
                              >
                                {employee.email}
                              </a>
                            </>
                          ) : 'N/A'}
                        </td>
                        <td id="center">{employee.company || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7">No employees found in this department</td></tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr><td colSpan="7">No employees found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showGoToTop && (
        <button className="go-to-top" onClick={scrollToTop}>⬆</button>
      )}
    </div>
  );
};

export default ContactList;
