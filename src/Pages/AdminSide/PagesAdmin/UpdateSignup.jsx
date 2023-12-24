import { useState, React, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddContact.css";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UpdateSignup() {
  const { id } = useParams();
  const [latestId, setLatestId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const locations = useLocation();
  const [signup, setSignup]=useState({
    name:"",
    email:"",
    state:""
  });
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [state, setState]=useState("");
  const token = localStorage.getItem('token'); // Replace with your actual storage key
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  
  useEffect(()=>{
    const fetchSignup=async()=>{
      try{
        const response=await axios.get(
          `http://localhost:8000/api/account/signup-admin/${id}`,{headers}
        );
        console.log("Fetched data: ", response.data);
        if(response.data){
          const{
            name,
            email,
            state
        }=response.data;

        setName(name||"");
        setEmail(email||"");
        setState(state||"");
      }
    }catch(error){
      console.error("Error fetching signup: ",error);
    }
  };
  fetchSignup();
},[id]);

const handleDelete=async()=>{
  try{
    await axios.delete(`http://localhost:8000/api/account/signup-admin/${id}/`,{headers});
    toast.success('Signup account deleted successfully');
    clearFormFields();
    navigate(-1);
  } catch(error){
    console.error('Error deleting signup account: ',error);
    toast.error('Error deleting signup');
  }
};

const handleSubmit=async(e, continueEditing,addAnother)=>{
  e.preventDefault();
  if(submitting || !validateForm()){
    return;
  }
  try{
    setSubmitting(true);
    const response=await axios.put(`http://localhost:8000/api/account/signup-admin/${id}/`,{
      name,
      email,
      state
    },{headers});
    console.log('Signup successfully updated: ', response.data);
    if(!addAnother){
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: "success-toast",
        onClose: () => {
          if (!continueEditing) {
            clearFormFields();
            navigate(-1);
          }
        },
      });
    }
    if(continueEditing){
      const updatedResponse= await axios.get(
        `http://localhost:8000/api/account/signup-admin/${id}/`,{headers}
      );
      setSignup(updatedResponse.data);
    }
    if(addAnother){
      const newId=latestId+1;
      clearFormFields();
      const newSignupResponse=await axios.put(
        `http://localhost:8000/api/account/signup-admin/${newId}/`,
        {
          name,
          email,
          state
        },
        {headers}
      );
      console.log('New signup successfully added:', newSignupResponse.data);
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: 'success-toast',
        onClose: () => {
          setLatestId(newId);
          if (continueEditing) {
            const updatedResponse =  axios.get(
              `http://localhost:8000/api/account/signup-admin/${newId}/`, { headers }
            );
            setSignup(updatedResponse.data);
          }
    },
  });
}
}
catch(error){
if(error.response){
  console.error('Signup failed:', error.response.data);
  toast.error("Form submission failed. Please try again.", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
    hideProgressBar: false, // Hide the progress bar
    className: "error-toast",
  });
}
else if(error.request){

  console.error('Signup failed:', 'No response received');
  // Handle no response error
} else {
  console.error('Signup failed:', error.message);
  // Handle other errors
}
}
finally{
  setSubmitting(false);
}
}


  const clearFormFields =()=>{
    setName("");
    setEmail("");
    setState("");
  };
  const validateForm=()=>{
    if(!name||
      !email||
      !state
      ){
        toast.error("Please fill in all fields");
        return false;
      }
      return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };
  return (
    <div>
      <div className='ContactAdmin-main'>
        <header className="dashboard-header">
          <div className="user-info">
            <span>UPDATE SIGNUP</span>
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

              <li onClick={() => navigate('/contact-admin')} className={locations.pathname === '/contact-admin' ? 'active' : ''}>Contact Us</li>
              <li onClick={() => navigate('/offices-admin')} className={locations.pathname === '/offices-admin' ? 'active' : ''}>Offices</li>
              <li onClick={() => navigate('/people-admin')} className={locations.pathname === '/people-admin' ? 'active' : ''}>Brokers</li>
              <li onClick={() => navigate('/propertyType-admin')} className={locations.pathname === '/propertyType-admin' ? 'active' : ''}>Property Types</li>
              <li onClick={() => navigate('/properties-admin')} className={locations.pathname === '/properties-admin' ? 'active' : ''}>Properties</li>
              <li onClick={() => navigate('/salesType-admin')} className={locations.pathname === '/salesType-admin' ? 'active' : ''}>Sale Types</li>
              <li onClick={() => navigate('/sign-up-admin')} className={locations.pathname === '/sign-up-admin' ? 'active' : ''}>Sign Up</li>
            </ul>
          </div>
          <div className='contactContent' >
            <div className='contactAdminCon1'>
              <h4 >Editing Signup</h4>

            </div>
            <div className='contactAdcon2'>
              <form className='contactAdForm' method='POST' onSubmit={handleSubmit}>
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
                  <span className="fn-span">Email:</span>
                  <input
                    className="fn-contactAd"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className='AdButtonCon'>

                  <button className='AdButton-save' onClick={(e) => handleSubmit(e, true, false)}>Save and continue editing</button>
                  <button className='AdButton-save-real' value='submit' name='submit' type='submit' onClick={(e) => handleSubmit(e, false, false)}>Save</button>
                  <button onClick={handleDelete} className='AdButton-delete'>Delete</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UpdateSignup