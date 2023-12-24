
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactAdmin.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSearch,
  faBars,
  faHourglass
} from "@fortawesome/free-solid-svg-icons";
import UpdateContact from "./UpdateContact";
import { Link } from 'react-router-dom';

function Contacted() {
  const navigate = useNavigate();
  const location = useLocation();

  const [contactData, setContactData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidePanel, setShowSidePanel] = useState(true);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
    const sidePanel = document.querySelector('.sidePanelAll');
    sidePanel.classList.toggle('active'); // Toggle the 'active' class
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const apiUrl = searchTerm
          ? `http://localhost:8000/api/account/contact-us/?search=${searchTerm}`
          : "http://localhost:8000/api/account/contact-us/?waiting_list=False";

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();

          console.log("Received data:", data);

          if (Array.isArray(data.results)) {
            setContactData(data.results);
          } else {
            console.error("Invalid contact data format. Expected an array.");
            console.log("Received data:", data);
            setContactData([]); // Set contactData to an empty array in case of invalid data
          }
        } else {
          console.error("Failed to fetch contact data");
        }
      } catch (error) {
        console.error("Error during contact data fetch:", error);
      }
    };

    fetchContactData();
  }, [searchTerm]);

  console.log("Rendering with contactData:", contactData);

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };
 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddNewClick = () => {
    navigate("/add-contact");
  };
  const handleUpdateClick = (id) => {
    navigate(`/update-contact/${id}`);
  };
  const handleShowContacted = () => {
    navigate('/contact-admin'); // Navigate to the '/contacted' route
  };

  console.log("Rendering with contactData:", contactData);
  
  return (
    <div className="ContactAdmin-main">
      <header className="dashboard-header">
        <div className="user-info">
          <span>CONTACT US</span>
        </div>
        <div className="header-buttons">
        <button className="menu-button" onClick={toggleSidePanel}>
          <FontAwesomeIcon icon={faBars} /> {/* Use appropriate icon */}
        </button>
          {/* <button onClick={handleChangePassword}>Change Password</button> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="mainContainerAdmin">
        <div className="sidePanelAll"  style={{ display: showSidePanel ? 'block' : 'none' }}>
          <h3>Accounts</h3>
          <ul>
            <li
              onClick={() => navigate("/contact-admin")}
              className={location.pathname === "/contact-admin" ? "active" : ""}
            >
              Contact Us
            </li>
            <li
              onClick={() => navigate("/offices-admin")}
              className={location.pathname === "/offices-admin" ? "active" : ""}
            >
              Offices
            </li>
            <li
              onClick={() => navigate("/people-admin")}
              className={location.pathname === "/people-admin" ? "active" : ""}
            >
              Brokers
            </li>
            <li
              onClick={() => navigate("/propertyType-admin")}
              className={
                location.pathname === "/propertyType-admin" ? "active" : ""
              }
            >
              Property Types
            </li>
            <li
              onClick={() => navigate("/properties-admin")}
              className={
                location.pathname === "/properties-admin" ? "active" : ""
              }
            >
              Properties
            </li>
            <li
              onClick={() => navigate("/salesType-admin")}
              className={
                location.pathname === "/salesType-admin" ? "active" : ""
              }
            >
              Sale Types
            </li>
            <li
              onClick={() => navigate("/sign-up-admin")}
              className={location.pathname === "/sign-up-admin" ? "active" : ""}
            >
              Sign Up
            </li>
          </ul>
        </div>
        <div className="contactContent" style={{height:'fit-content', gap:'20px'}}>
          <div className="contactAdminCon1">
            <h4>Select contact us to change</h4>
            <div style={{marginRight:'0px'}}>
            <button  onClick={handleShowContacted}>
              <FontAwesomeIcon icon={faHourglass} className="icon-add" />
              Waiting
            </button>
            <button onClick={handleAddNewClick}>
              <FontAwesomeIcon icon={faPlusCircle} className="icon-add" />
              Add Contact Us
            </button>
            </div>
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                </tr>
              </thead>
              <tbody className="adminTbody">
              {contactData.map((contact) => (
  <tr key={contact.id}>

    <td className="adminTdlink">
        
      <Link to={`/update-contact/${contact.id}`} className="adminTdlink">{contact.id}</Link>
        </td>
    <td className="adminTd">{contact.first_name}</td>
    <td className="adminTd">{contact.last_name}</td>
    <td className="adminTd">{contact.email}</td>
    
    <td className="adminTd">{contact.created_at}</td>
    <td className="adminTd">{contact.updated_at}</td>
  </tr>
))}
              </tbody>
              {searchTerm && contactData.length === 0 && (
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
  );
}

export default Contacted;
