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
        { text: "PRODUCTIVITY", icon: faLightbulb },
        { text: "INNOVATION", icon: faCogs },
        { text: "CUSTOMER SATISFACTION", icon: faSmile },
        { text: "PROFESSIONALISM", icon: faUserTie },
        { text: "INTEGRITY", icon: faShieldAlt },
      ].map((value, index) => (
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
          <div>{value.text}</div>
          <div>
            <FontAwesomeIcon icon={value.icon} className="icon-spacing" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CoreValue;
