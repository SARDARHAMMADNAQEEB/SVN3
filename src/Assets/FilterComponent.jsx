// FilterComponent.jsx

import React from 'react';
import './FilterComponent.css';
function FilterComponent({ specialties, selectedSpecialties, handleCheckboxChangeSpecialties, handleSelectAll, handleSelectNone }) {
  return (
    <div className="filterSection">
      {specialties.map((mainSpecialty) => (
        <div key={mainSpecialty.heading} className="specialtyContainer">
          <div className="mainSpecialty">{mainSpecialty.heading}</div>
          <div className="sectionLinks">
            <a className="All" onClick={() => handleSelectAll(mainSpecialty.subSpecialties)}>All</a>
            <a className="None" onClick={() => handleSelectNone(mainSpecialty.subSpecialties)} >None</a>
          </div>
          <div className="subSpecialties">
            {mainSpecialty.subSpecialties.map((subSpecialty) => (
              <div key={subSpecialty}>
                <input
                  id={subSpecialty}
                  type="checkbox"
                  value={subSpecialty}
                  checked={selectedSpecialties.includes(subSpecialty)}
                  onChange={() => handleCheckboxChangeSpecialties(subSpecialty)}
                  className='name-filters'
                />
                <label htmlFor={subSpecialty}>{subSpecialty}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilterComponent;
