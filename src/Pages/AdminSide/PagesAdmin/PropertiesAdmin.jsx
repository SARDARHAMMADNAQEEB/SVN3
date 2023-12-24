import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactAdmin.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSearch,
  faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import UpdateContact from "./UpdateContact";
import { Link } from 'react-router-dom';
function PropertiesAdmin() {
  const navigate = useNavigate();
  const locations = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyData, setPropertyData] = useState([]);
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const apiUrl = searchTerm
          ? `http://localhost:8000/api/account/open/property/?search=${searchTerm}`
          : "http://localhost:8000/api/account/open/property/";

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();

          console.log("Received data:", data);

          if (Array.isArray(data.results)) {
            setPropertyData(data.results);
          } else {
            console.error("Invalid Property data format. Expected an array.");
            console.log("Received data:", data);
            setPropertyData([]); // Set contactData to an empty array in case of invalid data
          }
        } else {
          console.error("Failed to fetch property data");
        }
      } catch (error) {
        console.error("Error during property data fetch:", error);
      }
    };

    fetchPropertyData();
  }, [searchTerm]);

  console.log("Rendering with officeData:", propertyData);



  const loggedInUser = {
    email: localStorage.getItem('email') || 'admin@example.com',
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangePassword = () => {
    navigate('/change-password');
  };
  const handleAddNewClick = () => {
    navigate("/add-property");
  };
  return (
    <div className='ContactAdmin-main'>
      <header className="dashboard-header">
        <div className="user-info">
          <span>PROPERTIES</span>
        </div>
        <div className="header-buttons">
          {/* <button onClick={handleChangePassword}>Change Password</button> */}
          <a href="/dashboard" style={{color:'#ed6b26', textDecoration:'none'}}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{padding:'0px 5px'}}/>
            Dashboard </a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className='mainContainerAdmin'>
        <div className='sidePanelAll'>
          <h3>Accounts</h3>
          <ul>
            <li onClick={() => navigate('/contact-admin')} className={locations.pathname === '/contact-admin' ? 'active' : ''}>Contact Us</li>
            <li onClick={() => navigate('/offices-admin')} className={locations.pathname === '/offices-admin' ? 'active' : ''}>Offices</li>
            <li onClick={() => navigate('/people-admin')} className={locations.pathname === '/people-admin' ? 'active' : ''}>Brokers</li>
            <li onClick={() => navigate('/propertyType-admin')} className={locations.pathname === '/propertyType-admin' ? 'active' : ''}>Property Types</li>
            <li onClick={() => navigate('/properties-admin')} className={locations.pathname === '/properties-admin' ? 'active' : ''}>Properties</li>
            <li onClick={() => navigate('/salesType-admin')} className={locations.pathname === '/salesType-admin' ? 'active' : ''}>Sale Types</li>
            <li onClick={() => navigate('/sign-up-admin')} className={locations.pathname === '/sign-up-admin' ? 'active' : ''}>Sign Up</li>
          </ul>
        </div>
        <div className="contactContent"style={{height:'fit-content', gap:'20px'}}>
          <div className="contactAdminCon1">
            <h4>Select property to change</h4>
            <button onClick={handleAddNewClick}>
              <FontAwesomeIcon icon={faPlusCircle} className="icon-add" />
              Add property
            </button>
          </div>
          <div className="contactAdminCon2">
            <input
              type="text"
              placeholder="Search"
              className="searchBarAdmin"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="searchAdmin" />
          </div>
          <div className="tableContainer">
            <table className="adminTable">
              <thead className="adminThead">
                <tr>

                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Size</th>

                </tr>
              </thead>
              <tbody className="adminTbody">
                {propertyData.map((property) => (
                  <tr key={property.id}>

                    <td className="adminTdlink">

                      <Link to={`/update-property/${property.id}`} className="adminTdlink">{property.id}</Link>
                    </td>
                    <td className="adminTd">{property.name}</td>
                    <td className="adminTd">{property.price}</td>
                    <td className="adminTd">{property.size}</td>

                  </tr>
                ))}
              </tbody>
              {searchTerm && propertyData.length === 0 && (
                <tfoot>
                  <tr>
                    <td colSpan="5" className="adminTd">No results found</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertiesAdmin