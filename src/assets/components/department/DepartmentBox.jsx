import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DepartmentBox = ({ departmentName, options = [] }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newSelectedUrl = event.target.value;
    const option = options.find(option => option.url === newSelectedUrl);
    setSelectedOption(option);

    if (newSelectedUrl && newSelectedUrl !== "") {
      if (newSelectedUrl.startsWith('/')) {
        navigate(newSelectedUrl);
      } else {
        window.open(newSelectedUrl, '_blank', 'noopener,noreferrer');
      }
    }

    setIsOpen(false); // Close the dropdown after selection
  };

  // Handlers for mouse events
  const handleMouseEnter = () => {
    setIsOpen(true); // Open the dropdown on hover
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Close the dropdown when the mouse leaves
  };

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
            {isOpen && ( // Show dropdown when isOpen is true
              <div className="dropdown-menu">
                {options.map(option => (
                  <button 
                    key={option.id} 
                    onClick={() => handleChange({ target: { value: option.url } })}>
                    {option.name}
                  </button>
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
