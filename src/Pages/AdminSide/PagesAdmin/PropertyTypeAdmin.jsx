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
function PropertyTypeAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [propertyTypeData, setPropertyTypeData] = useState([]);
  
    const loggedInUser = {
      email: localStorage.getItem('email') || 'admin@example.com',
    };
  
    useEffect(() => {
      const fetchPropertyTypeData = async () => {
        try {
          const apiUrl = searchTerm
            ? `http://localhost:8000/api/account/property-type/?name=${searchTerm}`
            : "http://localhost:8000/api/account/property-type/";
  
          console.log("API URL:", apiUrl);
  
          const response = await fetch(apiUrl);
  
          if (response.ok) {
            const data = await response.json();
  
            console.log("Received data:", data);
  
            if (Array.isArray(data.results)) {
              setPropertyTypeData(data.results);
            } else {
              console.error("Invalid property type data format. Expected an array.");
              console.log("Received data:", data);
              setPropertyTypeData([]); // Set contactData to an empty array in case of invalid data
            }
          } else {
            console.error("Failed to fetch property type data");
          }
        } catch (error) {
          console.error("Error during property type data fetch:", error);
        }
      };
  
      fetchPropertyTypeData();
    }, [searchTerm]);
  
    console.log("Rendering with property Type Data:", propertyTypeData);
  

    const handleLogout = () => {
      localStorage.removeItem('email');
      navigate('/login');
    };
    const handleAddNewClick = () => {
      navigate("/add-property-type");
    };
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleChangePassword = () => {
      navigate('/change-password');
    };
  return (
    <div className='ContactAdmin-main'>
    <header className="dashboard-header">
      <div className="user-info">
        <span>PROPERTY TYPES</span>
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
          <li onClick={() => navigate('/contact-admin')} className={location.pathname === '/contact-admin' ? 'active' : ''}>Contact Us</li>
          <li onClick={() => navigate('/offices-admin')} className={location.pathname === '/offices-admin' ? 'active' : ''}>Offices</li>
          <li onClick={() => navigate('/people-admin')} className={location.pathname === '/people-admin' ? 'active' : ''}>Brokers</li>
          <li onClick={() => navigate('/propertyType-admin')} className={location.pathname === '/propertyType-admin' ? 'active' : ''}>Property Types</li>
          <li onClick={() => navigate('/properties-admin')} className={location.pathname === '/properties-admin' ? 'active' : ''}>Properties</li>
          <li onClick={() => navigate('/salesType-admin')} className={location.pathname === '/salesType-admin' ? 'active' : ''}>Sale Types</li>
          <li onClick={() => navigate('/sign-up-admin')} className={location.pathname === '/sign-up-admin' ? 'active' : ''}>Sign Up</li>
        </ul>
      </div>
      <div className="contactContent" style={{height:'fit-content', gap:'20px'}}>
          <div className="contactAdminCon1">
            <h4>Select property type to change</h4>
            <button onClick={handleAddNewClick}>
              <FontAwesomeIcon icon={faPlusCircle} className="icon-add" />
              Add property type
            </button>
          </div>
          <div className="contactAdminCon2" style={{height:'fit-content'}}>
            <input
              type="text"
              placeholder="Search"
              className="searchBarAdmin"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="searchAdmin" />
          </div>
          
          <div className="tableContainer" style={{height:'fit-content'}}>
            <table className="adminTable" style={{height:'fit-content'}}>
              <thead className="adminThead" style={{height:'fit-content'}}>
                <tr>
                  
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody className="adminTbody">
              {propertyTypeData.map((type) => (
  <tr key={type.id}>

    <td className="adminTdlink">
        
      <Link to={`/update-property-type/${type.id}`} className="adminTdlink">{type.id}</Link>
        </td>
    <td className="adminTd">{type.name}</td>
   
  </tr>
))}
              </tbody>
              {searchTerm && propertyTypeData.length === 0 && (
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

export default PropertyTypeAdmin