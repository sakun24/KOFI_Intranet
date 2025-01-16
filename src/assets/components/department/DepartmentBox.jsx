import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DepartmentBox = ({ departmentName, options = [], handleChange }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div 
      className="department-box" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} // Event handlers for hover
    >
      <h2>{departmentName}</h2>
      <div className="dropdown-container">
  {options.length > 0 ? (
    <>
      <button className="dropdown-toggle">Select an option</button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div key={option.id} className="dropdown-item">  {/* Ensure this is added */}
              <button 
                onClick={() => handleChange({ target: { value: option.url } })}>
                {option.name}
              </button>
              {option.subOptions && (
                <div className="sub-dropdown">
                  {option.subOptions.map((subOption) => (
                    <a
                      key={subOption.id}
                      href={subOption.url}
                      className="dropdown-sub-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {subOption.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  ) : (
    <p className="dropdown-noop">No options available</p>
  )}
</div>



      {/* {selectedOption && (
        <p className="opening-message">
          You are opening<br />
          <a href={selectedOption.url} target='_blank' rel='noopener noreferrer'>{selectedOption.name}</a><br />
          Click the link to see.
        </p>
      )} */}
    </div>
  );
};

export default DepartmentBox;
