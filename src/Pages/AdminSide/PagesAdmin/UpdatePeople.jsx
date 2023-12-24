
import { useState, React, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddContact.css";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function UpdatePeople() {
    const { id } = useParams();
    const [latestId, setLatestId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const locations = useLocation();
    const [people, setPeople] = useState({
        name: "",
        email: "",
        phone: "",
        fax: "",
        biography: "",
        license_info: "",
        company_name: "",
        company_address: "",
        people_Type: [], // Set initial value as an empty array
        social_links: [], // Set initial value as an empty array
        image: null,
        license_info: "",
      });

    const SaleSpecialties = [
        "charter_school",
        "corporate_lease_back",
        "corporate_sales",
        "golf_and_resorts",
        "hospitality",
        "industrial",
        "land",
        "marinas",
        "medical_cffice",
        "mobile_homes",
        "multifamily_or_apartment",
        "office",
        "property_management",
        "retail",
        "self_storage",
        "senior_housing",
      ];
      
      const LeaseSpecialties = [
        "golf_and_resorts",
        "industrial",
        "medical_office",
        "miscellaneous",
        "office",
        "retail",
        "tenant_representation",
      ];
      
      const ProductCouncilSpecialties = [
        "asset_recovery_svnart",
        "auction",
        "charter_schools",
        "corporate_real_estate",
        "distressed_assets",
        "golf_and_resorts",
        "hospitality",
        "industrial",
        "institutional_capital_markets",
        "land_and_development",
        "leasing",
        "marinas",
        "medical_office",
        "multifamily",
        "office",
        "property_management",
        "restaurant",
        "retail",
        "self_storage",
        "sfr_portfolios",
        "single_tenant_investments",
        "telecom_and_leasing_infrastructure",
      ];
      const token = localStorage.getItem('token'); // Replace with your actual storage key
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
   
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [fax, setFax] = useState("");
      const [biography, setBiography] = useState("");
      const [license_info, setLicenseInfo] = useState("");
      const [company_name, setComapnyName] = useState("");
      const [company_address, setCompanyAddress] = useState("");
      const [people_Type, setPeopleTypes] = useState([{ id: 1, name: "" }]);
      const [socialLinks, setSocialLinks] = useState([{ id: 1, link: "" }]);
      const [image, setImage]=useState(null);
    
      const addPeopleType = () => {
        const newId = people_Type.length + 1;
        setPeopleTypes([...people_Type, { id: newId, name: "" }]);
      };
    
      // Update social links state
    
      const removePeopleType = (id) => {
        const updatedPeopleTypes = people_Type.filter((type) => type.id !== id);
        setPeopleTypes(updatedPeopleTypes);
      };
    
     
    
      const addSocialLink = () => {
        const newId = socialLinks.length + 1;
        setSocialLinks([...socialLinks, { id: newId, link: "" }]);
      };
    
      const removeSocialLink = (id) => {
        const updatedSocialLinks = socialLinks.filter((link) => link.id !== id);
        setSocialLinks(updatedSocialLinks);
      };
      const validatePeopleType = () => {
        const trimmedPeopleTypes = people_Type.map((type) => type.name.trim());
    
        if (trimmedPeopleTypes.some((trimmedName) => trimmedName === "")) {
          toast.error("Please enter a name for each People Type");
          return false;
        }
    
        if (people_Type.length === 0) {
          toast.error("Please add at least one People Type");
          return false;
        }
    
    
        return true;
      };

      useEffect(() => {
        if (people.people_Type && people.social_links) {
          setLatestId(people.length + 1);
          setName(people.name);
          setEmail(people.email);
          setPhone(people.phone);
          setFax(people.fax);
          setBiography(people.biography);
          setLicenseInfo(people.license_info);
          setComapnyName(people.company_name);
          setCompanyAddress(people.company_address);
          setPeopleTypes(people.people_Type);
          setSocialLinks(people.social_links);
        }
      }, [people]);

      useEffect(() => {
        const fetchLatestId = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/account/people/latest-id/',  { headers });
            setLatestId(response.data.latestId);
          } catch (error) {
            console.error('Error fetching latest ID:', error);
          }
        };
    
        fetchLatestId();
      }, []);

      useEffect(() => {
        const fetchPeople = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8000/api/account/people/${id}/`, { headers }
            );
            console.log('Fetched data:', response.data);
      
            // Ensure that the response data is not undefined
            if (response.data) {
              const {
                name,
                email,
                phone,
                fax,
                biography,
                license_info,
                company_name,
                company_address,
                people_Type,
                social_links,
                image
              } = response.data;
      
              // Update the state with the fetched data
              setName(name || "");
              setEmail(email || "");
              setPhone(phone || "");
              setFax(fax || "");
              setBiography(biography || "");
              setLicenseInfo(license_info || "");
              setComapnyName(company_name || "");
              setCompanyAddress(company_address || "");
              setPeopleTypes(people_Type || []);
              setSocialLinks(social_links || []);
              setImage(image || null);
            }
          } catch (error) {
            console.error('Error fetching contact:', error);
          }
        };
      
        fetchPeople();
      }, [id]);
      

      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/account/people/${id}/`, { headers });
          toast.success('Broker deleted successfully');
          clearFormFields();
          navigate(-1);
    
        } catch (error) {
          console.error('Error deleting broker:', error);
          toast.error('Error deleting broker');
        }
      };

      const handleSubmit = async (e, continueEditing, addAnother) => {
        e.preventDefault();
        if (submitting || !validateForm()) {
          return;
        }
        const isPeopleTypeValid = validatePeopleType();
        if (!isPeopleTypeValid) {
          return;
        }
        try {
          setSubmitting(true);
          let imageUrl = null;
          if (imageFile) {
            const imageFormData = new FormData();
            imageFormData.append("folder", "images"); 
            imageFormData.append("file", imageFile);
            console.log('Image Form Data:', imageFormData);
          const yourAuthToken2 = localStorage.getItem("token");
        
    
          const imageUploadResponse = await axios.post(
            "http://localhost:8000/api/account/uploadfile/",
            imageFormData,
    
            {
              headers: {
                Authorization: `Bearer ${yourAuthToken2}`,
                "Content-Type": "multipart/form-data",
              },
            }
          ).catch(error => {
            console.error("Image upload failed:", error);
          });
    
          imageUrl = imageUploadResponse.data.full_url;
        
          }

          
      const prepareSpecialtiesData = (specialtiesList, prefix) => {
        const specialtyData = {};
        specialtiesList.forEach((specialty, index) => {
          specialtyData[specialty] = document.getElementById(`${prefix}_${index}`).checked;
        });
        return [{ id: 10, ...specialtyData }];
      };
      
      const saleSpecialties = prepareSpecialtiesData(SaleSpecialties, "sale_specialtie");
      const leaseSpecialties = prepareSpecialtiesData(LeaseSpecialties, "lease_specialtie");
      const productCouncilSpecialties = prepareSpecialtiesData(ProductCouncilSpecialties, "product_council");
      
      // Concatenate the arrays into a single list for each specialty field
      const flattenSpecialties = (specialtiesList) => specialtiesList.reduce((acc, curr) => acc.concat(curr), []);
      
          const requestData = {
            name: name,
            email: email,
            phone: phone,
            fax: fax,
            biography: biography,
            license_info: license_info,
            company_name: company_name,
            company_address: company_address,
            people_type: people_Type.map(value => ({ name: value.name })),
            social_link: socialLinks.map(link => ({ link: link.link })),
            image: imageFile ? imageUrl : null,
            sale_specialtie: flattenSpecialties(saleSpecialties),
            lease_specialtie: flattenSpecialties(leaseSpecialties),
            product_council: flattenSpecialties(productCouncilSpecialties),
          };


          const response = await axios.put(`http://localhost:8000/api/account/people/${id}/`,
          requestData,
           { headers });
      
          console.log('People successfully updated:', response.data);
      
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
              `http://localhost:8000/api/account/people/${id}/`, { headers }
            );
            setPeople(updatedResponse.data);
          }
      
          if (addAnother) {
            const newId = latestId + 1;
            clearFormFields();
            const newBrokerResponse = await axios.post(
              `http://localhost:8000/api/account/people/${newId}/`,
              requestData,
              { headers }
            );
            console.log('New Broker successfully added:', newBrokerResponse.data);
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
                    `http://localhost:8000/api/account/people/${newId}/`, { headers }
                  );
                  setPeople(updatedResponse.data);
                }
              },
            });
          }
        } catch (error) {
            if (error.response) {
              console.error('Broker failed:', error.response.data);
              toast.error("Form submission failed. Please try again.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
                hideProgressBar: false, // Hide the progress bar
                className: "error-toast",
              });
              // Handle specific response status errors
            } else if (error.request) {
              console.error('Broker failed:', 'No response received');
              // Handle no response error
            } else {
              console.error('Broker failed:', error.message);
              // Handle other errors
            }
          }
          finally {
            setSubmitting(false);
          }
        };


      const clearFormFields = () => {
        setName("");
        setEmail("");
        setPhone("");
        setFax("");
        setBiography("");
        setLicenseInfo("");
        setComapnyName("");
        setCompanyAddress("");
        setPeopleTypes([]);
        setSocialLinks([]);
        setImageFile(null);
        
      };
      const validateForm = () => {
        if (
          !name ||
          !email ||
          !phone ||
          !fax ||
          !biography ||
          !license_info ||
          !company_name ||
          !company_address
        ) {
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
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
      };
    return (
        <div>
            <div className='ContactAdmin-main'>
                <header className="dashboard-header">
                    <div className="user-info">
                        <span>UPDATE BROKER</span>
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
                            <h4 >Editing Broker</h4>

                        </div>
                        <div className='contactAdcon2'>
                            <form className='contactAdForm' method='POST' onSubmit={handleSubmit}>
                            <label className="contactAdLabel">
                <span className="fn-span">Image:</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="fn-contactAd"
                  onChange={(e) => handleImageChange(e)}
                />
              </label>
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
                <span className="fn-span">Phone:</span>
                <input
                  className="fn-contactAd"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className="contactAdLabel">
                <span className="fn-span">Fax:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="fax"
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Biography:</span>
                <textarea
                  className="fn-contactAdarea"
                  name="biography"
                  type="text"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">License info:</span>
                <input
                  className="fn-contactAd"
                  type="text"
                  name="license_info"
                  value={license_info}
                  onChange={(e) => setLicenseInfo(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Company name:</span>
                <input
                  className="fn-contactAd"
                  //   placeholder="Enter ID of advisor separated by ,"
                  type="text"
                  name="company_name"
                  value={company_name}
                  onChange={(e) => setComapnyName(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">Company address:</span>
                <input
                  className="fn-contactAd"
                  //   placeholder="Enter IDs of listing separated by ,"
                  type="text"
                  name="company_address"
                  value={company_address}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </label>
              <label className="contactAdLabel">
                <span className="fn-span">People Type:</span>
                {people_Type.map((type) => (
                  <div key={type.id} className="dynamic-input-container">
                    <input
                      type="text"
                      name={`people_type_${type.id}`}
                      value={type.name}
                      className="fn-contactAd"
                      onChange={(e) => {
                        const updatedTypes = people_Type.map((t) =>
                          t.id === type.id ? { ...t, name: e.target.value } : t
                        );
                        setPeopleTypes(updatedTypes);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removePeopleType(type.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#333" }}
                      />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPeopleType}
                  style={{ marginLeft: "0px", marginRight: "auto" }}
                >
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "green", marginRight: "5px" }}
                  />
                  Add Another People Type
                </button>
              </label>

              <div className="contactAdLabel">
                <span className="fn-span">People Social Links:</span>
                {socialLinks.map((link) => (
                  <div key={link.id} className="dynamic-input-container">
                    <input
                      type="text"
                      name={`social_link_${link.id}`}
                      value={link.link}
                      className="fn-contactAd"
                      onChange={(e) => {
                        const updatedLinks = socialLinks.map((l) =>
                          l.id === link.id ? { ...l, link: e.target.value } : l
                        );
                        setSocialLinks(updatedLinks);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(link.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#333" }}
                      />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSocialLink}
                  style={{ marginLeft: "0px", marginRight: "auto" }}
                >
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "green", marginRight: "5px" }}
                  />
                  Add Another Social Link
                </button>
              </div>
              {/* Sale Specialties */}
              <label className="contactAdLabel">
                <span className="fn-span">Sale Specialties:</span>
                {SaleSpecialties.map((specialty, index) => (
                  <div key={index} className="dynamic-input-container">
                    <input
                      type="checkbox"
                      id={`sale_specialtie_${index}`}
                      name={`sale_specialtie_${index}`}
                      onChange={(e) => {
                        // Update the state based on the checkbox status
                        // Handle the state update based on your logic
                      }}
                    />
                    <label htmlFor={`sale_specialtie_${index}`}>
                      {specialty}
                    </label>
                  </div>
                ))}
              </label>
              {/* Lease Specialties */}
              <label className="contactAdLabel">
                <span className="fn-span">Lease Specialties:</span>
                {LeaseSpecialties.map((specialty, index) => (
                  <div key={index} className="dynamic-input-container">
                    <input
                      type="checkbox"
                      id={`lease_specialtie_${index}`}
                      name={`lease_specialtie_${index}`}
                      onChange={(e) => {
                        // Update the state based on the checkbox status
                        // Handle the state update based on your logic
                      }}
                    />
                    <label htmlFor={`lease_specialtie_${index}`}>
                      {specialty}
                    </label>
                  </div>
                ))}
              </label>

              {/* Product Council Specialties */}
              <label className="contactAdLabel">
                <span className="fn-span">Product Council Specialties:</span>
                {ProductCouncilSpecialties.map((specialty, index) => (
                  <div key={index} className="dynamic-input-container">
                    <input
                      type="checkbox"
                      id={`product_council_${index}`}
                      name={`product_council_${index}`}
                      onChange={(e) => {
                        // Update the state based on the checkbox status
                        // Handle the state update based on your logic
                      }}
                    />
                    <label htmlFor={`product_council_${index}`}>
                      {specialty}
                    </label>
                  </div>
                ))}
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

export default UpdatePeople