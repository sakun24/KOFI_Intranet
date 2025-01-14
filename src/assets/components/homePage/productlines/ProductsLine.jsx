import React from 'react';
import './productsline.css';

// Import images with the correct relative path
import item1 from '../../../images/productLines/item1.png';
import item2 from '../../../images/productLines/item2.webp';
import item3 from '../../../images/productLines/item3.png';
import item4 from '../../../images/productLines/item4.png';
import item5 from '../../../images/productLines/item5.png';
import item6 from '../../../images/productLines/item6.png';
import item7 from '../../../images/productLines/item7.png';
import item8 from '../../../images/productLines/item8.png';
import item9 from '../../../images/productLines/item9.png';
import item10 from '../../../images/productLines/item10.png';
import item11 from '../../../images/productLines/item11.webp';
import item12 from '../../../images/productLines/item12.png';
import item13 from '../../../images/productLines/item13.png';
import item14 from '../../../images/productLines/item14.png';
import item15 from '../../../images/productLines/item15.png';
import item16 from '../../../images/productLines/item16.png';
import item17 from '../../../images/productLines/item17.png';
import item18 from '../../../images/productLines/item18.png';
import item19 from '../../../images/productLines/item19.png';
import item20 from '../../../images/productLines/item20.png';
import item21 from '../../../images/productLines/item21.png';
import item22 from '../../../images/productLines/item22.webp';
import item23 from '../../../images/productLines/item23.webp';
import item24 from '../../../images/productLines/item24.webp';
import item25 from '../../../images/productLines/item25.webp';
import item26 from '../../../images/productLines/icehot.jpg';

const imagePaths = [
  item1, item2, item3,
  item6, item7, item8, item9, item10,item26,
  item11, item12, item13, item14, item15,
  item16, item17, item18, item19, item20,
  item21, item22, item23, item24, item25,
];

function ProductsLine() {
  return (
    <div className="wrapper">
      <div className="image-containers">
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

export default ProductsLine;
