import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './KposPage.css';

const BASE_URL = 'http://192.168.123.90:8080';

const KposPage = () => {
  const location = useLocation();
  const { encodedDepartmentId, name, kpos: initialKpos } = location.state;

  // Decode the department ID
  const decodedDepartmentId = atob(encodedDepartmentId);

  const [departmentName, setDepartmentName] = useState(name);
  const [kpos, setKpos] = useState(initialKpos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newKpo, setNewKpo] = useState({
    kpo_desc: '',
    bsc: '',
    status: '',
    kpi_desc: '',
    time_frame: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKpoId, setCurrentKpoId] = useState(null);

  useEffect(() => {
    console.log('Decoded Department ID:', decodedDepartmentId);
    setLoading(false);
  }, [decodedDepartmentId]);

  // Handle the creation of a new KPO
  const handleCreateKpo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/departments/${decodedDepartmentId}/kpos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newKpo),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create KPO');
      }

      const newKpoData = await response.json();
      setKpos((prevState) => [...prevState, newKpoData]);
      setIsModalOpen(false);
      setNewKpo({
        kpo_desc: '',
        bsc: '',
        status: '',
        kpi_desc: '',
        time_frame: '',
      });
    } catch (error) {
      console.error('Error creating KPO:', error.message);
      setError('Error creating KPO. Please Refresh the page and try again');
    }
  };

  // Handle the update of an existing KPO
  const handleUpdateKpo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/departments/${decodedDepartmentId}/kpos/${currentKpoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newKpo),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update KPO');
      }

      const updatedKpoData = await response.json();
      const updatedKpos = kpos.map((kpo) =>
        kpo.id === currentKpoId ? { ...kpo, ...updatedKpoData } : kpo
      );
      setKpos(updatedKpos);
      setIsModalOpen(false);
      setNewKpo({
        kpo_desc: '',
        bsc: '',
        status: '',
        kpi_desc: '',
        time_frame: '',
      });
    } catch (error) {
      console.error('Error updating KPO:', error.message);
      setError('Error updating KPO. Please Refresh the page and try again');
    }
  };

  // Handle the deletion of a KPO
  const handleDeleteKpo = async (kpoId) => {
    try {
      // Confirmation dialog before deletion
      const isConfirmed = window.confirm('Are you sure you want to delete this KPO?');
      if (!isConfirmed) {
        return; // Exit if the user cancels
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/departments/${decodedDepartmentId}/kpos/${kpoId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete KPO');
      }

      // Update the state to remove the deleted KPO
      setKpos(kpos.filter((kpo) => kpo.id !== kpoId));
    } catch (error) {
      console.error('Error deleting KPO:', error.message);
      setError('Error deleting KPO');
    }
  };

  // Handle input change for new KPO data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKpo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Open the modal for creating or editing a KPO
  const openModal = (kpoId = null) => {
    if (kpoId) {
      const kpoToEdit = kpos.find((kpo) => kpo.id === kpoId);
      setCurrentKpoId(kpoId);
      setNewKpo({
        kpo_desc: kpoToEdit.kpo_desc,
        bsc: kpoToEdit.bsc,
        status: kpoToEdit.status,
        kpi_desc: kpoToEdit.kpi_desc,
        time_frame: kpoToEdit.time_frame,
      });
    } else {
      setNewKpo({
        kpo_desc: '',
        bsc: '',
        status: '',
        kpi_desc: '',
        time_frame: '',
      });
      setCurrentKpoId(null);
    }
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Display loading or error states
  if (loading) {
    return <div>Loading KPIs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dpl-kpos-page-container">
      <h2 className="dpl-department-header">KPIs for Department: {departmentName}</h2>
      <button onClick={() => openModal()} className="dpl-kpo-create-button">
        Create New KPO
      </button>
      <div className="dpl-kpos-table-container">
        <table className="dpl-kpos-table">
          <thead>
            <tr className="kpoHeader">
              <th>No</th>
              <th>KPO Description</th>
              <th>KPI Description</th>
              <th>BSC</th>
              <th>Status (%)</th>
              <th>Time Frame</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kpos.map((kpo, index) => (
              <tr key={kpo.id}>
                <td>{index + 1}</td>
                <td>{kpo.kpo_desc}</td>
                <td>{kpo.kpi_desc}</td>
                <td>{kpo.bsc}</td>
                <td>{kpo.status}%</td>
                <td>{kpo.time_frame}</td>
                <td>
                  <button onClick={() => openModal(kpo.id)} className="dpl-update-button">
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteKpo(kpo.id)}
                    className="dpl-delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="dpl-modal-overlay">
          <div className="dpl-modal">
            <h3>{currentKpoId ? 'Update KPO' : 'Create New KPO'}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                currentKpoId ? handleUpdateKpo() : handleCreateKpo();
              }}
              className="dpl-form"
            >
              <dl>
                <dt>KPO Description:</dt>
                <dd>
                  <input
                    className="dpl-input"
                    name="kpo_desc"
                    value={newKpo.kpo_desc}
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </dd>
                <dt>KPI Description:</dt>
                <dd>
                  <textarea
                    className="dpl-textarea"
                    name="kpi_desc"
                    value={newKpo.kpi_desc}
                    rows="5"
                    placeholder="Use bullets for different points"
                    onChange={handleInputChange}
                    required
                  />
                </dd>
                <dt>BSC:</dt>
                <dd>
                  <select
                    className="dpl-input"
                    name="bsc"
                    value={newKpo.bsc}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Our Business">Our Business</option>
                    <option value="Our Process">Our Process</option>
                    <option value="Our Customer">Our Customer</option>
                    <option value="Our People">Our People</option>
                  </select>
                </dd>
                <dt>Status:</dt>
                <dd>
                  <input
                    className="dpl-input"
                    name="status"
                    value={newKpo.status}
                    type="number"
                    min="0"
                    onChange={handleInputChange}
                    required
                  />
                </dd>
                <dt>Time Frame:</dt>
                <dd>
                  <input
                    className="dpl-input"
                    name="time_frame"
                    value={newKpo.time_frame}
                    type="date"
                    onChange={handleInputChange}
                    required
                  />
                </dd>
              </dl>
              <button type="submit" className="dpl-submit-button">
                {currentKpoId ? 'Update' : 'Create'}
              </button>
            </form>
            <button onClick={closeModal} className="dpl-close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KposPage;