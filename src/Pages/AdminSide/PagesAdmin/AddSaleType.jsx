import { useState, React, useEffect } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";
import "./AddContact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddSaleType(saleType) {
    const navigate = useNavigate();
    const locations = useLocation();
  const [name, setName]=useState("");
  const [latestId, setLatestId]=useState(0);

  useEffect(()=>{
    if(saleType){
        setName(saleType.name || "");
    }
},[saleType]);
const handleSubmit = async (e, continueEditing, addAnother) => {
    e.preventDefault();
    if(!validateForm()){
        return;
    }
    const requestData={
        name
    };

    try{
        const yourAuthToken=localStorage.getItem("token");
        console.log("Authentication Token: ",yourAuthToken);

        console.log("Data before Submission: ",requestData);
        const response=await axios.post(
            "http://localhost:8000/api/account/sale-type/",
            requestData,{
                headers:{
                Authorization:`Bearer ${yourAuthToken}`,
                "Content-Type":"application/json"
                },
            }
        );
        console.log("Sale type add successful:", response.data);
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
        const newId = latestId + 1;
        setLatestId(newId);
        clearFormFields();
        if (continueEditing) {
          navigate(`/update-sale-type/${newId}`);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };




const handleError = (error) => {
    if (error.response) {
      console.error("Sale type add failed:", error.response.data);
      toast.error("Form submission failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: "error-toast",
      });
      // Handle specific response status errors
    } else if (error.request) {
      console.error("Sale type add failed:", "No response received");
      // Handle no response error
    } else {
      console.error("Sale type add failed:", error.message);
      // Handle other errors
    }
  };

const validateForm=()=>{
    const requiredFields=[
        'name'
    ];
    const invalidFields = requiredFields.filter((field) => {
        const value = eval(field); // eslint-disable-line no-eval
        return !value || (Array.isArray(value) && value.length === 0);
      });
    
      if (invalidFields.length > 0) {
        toast.error(`Please fill in or provide valid values for: ${invalidFields.join(', ')}`);
        return false;
      }
    
      return true;
    };

const clearFormFields=()=>{
    setName("");
}

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
        <span>ADD NEW SALE TYPE</span>
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
            className={locations.pathname === "/people-admin" ? "active" : ""}
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
      <div className="contactContent" style={{height:'fit-content'}}>
          <div className="contactAdminCon1">
            <h4>Add Sale Type</h4>
          </div>
          
          <div className="contactAdcon2">
            <form
              className="contactAdForm"
              method="POST"
              onSubmit={handleSubmit}
              style={{height:'fit-content'}}
            >
              <label className="contactAdLabel">
                <span >Name:</span>
                <input
                  // className="fn-contactAd"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{height:'max-content', padding:'10px 10px', width:'25%'}}
                />
              </label>
              <div className="AdButtonCon">
                <button
                  type="button"
                  className="AdButton-save"
                  // style={{
                  //   padding:'10px 10px', backgroundColor:"gray", height:'fit-content'
                  // }}
                  style={{height: 'fit-content', padding:'15px 10px'}}
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
                  style={{height:'fit-content', padding:'15px 15px'}}
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
  )
}

export default AddSaleType