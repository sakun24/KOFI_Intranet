import React from 'react';
import { motion } from 'framer-motion';
import './bod.css';

import ceo from '../../../images/bod/CEO.jpg';
import advisor from '../../../images/bod/ADVISOR.jpg';
import cfo from '../../../images/bod/CFO.jpg';
import cto from '../../../images/bod/CTO.jpg';

const BOD = () => {
  return (
    <div className="bod_container">
        <div id="header_bod">BOARD OF DIRECTORS</div>
      <motion.div
        className="image_grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
          hidden: { opacity: 0 },
        }}
      >
        {[
          { src: ceo, alt: 'CEO', position: 'CEO', name: 'CHHEAN Muykhim' },
          { src: advisor, alt: 'Advisor', position: 'Advisor', name: 'HEI Dara' },
          { src: cfo, alt: 'CFO', position: 'CFO', name: 'CHHAY Mony' },
          { src: cto, alt: 'CTO', position: 'CTO', name: 'LAY Phirom' }
        ].map((member, index) => (
          <motion.div
            key={index}
            className="img"
            variants={{
              visible: { opacity: 1, y: 0, rotate: 0 },
              hidden: { opacity: 0, y: 20, rotate: -5 },
            }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img src={member.src} alt={member.alt} />
            <div className="position"><p>{member.position}</p></div>
            <div className="name"><p>{member.name}</p></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BOD;
