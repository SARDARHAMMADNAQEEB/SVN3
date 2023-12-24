import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { React, useState, useEffect } from 'react'
function UpdatePropertyType() {
    const { id } = useParams();
    const [latestId, setLatestId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const locations = useLocation();
    const [name, setName] = useState("");

    const [propertyType, setPropertyType] = useState({
        name: '',
    });
    useEffect(() => {
        if (propertyType) {
            setName(propertyType.name || '');
        }
    }, [propertyType]);
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        const fetchLatestId = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/account/property-type/latest-id/', { headers });
                setLatestId(response.data.latestId);
            } catch (error) {
                console.error('Error fetching latest ID:', error);
            }
        };
        fetchLatestId();
    }, []);

    useEffect(() => {
        const fetchPropertyType = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/account/property-type/${id}/`, { headers }
                );
                setPropertyType(response.data);
            } catch (error) {
                console.error('Error fetching property type:', error);
            }
        };

        fetchPropertyType();
    }, [id]);
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/account/property-type/${id}/`, { headers });
            toast.success('Property type deleted successfully');
            clearFormFields();
            navigate(-1);

        } catch (error) {
            console.error('Error deleting property type:', error);
            toast.error('Error deleting property type');
        }
    };
    const handleSubmit = async (e, continueEditing, addAnother) => {
        e.preventDefault();
        if (submitting || !validateForm()) {
            return;
        }
        const requestData = {
            name
        }
        try {
            setSubmitting(true);
            const response = await axios.put(`http://localhost:8000/api/account/property-type/${id}/`,
                requestData, { headers }
            );
            console.log('Property Type successfully updated: ', response.data);
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
                    `http://localhost:8000/api/account/property-type/${id}/`, { headers }
                );
                setPropertyType(updatedResponse.data);
            }
            if (addAnother) {
                const newId = latestId + 1;
                clearFormFields();
                const newOfficeResponse = await axios.post(
                    `http://localhost:8000/api/account/property-type/${newId}/`, requestData, { headers });
                console.log('New property type successfully added:', newOfficeResponse.data);
                toast.success('Form submitted successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    className: 'success-toast',
                    onClose: () => {
                        setLatestId(newId);

                        if (continueEditing) {
                            const updatedResponse = axios.get(
                                `http://localhost:8000/api/account/property-type/${newId}/`, { headers }
                            );
                            setPropertyType(updatedResponse.data);
                        }
                    },
                });
            }
        } catch (error) {
            if (error.response) {
                console.error('Property Type failed: ', error.response.data);
                toast.error("Form Submission failed. Please try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
                    hideProgressBar: false, // Hide the progress bar
                    className: "error-toast",
                });
            }
            else if (error.request) {
                console.error('Property Type failed:', 'No response received');
                // Handle no response error
            } else {
                console.error('Property Type failed:', error.message);
                // Handle other errors
            }
        }
        finally {
            setSubmitting(false);
        }
    };


    const validateForm = () => {
        if (
            !name
        ) {
            toast.error("Please fill in field");
            return false;
        }
        return true;
    };
    const clearFormFields = () => {
        setName("");
    }
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
                        <span>UPDATE PROPERTY TYPE</span>
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
                    <div className='contactContent'style={{height:'fit-content', gap:'20px'}} >
                        <div className='contactAdminCon1'>
                            <h4 >Editing property type</h4>
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

export default UpdatePropertyType