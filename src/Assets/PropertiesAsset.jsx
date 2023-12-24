import React, {useState} from 'react';
import './PropertiesAsset.css';
function PropertiesAsset() {
    const [search, setSearch] = useState('');
    const [propertyType, setPropertyType] = useState('Any');
    const [state, setState] = useState('Any');
    const [buildingClass, setBuildingClass] = useState([]);
    const [broker, setBroker] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [mapProperties, setMapProperties] = useState([]); // Replace with actual data
    const [selectedProperty, setSelectedProperty] = useState(null);
  
    const handleFilterClick = () => {
      setShowFilters(!showFilters);
    };
  
    const handleResetClick = () => {
      setSearch('');
      setPropertyType('Any');
      setState('Any');
      setBuildingClass([]);
      setBroker('');
    };
  
    return (
      <div className="main-con-prop">
        <div className="header-prop">
          <h1>Properties</h1>
        </div>
  
        <div className="filters">
          <div className="search">
            <input
              type="text"
              placeholder="Search by address, city, zip"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="property-type">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {/* Options for property types */}
            </select>
          </div>
          <div className="state">
            <select value={state} onChange={(e) => setState(e.target.value)}>
              {/* Options for states */}
            </select>
          </div>
          <div className="building-class">
            {/* Checkbox inputs for building class */}
          </div>
          <div className="broker">
            <select value={broker} onChange={(e) => setBroker(e.target.value)}>
              {/* Options for brokers */}
            </select>
          </div>
          <div className="filter-button">
            <button onClick={handleFilterClick}>Filter</button>
            {showFilters && (
              <div className="filter-options">
                {/* Additional filter options like Cap rate, Lease rate, Min to max rate */}
                <button>Apply Filters</button>
              </div>
            )}
          </div>
          <div className="reset-button">
            <button onClick={handleResetClick}>Reset</button>
          </div>
        </div>
  
        <div className="content">
          <div className="map">
            {/* Google Map showing properties */}
          </div>
          <div className="property-cards">
            {mapProperties.map((property, index) => (
              <div
                key={index}
                className={`property-card ${
                  property === selectedProperty ? 'selected' : ''
                }`}
                onClick={() => setSelectedProperty(property)}
              >
                {/* Property card content */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

//   return (
//     <div className='main-con-prop'>
//         <div className='con1-prop'>
//             <h2>Properties</h2>
//         </div>
//     </div>
//   )
// }

export default PropertiesAsset