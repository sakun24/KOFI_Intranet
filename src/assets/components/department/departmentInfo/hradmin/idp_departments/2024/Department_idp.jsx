import React, { useRef, useEffect } from 'react'; 
import '../../../style.css'; // Import CSS file for styling
import HrIdp from '../../HrIdp';

const links = [
  { id: 1, text: 'Commercial', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gRxdVRvhV4DPHBzC?e=eiZOEn' },
  { id: 2, text: 'Customer Service & Technical Service', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gR44bEJbmusgdTI0?e=62I4sh' },
  { id: 3, text: 'Finance', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gR0AVMGOtZvg1ORH?e=1G5eRv' },
  { id: 4, text: 'HARD', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gR8FhmmjU1iavNoZ?e=1H02Rz' },
  { id: 5, text: 'ITD', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSBgc5VyV9MMqUoR?e=mFfpUc' },
  { id: 6, text: 'Academy', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSF_EBOW91iivPt4?e=FMws3V' },
  { id: 7, text: 'Marketing', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSJOTR54vHmMrzjq?e=Zetm4b' },
  { id: 8, text: 'Operation', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSOd5-uRdUNPRVGr?e=WJWDvg' },
  { id: 9, text: 'Production', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSSZXre9Ngt4Hkqf?e=Jkf1wL' },
  { id: 10, text: 'R&D', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSWnP-kVxDvSJY05?e=yGuhFg' },
  { id: 11, text: 'Sales & Marketing', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSZlBNjuacvo-2Wk?e=vbGYJt' },
  { id: 12, text: 'Sales', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSfkHCIoKZABNINw?e=etAfc5' },
  { id: 13, text: 'Supply Chain', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gSnIsHUymQ6LWAQ7?e=sE3lIG' },
  { id: 14, text: 'Sustainability', url: 'https://1drv.ms/x/s!Ale8kLbGnEA9gShkbs-eN8_qt7p_?e=OuguzQ' },
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

    <h1 ref={linksListRef}> All Departments</h1>
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