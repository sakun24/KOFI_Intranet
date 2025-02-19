import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCogs, faSmile, faUserTie, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import "./CoreValue.css";

const CoreValue = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Trigger animations only when component loads
  }, []);

  return (
    <div id="core_value">
    {[
      { text: "PRODUCTIVITY", value:"(Effective+Efficient, Output>Input)", icon: faLightbulb },
      { text: "INNOVATION",value:"(New Idea + Practiced + Added Value)", icon: faCogs },
      { text: "CUSTOMER SATISFACTION",value:"(Result>Expected)", icon: faSmile },
      { text: "PROFESSIONALISM",value:"(K10%, S20%, A60%)", icon: faUserTie },
      { text: "INTEGRITY",value:"(Say=Done)", icon: faShieldAlt },
    ].map((box, index) => (
      <motion.div
        key={index}
        className="coreValue_box"
        initial={{ opacity: 0, y: 30, scale: 1 }} // Initial state with normal size
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        whileInView={{ scale: 1.05 }} // Enlarge when the element is in view
        exit={{ scale: 1 }} // Return to normal size when out of view
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          delay: index * 0.2,
        }}
      >
        <div className="coreValue_box_line">
          <div>{box.text}</div>
          <div>
            <FontAwesomeIcon icon={box.icon} className="icon-spacing" />
          </div>
        </div>
        <div className="coreValue_box_value">{box.value}</div>
      </motion.div>
    ))}
  </div>
  
  );
};

export default CoreValue;
