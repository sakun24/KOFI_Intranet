import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';
import './DepartmentList.css';

const BASE_URL = 'http://192.168.123.90:8080'; // Base URL for API requests

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]); // List of departments
  const [loading, setLoading] = useState(true); // Loading state for departments
  const [error, setError] = useState(null); // Error state for departments and login
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Selected department
  const [password, setPassword] = useState(''); // Password entered by the user
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Login loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Fetch departments on component mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/departments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching departments: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetching departments failed: ', error);
        setError('Error fetching departments');
        setLoading(false);
      });
  }, []);

  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setError(null); // Reset error state
    setIsModalOpen(true); // Open the login modal
  };

  // Handle login
  const handleLogin = async () => {
    if (!selectedDepartment) {
      setError('Please select a department');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    setIsLoggingIn(true); // Show loading spinner for login
    try {
      // Login API request
      const loginResponse = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department_name: selectedDepartment.department_name, // Use department_name from selected department
          password, // Use entered password
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }

      const loginData = await loginResponse.json();
      localStorage.setItem('authToken', loginData.token); // Ensure the token is stored with the correct key

      // Create a long string for encoding
      const longString = selectedDepartment.id;
      // const longString = selectedDepartment?.id ? selectedDepartment.id.toString().repeat(10) : '';
      // const currentDateTime = new Date().toISOString(); // Get current datetime in ISO format
      // const stringWithDateTime = longString + currentDateTime; // Append datetime to the department ID string
      // const encodedDepartmentId = btoa(stringWithDateTime);
      const encodedDepartmentId = btoa(longString);

      // Fetch KPO data after successful login
      const kpoResponse = await fetch(`${BASE_URL}/api/v1/departments/${selectedDepartment.id}/kpos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loginData.token}`, // Include the token in the request header
        },
      });

      if (!kpoResponse.ok) {
        throw new Error('Error fetching KPO data');
      }

      const kpoData = await kpoResponse.json();
      console.log('KPO Data:', kpoData); // Log KPO data for debugging

      // Navigate to KPO page, but pass the encoded department ID in the URL
      navigate(`/landing/v1/department/${encodedDepartmentId}/kpos`, {
        state: {
          encodedDepartmentId, // Pass the encoded department ID in state
          name: selectedDepartment.department_name,
          kpos: kpoData, // Pass the KPO data to the next page
        },
      });
    } catch (error) {
      console.error('Login or KPO fetch failed:', error);
      setError(error.message);
    } finally {
      setIsLoggingIn(false); // Hide the spinner after login
    }
  };

  // Loading spinner for fetching departments
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <OrbitProgress variant="split-disc" dense color="#f79100" size="large" />
      </div>
    );
  }

  // Error state for fetching departments
  if (error && !selectedDepartment) {
    return <div className="error-message">{error}</div>;
  }

  // Modal Close Handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null); // Clear selected department when closing the modal
    setPassword(''); // Clear the password field
    setError(null); // Reset error
  };

  return (
    <div className="dpl-department-list-container">
      <h2 className="dpl-h2">WELCOME TO DATA DASHBOARD ENTRY</h2>
      {/* Department list */}
      <div className="dpl-department-list-boxes">
        {departments.map((department) => (
          <div
            key={department.id}
            className={`dpl-department-box ${selectedDepartment?.id === department.id ? 'dpl-selected-box' : ''}`}
            onClick={() => handleDepartmentSelect(department)}
          >
            {department.department_name}
          </div>
        ))}
      </div>

      {/* Modal for login */}
      {isModalOpen && (
        <div className="dpl-modal-overlay">
          <div className="dpl-modal-container">
            <div className="dpl-modal-header">
              <h3 className="dpl-login-heading">Login to {selectedDepartment?.department_name}</h3>
              <button className="dpl-modal-close" onClick={closeModal}>X</button>
            </div>
            <div className="dpl-modal-body">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="dpl-password-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button style={{width: '20%',}}
                type="button"
                className="dpl-toggle-password"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? 'Hide Password' : 'Show Password'}
              </button>
              
              <button
                className="dpl-login-button"
                onClick={handleLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
              {error && <div className="dpl-error">{error}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
