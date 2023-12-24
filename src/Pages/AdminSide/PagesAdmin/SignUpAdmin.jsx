import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactAdmin.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SignUpAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [signupData, setSignupData] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchSignupData();
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delaySearch); // Cleanup on component unmount or search term change
  }, [searchTerm]);

  const fetchSignupData = async () => {
    try {
      // setLoading(true);
  
      const yourAuthToken = localStorage.getItem("token");
      const apiUrl = searchTerm
        ? `http://localhost:8000/api/account/signup-admin/?name=${searchTerm}`
        : "http://localhost:8000/api/account/signup-admin/";
  
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${yourAuthToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setSignupData(data.results || []);
      } else {
        console.error(`Failed to fetch signup data. Status: ${response.status}`);
        toast.error("Failed to fetch signup data");
      }
    } catch (error) {
      console.error("Error during signup data fetch:", error);
      toast.error("Error during signup data fetch");
    } finally {
      setLoading(false);
    }
  };
  const loggedInUser = {
    email: localStorage.getItem("email") || "admin@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleAddNewClick = () => {
    navigate("/add-signup");
  };
  return (
    <div className='ContactAdmin-main'>
    <header className="dashboard-header">
      <div className="user-info">
        <span>SIGN UP ACCOUNTS</span>
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
            <h4>Select sign up account to change</h4>
            <button onClick={handleAddNewClick}>
              <FontAwesomeIcon icon={faPlusCircle} className="icon-add" />
              Add sign up
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
            {loading ? (
              <p>Loading...</p>
            ) : (
            <table className="adminTable">
              <thead className="adminThead">
                <tr>
                  
                  <th>ID</th>
                  <th>Name</th>
                  
                  <th>Email</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody className="adminTbody">
              {signupData.map((signup) => (
  <tr key={signup.id}>

    <td className="adminTdlink">
        
      <Link to={`/update-signup/${signup.id}`} className="adminTdlink">{signup.id}</Link>
        </td>
    <td className="adminTd">{signup.name}</td>
    <td className="adminTd">{signup.email}</td>
    <td className="adminTd">{signup.state}</td>
  </tr>
))}
              </tbody>
              {searchTerm && signupData.length === 0 && (
                <tfoot>
                  <tr>
                    <td colSpan="5" className="adminTd">No results found</td>
                  </tr>
                </tfoot>
              )}
            </table>
            )}
          </div>
          </div>
    </div>
  </div>
  )
}

export default SignUpAdmin