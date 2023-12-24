import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { React, useState, useEffect } from 'react'

function UpdateOffice() {
  const { id } = useParams();
  const [latestId, setLatestId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [office, setOffice] = useState({
    name:'',
    country:'',
    city:'',
    state:'',
    zip_code:'',
    location:'',
    advisors:'',
    listing:'',
    website_link:'',
    longitude:'',
    latitude:'',

  });
  useEffect(() => {
    if (office) {
      setName(office.name || '');
      setCountry(office.country || '');
      setCity(office.city || '');
      setState(office.state || '');
      setZipCode(office.zip_code || '');
      setLocation(office.location || '');
      setAdvisors(office.advisors || []); // Initialize as empty array
      setListing(office.listing || []); // Initialize as empty array
      setWebsiteLink(office.website_link || '');
      setLongitude(office.longitude || '');
      setLatitude(office.latitude || '');
    }
  }, [office]);
  const token = localStorage.getItem('token'); // Replace with your actual storage key
const headers = {
  Authorization: `Bearer ${token}`,
};

//   const [advisors, setAdvisors] = useState([]);
// const [listing, setListing] = useState([]);
  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/account/office/latest-id/',  { headers });
        setLatestId(response.data.latestId);
      } catch (error) {
        console.error('Error fetching latest ID:', error);
      }
    };

    fetchLatestId();
  }, []);

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/account/office/${id}/`, { headers }
        );
        setOffice(response.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchOffice();
  }, [id]);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/account/office/${id}/`, { headers });
      toast.success('Office deleted successfully');
      clearFormFields();
      navigate(-1);

    } catch (error) {
      console.error('Error deleting office:', error);
      toast.error('Error deleting office');
    }
  };
  const navigate = useNavigate();
  const locations = useLocation();

  const [name, setName]=useState(null);
  const [country, setCountry]=useState(null);
  const [city, setCity]=useState(null);
  const [state, setState]=useState(null);
  const [zip_code, setZipCode]=useState(null);
  const [location, setLocation]=useState(null);
  const [advisors, setAdvisors]=useState([]);
  const [listing, setListing]=useState([]);
  const [website_link, setWebsiteLink]=useState(null);
  const [longitude, setLongitude]=useState(null);
  const [latitude, setLatitude]=useState(null);



  
const handleSubmit = async (e, continueEditing, addAnother) => {
  e.preventDefault();
  if (submitting || !validateForm()) {
    return;
  }

  try {
    setSubmitting(true);

    const response = await axios.put(`http://localhost:8000/api/account/office/${id}/`, {
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
    }, { headers });

    console.log('Office successfully updated:', response.data);

    if (!addAnother) {
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

    if (continueEditing) {
      const updatedResponse = await axios.get(
        `http://localhost:8000/api/account/office/${id}/`, { headers }
      );
      setOffice(updatedResponse.data);
    }

    if (addAnother) {
      const newId = latestId + 1;
      clearFormFields();
      const newOfficeResponse = await axios.post(
        `http://localhost:8000/api/account/office/${newId}/`,
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
          latitude
        },
        { headers }
      );
      console.log('New office successfully added:', newOfficeResponse.data);
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: 'success-toast',
        onClose: () => {
          setLatestId(newId);

          // Fetch the newly added office for editing if needed
          if (continueEditing) {
            const updatedResponse =  axios.get(
              `http://localhost:8000/api/account/office/${newId}/`, { headers }
            );
            setOffice(updatedResponse.data);
          }
        },
      });
    }
  } catch (error) {
      if (error.response) {
        console.error('Office failed:', error.response.data);
        toast.error("Form submission failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
          hideProgressBar: false, // Hide the progress bar
          className: "error-toast",
        });
        // Handle specific response status errors
      } else if (error.request) {
        console.error('Office Us failed:', 'No response received');
        // Handle no response error
      } else {
        console.error('Office Us failed:', error.message);
        // Handle other errors
      }
    }
    finally {
      setSubmitting(false);
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
      !advisors.length || // Check if the advisors array is not empty
      !listing.length ||  // Check if the listing array is not empty
      !website_link ||
      !longitude ||
      !latitude
    ) {
      toast.error('Please fill in all fields');
      return false;
    }
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
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };


  return (
    <div>
      {/* <AddContact contact={contact} /> */}
      <div className='ContactAdmin-main'>
        <header className="dashboard-header">
          <div className="user-info">
            <span>UPDATE OFFICE</span>
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
              <h4 >Editing Office</h4>

            </div>
            <div className='contactAdcon2'>
              <form className='contactAdForm' method='POST' onSubmit={handleSubmit}>
                <label className='contactAdLabel'>
                  <span className='fn-span'>Name:</span>
                  <input className='fn-contactAd' type='text' name='name' value={name}
                    // onChange={handleChange}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label className='contactAdLabel'>
                  <span className='fn-span'>Country:</span>
                  <input className='fn-contactAd' type='text' name='country' value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  // onChange={handleChange}
                  />
                </label>

                <label className='contactAdLabel'>
                  <span className='fn-span'>City:</span>
                  <input className='fn-contactAd' type='text' name='city' value={city}
                    // onChange={handleChange}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>

                <label className='contactAdLabel'>
                  <span className='fn-span'>State:</span>
                  <input className='fn-contactAd' type='text' name='state' value={state}
                    // onChange={handleChange}
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
                <label className='contactAdLabel'>
                  <span className='fn-span'>Zip Code:</span>
                  <input className='fn-contactAdarea' type='text' name='zip_code' value={zip_code}
                    //  onChange={handleChange}>
                    onChange={(e) => setZipCode(e.target.value)}  >
                  </input>
                </label>


                <label className="contactAdLabel">
                  <span className="fn-span">Location:</span>
                  <input
                    className="fn-contactAd"
                    type="text"
                    name="location"
                    value={location}
                    // onChange={handleChange}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>

                <label className="contactAdLabel">
                  <span className="fn-span">Advisors:</span>
                  <input
                    className="fn-contactAd"
                    placeholder="Enter ID of advisor sperated by ,"
                    type="text"
                    name="advisors"
                    value={advisors.join(',')}
                    // onChange={handleChange}
                    onChange={(e) => setAdvisors(e.target.value.split(','))}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Listings:</span>
                  <input
                    className="fn-contactAd"
                    placeholder="Enter IDs of listing sperated by ,"
                    type="text"
                    name="listing"
                    value={listing.join(',')}
                    // onChange={handleChange}
                    onChange={(e) => setListing(e.target.value.split(','))}
                  />
                </label>




                <label className="contactAdLabel">
                  <span className="fn-span">Websiter Link:</span>
                  <input
                    className="fn-contactAd"
                    type="link"
                    name="website_link"
                    value={website_link}
                    // onChange={handleChange}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Longitude:</span>
                  <input
                    className="fn-contactAd"
                    type="number"
                    name="longitude"
                    value={longitude}
                    // onChange={handleChange}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Latitude:</span>
                  <input
                    className="fn-contactAd"
                    type="number"
                    step='0.1'

                    name="latitude"
                    value={latitude}
                    // onChange={handleChange}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </label>


                <div className='AdButtonCon'>
                  {/* <button type='button' className='AdButton-save' onClick={async () => {
                    await handleSubmit({ preventDefault: () => { } }, false, true);
                    // clearFormFields();
                  }}>Save and add another</button> */}
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

export default UpdateOffice