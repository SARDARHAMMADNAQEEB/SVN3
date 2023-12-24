import { useState, React, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './AddContact.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddSignup({ signup }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [latestId, setLatestId] = useState(0);
  useEffect(() => {
    if (signup) {
      setName(signup.name || '');
      setEmail(signup.email || '');
      setState(signup.state || '');

    }
  }, [signup]);
  const handleSubmit = async (e, continueEditing, addAnother) => {
    e.preventDefault();
    // console.log('Form submitted!');
    if (!validateForm()) {
      return;
    }
    // const requestData = {
    //   name,
    //   email,
    //   state
    // }
    try {

      const yourAuthToken = localStorage.getItem("token");
      console.log("Authentication Token:", yourAuthToken);
      const response = await axios.post('http://localhost:8000/api/account/signup-admin/',
        {name,email,state},
        {
          headers: {
            Authorization: `Bearer ${yourAuthToken}`,
            // 'Content-Type': 'application/json',
          }
        }
      );
      console.log('SignUp successfull:', response.data);
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
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
          navigate(`/update-signup/${newId}`);

        }
      }

      // Add further handling like updating state or displaying success message
    } catch (error) {
      handleError(error);
      return [];
    }
  };
  const handleError = (error) => {
    if (error.response) {
      console.error("Signup Add failed:", error.response.data);
      toast.error("Form submission failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: "error-toast",
      });
      // Handle specific response status errors
    } else if (error.request) {
      console.error("Signup Add failed:", "No response received");
      // Handle no response error
    } else {
      console.error("Signup Add failed:", error.message);
      // Handle other errors
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      toast.error("Email is required");
      isValid = false;
    }
    if (!name) {
      toast.error("Name is required");
      isValid = false;
    }
    if (!state) {
      toast.error("State is required");
      isValid = false;
    }
    return isValid;
  };
  const clearFormFields = () => {
    setEmail("");
    setName("");
    setState("");
  }
  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className='ContactAdmin-main'>
      <header className="dashboard-header">
        <div className="user-info">
          <span>ADD NEW SIGN UP</span>
        </div>
        <div className="header-buttons">
          <button onClick={handleChangePassword}>Change Password</button>
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
        <div className='contactContent' >
          <div className='contactAdminCon1'>
            <h4 >Add sign ups account</h4>
          </div>
          <div className='contactAdcon2'>
          <form className='contactAdForm' method='POST' onSubmit={(e) => handleSubmit(e, false, false)}>

              <label className='contactAdLabel'>
                <span className='fn-span'>Name:</span>
                <input className='fn-contactAd' type='text' name='name' value={name}
                  // onChange={handleChange}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className='contactAdLabel'>
                <span className='fn-span'>Email:</span>
                <input className='fn-contactAd' type='email' name='email' value={email}
                  onChange={(e) => setEmail(e.target.value)}
                // onChange={handleChange}
                />
              </label>



              <label className='contactAdLabel'>
                <span className='fn-span'>State:</span>
                <input className='fn-contactAd' type='text' name='state' value={state}
                  // onChange={handleChange}
                  onChange={(e) => setState(e.target.value)}
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


  )
}

export default AddSignup