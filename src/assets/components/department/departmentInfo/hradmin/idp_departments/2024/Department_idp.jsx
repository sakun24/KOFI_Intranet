import React, { useRef, useEffect } from 'react'; 
import '../../../style.css'; // Import CSS file for styling
import HrIdp from '../../HrIdp';

const links = [
  { id: 1, text: 'COMMERCIAL DEPARTMENT (CMD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gRxdVRvhV4DPHBzC?e=eiZOEn' },
  { id: 2, text: 'CUSTOMER & SERVICE DEPARTMENT (TSD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gR44bEJbmusgdTI0?e=62I4sh' },
  { id: 3, text: 'FINANCE DEPARTMENT (FND)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gR0AVMGOtZvg1ORH?e=1G5eRv' },
  { id: 4, text: 'HR AND ADMIN DEPARTMENT (HRAD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gR8FhmmjU1iavNoZ?e=1H02Rz' },
  { id: 5, text: 'INFORMATION TECHNOLOGY DEPARTMENT (ITD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSBgc5VyV9MMqUoR?e=mFfpUc' },
  { id: 6, text: 'KOFI ACADEMY DEPARTMENT (KAD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSF_EBOW91iivPt4?e=FMws3V' },
  { id: 7, text: 'MARKETING DEPARTMENT (MTD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSJOTR54vHmMrzjq?e=Zetm4b' },
  { id: 8, text: 'OPERATION DEPARTMENT (OPD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSOd5-uRdUNPRVGr?e=WJWDvg' },
  { id: 9, text: 'PRODUCTION DEPARTMENT (PRD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSSZXre9Ngt4Hkqf?e=Jkf1wL' },
  { id: 10, text: 'RESEARCH AND DEVELOPMENT DEPARTMENT (R&D)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSWnP-kVxDvSJY05?e=yGuhFg' },
  { id: 11, text: 'SALES AND MARKETING DEPAERMENT (KOONA)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSZlBNjuacvo-2Wk?e=vbGYJt' },
  { id: 12, text: 'SALES DEPARTMENT (SAD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSfkHCIoKZABNINw?e=etAfc5' },
  { id: 13, text: 'SUPPLY CHAIN AND PROCUMENT DEPARTMENT (SPD)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSnIsHUymQ6LWAQ7?e=sE3lIG' },
  { id: 14, text: 'SUSTAINABILITY UNIT DEPARTMENT (CSR)', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gShkbs-eN8_qt7p_?e=OuguzQ' },
];


const Department_idp = () => {
  const linksListRef = useRef(null);

  useEffect(() => {
    if (linksListRef.current) {
      linksListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="links-list">
    <HrIdp/>

    <h1 ref={linksListRef} style={{fontSize: '28px'}}> All Departments</h1>
    <div className="links-container">
      {links.map(link => (
        <a href={link.url} key={link.id} className="link-box" target='_blank'>
          <div className="link-content">
            {link.text}
          </div>
        </a>
      ))}
    </div>
  </div>
  )
}

export default Department_idp