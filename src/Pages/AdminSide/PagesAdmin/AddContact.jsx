import {useState,React, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './AddContact.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function AddContact({ contact }) {
    
  const navigate = useNavigate();
  const location = useLocation();

 

  const [firstname, setFirstName] = useState(null);
  const [secondname, setSecondName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [message, setMessage] = useState(null);
  const [waitingList, setWaitingList] = useState(false);
  useEffect(() => {
    if (contact) {
      setFirstName(contact.first_name || '');
      setSecondName(contact.last_name || '');
      setEmail(contact.email || '');
      setPhone(contact.phone || '');
      setMessage(contact.message || '');
      setWaitingList(contact.waiting_list !== undefined ? contact.waiting_list : false);
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
 
      await new Promise((resolve) => {
        setWaitingList(waitingList);
        resolve();
    });
    const response = await axios.post('http://localhost:8000/api/account/contact-us/', {
      first_name: firstname,
      last_name: secondname,
        email,
        phone,
        message,
        waiting_list: waitingList,
    }, {
       
    });
        console.log('Contact Us successfull:', response.data);
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
        className: "success-toast",
        onClose: () => {
          // scrollToTop();
          clearFormFields();
          navigate(-1);
        },
        });
        // Add further handling like updating state or displaying success message
 } catch (error) {
        if (error.response) {
            console.error('Contact Us failed:', error.response.data);
            toast.error("Form submission failed. Please try again.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
          hideProgressBar: false, // Hide the progress bar
          className: "error-toast",
            });
            // Handle specific response status errors
        } else if (error.request) {
            console.error('Contact Us failed:', 'No response received');
            // Handle no response error
        } else {
            console.error('Contact Us failed:', error.message);
            // Handle other errors
        }
    }
};
useEffect(() => {
  setWaitingList(waitingList);
}, [waitingList]);
const validateForm = () => {
  if (!firstname || !secondname || !email || !phone || !message) {
    toast.error('Please fill in all fields');
    return false;
  }

  // Additional validation logic can be added here

  return true;
};
const clearFormFields = () => {
  setFirstName("");
  setSecondName("");
  setEmail("");
  setPhone("");
  setMessage("");
};

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
};

const handleChangePassword = () => {
    navigate('/change-password');
};
const handleChangeWaitingList = (e) => {
  console.log("Checkbox checked:", e.target.checked);
  setWaitingList(e.target.checked);
};

  return (
    <div className='ContactAdmin-main'>
            <header className="dashboard-header">
                <div className="user-info">
                    <span>ADD NEW CONTACT US</span>
                </div>
                <div className="header-buttons">
                    {/* <button onClick={handleChangePassword}>Change Password</button> */}
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
                        <h4 >Add contact us</h4>
                        
                    </div>
                    <div className='contactAdcon2'>
                        <form className='contactAdForm' method='POST' onSubmit={handleSubmit}>
                            <label className='contactAdLabel'>
                                <span className='fn-span'>First Name:</span>
                                <input className='fn-contactAd' type='tex' name='firstName' value={firstname}
                  // onChange={handleChange}
                  onChange={(e) => setFirstName(e.target.value)}
                  />
                            </label>

                            <label className='contactAdLabel'>
                                <span className='fn-span'>Last Name:</span>
                                <input className='fn-contactAd' type='text' name='lastName' value={secondname}
                                 onChange={(e) => setSecondName(e.target.value)}
                                // onChange={handleChange}
                                />
                            </label>

                            <label className='contactAdLabel'>
                                <span className='fn-span'>Email:</span>
                                <input className='fn-contactAd' type='email' name='email' value={email} 
                                // onChange={handleChange}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            <label className='contactAdLabel'>
                                <span className='fn-span'>Phone:</span>
                                <input className='fn-contactAd' type='number' name='phone' value={phone} 
                                // onChange={handleChange}
                                onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>
                            <label className='contactAdLabel'>
                                <span className='fn-span'>Message:</span>
                               <textarea className='fn-contactAdarea' name='message'  value={message} 
                              //  onChange={handleChange}>
                              onChange={(e) => setMessage(e.target.value)}  >
                               </textarea>
                            </label>
                            <label className='contactAdLabel'>
    <span className='fn-span'>Add to Waiting List:</span>
    <input
        className='fn-contactAd'
        type='checkbox'
        name='waitingList'
        checked={waitingList}
        onChange={handleChangeWaitingList}
    />
</label>


                            <div className='AdButtonCon'>
                              
                                <button className='AdButton-save-real' value='submit' name='submit' type='submit' onClick={handleSubmit}>Save</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                
            </div>
  )
}

export default AddContact