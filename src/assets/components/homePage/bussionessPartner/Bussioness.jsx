import React from 'react';
import './bussioness.css';

// Import images with the correct relative path
import item1 from '../../../images/bussionessPartners/Frame 1.svg';
import item2 from '../../../images/bussionessPartners/Frame 2.svg';
import item3 from '../../../images/bussionessPartners/Frame 3.svg';
import item4 from '../../../images/bussionessPartners/Frame 4.svg';
import item5 from '../../../images/bussionessPartners/Frame 5.svg';
import item6 from '../../../images/bussionessPartners/Frame 6.svg';
import item7 from '../../../images/bussionessPartners/Frame 7.svg';
import item8 from '../../../images/bussionessPartners/Frame 8.svg';
import item9 from '../../../images/bussionessPartners/Frame 9.svg';
import item10 from '../../../images/bussionessPartners/Frame 10.svg';
import item11 from '../../../images/bussionessPartners/Frame 11.svg';
import item12 from '../../../images/bussionessPartners/Frame 12.svg';
import item13 from '../../../images/bussionessPartners/Frame 13.svg';
import item14 from '../../../images/bussionessPartners/Frame 14.svg';
import item15 from '../../../images/bussionessPartners/Frame 15.svg';
import item16 from '../../../images/bussionessPartners/Frame 16.svg';
import item17 from '../../../images/bussionessPartners/Frame 17.svg';

const imagePaths = [
  item1, item2, item3, item4, item5,
  item6, item7, item8, item9, item10,
  item11, item12, item13, item14, item15,
  item16, item17
];

function Bussioness() {
  return (
    <div className="wrapper2">
      <div className="image-container image-container-left">
        {imagePaths.map((image, index) => (
          <div key={index} className={`items item${index + 1}`}>
            <img src={image} alt="" />
          </div>
        ))}
        {imagePaths.map((image, index) => (
          <div key={index + imagePaths.length} className={`items item${index + 1}`}>
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bussioness;
