import React from 'react'
// import './OfficeInfo.css';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
const PropertyInfo = ({ property }) => (
  
    <div className="office-info" style={{border:'0'}}>
        <div className='row-office'>
            <h5 style={{fontSize:'0.7rem'}}>{property.name}</h5>
        </div>

  </div>
  );


export default PropertyInfo