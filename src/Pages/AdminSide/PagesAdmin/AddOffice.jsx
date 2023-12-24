import { useState, React, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddContact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddOffice({ office }) {
  const navigate = useNavigate();
  const locations = useLocation();

  const [advisors, setAdvisors] = useState([]);
  const [listing, setListing] = useState([]);
  const [latestId, setLatestId] = useState(0); // Add this line to define latestId

  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip_code, setZipCode] = useState(null);
  const [location, setLocation] = useState(null);
  const [website_link, setWebsiteLink] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    if (office) {
      setName(office.name || "");
      setCountry(office.country || "");
      setCity(office.city || "");
      setState(office.state || "");
      setZipCode(office.zip_code || "");
      setLocation(office.location || "");
      setAdvisors(office.advisors || []);
      setListing(office.listing || []);
      setWebsiteLink(office.website_link || "");
      setLongitude(office.longitude || "");
      setLatitude(office.latitude || "");
    }
  }, [office]);

  const handleSubmit = async (e, continueEditing, addAnother) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const yourAuthToken = localStorage.getItem("token");
      console.log("Authentication Token:", yourAuthToken);

      const response = await axios.post(
        "http://localhost:8000/api/account/office/",
        {
          name,
          country,
          city,
          state,
          zip_code,
          location,
          advisors,
          listing,
          website_link,
          longitude,
          latitude,
        },
        {
          headers: {
            Authorization: `Bearer ${yourAuthToken}`, // Include your authentication token here
          },
        }
      );
      console.log("Office Add successful:", response.data);
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: "success-toast",
        onClose: () => {
          clearFormFields();
          if (!addAnother) {
            navigate(-1);
          }
        },
      });

      if (addAnother) {
        // Remove the code for adding a new office here
        const newId = latestId + 1;
        setLatestId(newId); // Set the latestId
        clearFormFields();
        // Fetch the newly added office for editing if needed
        if (continueEditing) {
          navigate(`/update-office/${newId}`);
        }
      }
    } 
      
     catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      console.error("Office Add failed:", error.response.data);
      toast.error("Form submission failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: "error-toast",
      });
      // Handle specific response status errors
    } else if (error.request) {
      console.error("Office Add failed:", "No response received");
      // Handle no response error
    } else {
      console.error("Office Add failed:", error.message);
      // Handle other errors
    }
  };

  const validateForm = () => {
    if (
      !name ||
      !country ||
      !city ||
      !state ||
      !zip_code ||
      !location ||
      !advisors ||
      !listing ||
      !website_link ||
      !longitude ||
      !latitude
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    // Additional validation logic can be added here

    return true;
  };

  const clearFormFields = () => {
    setName("");
    setCountry("");
    setCity("");
    setState("");
    setZipCode("");
    setLocation("");
    setAdvisors([]); // Set advisors as an empty array
    setListing([]); // Set listing as an empty array
    setWebsiteLink("");
    setLongitude("");
    setLatitude("");
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className="ContactAdmin-main">
      <header className="dashboard-header">
        <div className="user-info">
          <span>ADD NEW OFFICE</span>
        </div>
        <div className="header-buttons">
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="mainContainerAdmin">
        <div className="sidePanelAll">
          <h3>Accounts</h3>
          <ul>
            <li
              onClick={() => navigate("/contact-admin")}
              className={
                locations.pathname === "/contact-admin" ? "active" : ""
              }
            >
              Contact Us
            </li>
            <li
              onClick={() => navigate("/offices-admin")}
              className={
                locations.pathname === "/offices-admin" ? "active" : ""
              }
            >
              Offices
            </li>
            <li
              onClick={() => navigate("/people-admin")}
              className={
                locations.pathname === "/people-admin" ? "active" : ""
              }
            >
              Brokers
            </li>
            <li
              onClick={() => navigate("/propertyType-admin")}
              className={
                locations.pathname === "/propertyType-admin" ? "active" : ""
              }
            >
              Property Types
            </li>
            <li
              onClick={() => navigate("/properties-admin")}
              className={
                locations.pathname === "/properties-admin" ? "active" : ""
              }
            >
              Properties
            </li>
            <li
              onClick={() => navigate("/salesType-admin")}
              className={
                locations.pathname === "/salesType-admin" ? "active" : ""
              }
            >
              Sale Types
            </li>
            <li
              onClick={() => navigate("/sign-up-admin")}
              className={
                locations.pathname === "/sign-up-admin" ? "active" : ""
              }
            >
              Sign Up
            </li>
          </ul>
        </div>
        <div className="contactContent">
          <div className="contactAdminCon1">
            <h4>Add Office</h4>
          </div>
          <div className="contactAdcon2">
            <form
              className="contactAdForm"
              method="POST"
              onSubmit={handleSubmit}
            >
              <label className="contactAdLabel">
                <span className="fn-span">Name:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="contactAdLabel">
                <span className="fn-span">Country:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>

              <label className="contactAdLabel">
                <span className="fn-span">City:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>

              <label className="contactAdLabel">
                <span className="fn-span">State:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Zip Code:</span>
                <input
                  className="fn-contactAd"
                  name="zip_code"
                  type="text"
                  value={zip_code}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Location:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Advisors:</span>
                <input
                  className="fn-contactAd"
                  placeholder="Enter ID of advisor separated by ,"
                  type="text"
                  name="advisors"
                  value={advisors.join(",")}
                  onChange={(e) => setAdvisors(e.target.value.split(","))}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Listings:</span>
                <input
                  className="fn-contactAd"
                  placeholder="Enter IDs of listing separated by ,"
                  type="text"
                  name="listing"
                  value={listing.join(",")}
                  onChange={(e) => setListing(e.target.value.split(","))}
                />
              </label>

              <label className="contactAdLabel">
                <span className="fn-span">Websiter Link:</span>
                <input
                  className="fn-contactAd"
                  type="link"
                  name="website_link"
                  value={website_link}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Longitude:</span>
                <input
                  className="fn-contactAd"
                  type="number"
                  name="longitude"
                  placeholder="-104.0000....."
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Latitude:</span>
                <input
                  className="fn-contactAd"
                  placeholder="39.604555....."
                  type="number"
                  step="0.1"
                  name="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </label>
              <div className="AdButtonCon">
                <button
                  type="button"
                  className="AdButton-save"
                  onClick={async () => {
                    await handleSubmit(
                      { preventDefault: () => {} },
                      false,
                      true
                    );
                  }}
                >
                  Save and add another
                </button>
                <button
                  className="AdButton-save-real"
                  value="submit"
                  name="submit"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOffice;
