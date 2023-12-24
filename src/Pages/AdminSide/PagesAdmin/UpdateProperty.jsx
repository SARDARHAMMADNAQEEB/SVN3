import { useState, React, useEffect } from "react";
import { useNavigate, useLocation, json, useParams } from "react-router-dom";
import "./AddContact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function UpdateProperty() {
  const navigate = useNavigate();
  const locations = useLocation();

  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip_code, setZipCode] = useState(null);
  const [location, setLocation] = useState(null);
  const [location_description, setLocationDescription] = useState(null);
  const [property_type, setPropertyType] = useState([]);
const [sale_type, setSaleType] = useState([]);
const [broker, setBroker] = useState([]);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [building_class, setBuildingClass] = useState(null);
  const [year_built, setYearBuilt] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyHighlights, setPropertyHighlights] = useState([
    // { id: 1, highlight: "" },
  ]);
  const [propertyFiles, setPropertyFiles] = useState([{ id: 1, file: null }]);

  const { id } = useParams();
  const [latestId, setLatestId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [property, setProperty] = useState({
    name: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
    location: "",
    location_description: "",
    property_type: [],
    sale_type: [],
    broker: [],
    size: "",
    price: "",
    description: "",
    building_class: "",
    year_built: "",
    latitude: "",
    longitude: "",
  });
  
useEffect(() => {
  if (property) {
    setName(property.name || "");
    setCountry(property.country || "");
    setCity(property.city || "");
    setState(property.state || "");
    setZipCode(property.zip_code || "");
    setLocation(property.location || "");
    setLocationDescription(property.location_description || "");
    setPropertyType(property.property_type ? property.property_type.map(Number) : []);
    setSaleType(property.sale_type ? property.sale_type.map(Number) : []);
    // setSaleType(property.sale_type.map(Number) || []);
    setSize(property.size || "");
    setPrice(property.price || "");
    setDescription(property.description || "");
    setBuildingClass(property.building_class || "");
    setYearBuilt(property.year_built || "");
    setLatitude(property.latitude || "");
    setLongitude(property.longitude || "");
    // setBroker(property.broker.map(Number) || []);
    setBroker(property.broker ? property.broker.map(Number) : []);
    setPropertyImages(property.images || []);
  }
}, [property]);
  const token = localStorage.getItem("token"); // Replace with your actual storage key
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/account/property/${id}/`,
          { headers }
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/account/property/${id}/`, {
        headers,
      });
      toast.success("Property deleted successfully");
      clearFormFields();
      navigate(-1);
    } catch (error) {
      console.error("Error deleting proeprty:", error);
      toast.error("Error deleting property");
    }
  };

  const handleSubmit = async (e, continueEditing, addAnother) => {
    e.preventDefault();
    if (submitting || !validateForm()) {
      return;
    }
    const propertyTypeIntegers = property_type.map((item) => Number(item));
    const saleTypeIntegers = sale_type.map((item) => Number(item));
    const brokerIntegers = broker.map((item) => Number(item));
    console.log("propertyTypeIntegers:", propertyTypeIntegers);
    console.log("saleTypeIntegers:", saleTypeIntegers);
    console.log("brokerIntegers:", brokerIntegers);

    // Upload files and get URLs
    const uploadedFiles = await uploadFiles(propertyFiles);
    const uploadedImages = await uploadImages(propertyImages);
    const requestData = {
      name,
      country,
      city,
      state,
      zip_code,
      location,
      location_description,
      property_type: propertyTypeIntegers,
      sale_type: saleTypeIntegers,
      broker: brokerIntegers,
      size,
      price,
      description,
      building_class,
      year_built,
      latitude,
      longitude,

      highlights: propertyHighlights.map(({ highlight }) => ({ highlight })),
      images: uploadedImages,
      files: uploadedFiles,
    };
    try {
      setSubmitting(true);

      const response = await axios.put(
        `http://localhost:8000/api/account/property/${id}/`,
        requestData,
        { headers }
      );

      console.log("Property successfully updated:", response.data);

      if (!addAnother) {
        toast.success("Form updated successfully!", {
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
          `http://localhost:8000/api/account/property/${id}/`,
          { headers }
        );
        setProperty(updatedResponse.data);
      }

      if (addAnother) {
        const newId = latestId + 1;
        clearFormFields();
        const newOfficeResponse = await axios.post(
          `http://localhost:8000/api/account/property/${newId}/`,
          requestData,
          { headers }
        );
        console.log("New property successfully added:", newOfficeResponse.data);
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          className: "success-toast",
          onClose: () => {
            setLatestId(newId);

            // Fetch the newly added office for editing if needed
            if (continueEditing) {
              const updatedResponse = axios.get(
                `http://localhost:8000/api/account/property/${newId}/`,
                { headers }
              );
              setProperty(updatedResponse.data);
            }
          },
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("Property failed:", error.response.data);
        toast.error("Form submission failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
          hideProgressBar: false, // Hide the progress bar
          className: "error-toast",
        });
        // Handle specific response status errors
      } else if (error.request) {
        console.error("Property failed:", "No response received");
        // Handle no response error
      } else {
        console.error("Property failed:", error.message);
        // Handle other errors
      }
    } finally {
      setSubmitting(false);
    }
  };

  const uploadImages = async (images) => {
    try {
      const yourAuthToken = localStorage.getItem("token");

      // Make a separate request for each image
      const uploadPromises = images.map(async (image, index) => {
        const formData = new FormData();
        formData.append("folder", "images");
        formData.append("file", image.imageUrlFile);

        const response = await axios.post(
          "http://localhost:8000/api/account/uploadfile/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${yourAuthToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return {
          id: index,
          image: response.data.full_url,
        };
      });

      // Wait for all requests to complete
      const uploadedImages = await Promise.all(uploadPromises);
      console.log("Uploaded Images Response:", uploadedImages);

      return uploadedImages;
    } catch (error) {
      handleError(error);
      return [];
    }
  };

  const uploadFiles = async (files) => {
    try {
      const yourAuthToken = localStorage.getItem("token");
  
      // Make a separate request for each file
      const uploadPromises = files.map(async (file, index) => {
        const formData = new FormData();
        formData.append("folder", "files");
        formData.append("file", file.file); // Make sure 'file' is not undefined
  
        try {
          const response = await axios.post(
            "http://localhost:8000/api/account/uploadfile/",
            formData,
            {
              headers: {
                Authorization: `Bearer ${yourAuthToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          return {
            id: index,
            file: response.data.full_url,
          };
        } catch (error) {
          handleError(error);
          return null;
        }
      });
  
      // Wait for all requests to complete
      const uploadedFiles = await Promise.all(uploadPromises);
      console.log("Uploaded Files Response:", uploadedFiles.filter(Boolean));
  
      return uploadedFiles.filter(Boolean);
    } catch (error) {
      handleError(error);
      return [];
    }
  };
  
  const handleError = (error) => {
    if (error.response) {
      console.error("Property Add failed:", error.response.data);
      toast.error("Form submission failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        className: "error-toast",
      });
      // Handle specific response status errors
    } else if (error.request) {
      console.error("Property Add failed:", "No response received");
      // Handle no response error
    } else {
      console.error("Property Add failed:", error.message);
      // Handle other errors
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };
  const validateForm = () => {
    const requiredFields = [
      "name",
      "country",
      "city",
      "state",
      "zip_code",
      "location",
      "location_description",
      "property_type",
      "sale_type",
      "size",
      "price",
      "description",
      "building_class",
      "year_built",
      "latitude",
      "longitude",
      "broker",
      "propertyImages",
      "propertyFiles",
      "propertyHighlights",
    ];

    const invalidFields = requiredFields.filter((field) => {
      const value = eval(field); // eslint-disable-line no-eval
      return !value || (Array.isArray(value) && value.length === 0);
    });

    if (invalidFields.length > 0) {
      toast.error(
        `Please fill in or provide valid values for: ${invalidFields.join(
          ", "
        )}`
      );
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
    setLocationDescription("");
    setPropertyType([]);
    setSaleType([]);
    setSize("");
    setPrice("");
    setDescription("");
    setBuildingClass("");
    setYearBuilt("");
    setLatitude("");
    setLongitude("");
    setBroker([]);
    setPropertyImages([]);
    setPropertyHighlights([]);
    setPropertyFiles([]);
  };
  const addPropertyImage = () => {
    const newId = propertyImages.length + 1;
    setPropertyImages([...propertyImages, { id: newId, imageUrlFile: null }]);
  };
  const removePropertyImage = (id) => {
    const updatedImages = propertyImages.filter((image) => image.id !== id);
    setPropertyImages(updatedImages);
  };

  const addPropertyHighlight = () => {
    const newId = propertyHighlights.length + 1;
    setPropertyHighlights([
      ...propertyHighlights,
      { id: newId, highlight: "" },
    ]);
  };
  const removePropertyHighlight = (id) => {
    const updatedHighlights = propertyHighlights.filter(
      (highlight) => highlight.id !== id
    );
    setPropertyHighlights(updatedHighlights);
  };
  const addPropertyFile = () => {
    const newId = propertyFiles.length + 1;
    setPropertyFiles([...propertyFiles, { id: newId, file: null }]);
  };

  const removePropertyFile = (id) => {
    const updatedFiles = propertyFiles.filter((file) => file.id !== id);
    setPropertyFiles(updatedFiles);
  };

  const handleFileInputChange = (e, id) => {
    const selectedFiles = e.target.files;
    const updatedFiles = propertyFiles.map((file) =>
      file.id === id ? { ...file, file: selectedFiles[0] } : file
    );
    setPropertyFiles(updatedFiles);
  };
  if (!property) {
    // Add loading state or redirect to a loading page
    return <p>Loading...</p>;
  }
  return (
    <div>
      {/* <AddContact contact={contact} /> */}
      <div className="ContactAdmin-main">
        <header className="dashboard-header">
          <div className="user-info">
            <span>UPDATE PROPERTY</span>
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
              <h4>Editing Property</h4>
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
                  />
                </label>

                <label className="contactAdLabel">
                  <span className="fn-span">City:</span>
                  <input
                    className="fn-contactAd"
                    type="text"
                    name="city"
                    value={city}
                    // onChange={handleChange}
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
                    // onChange={handleChange}
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Zip Code:</span>
                  <input
                    className="fn-contactAdarea"
                    type="text"
                    name="zip_code"
                    value={zip_code}
                    //  onChange={handleChange}>
                    onChange={(e) => setZipCode(e.target.value)}
                  ></input>
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
                  <span className="fn-span">Location description:</span>
                  <input
                    className="fn-contactAd"
                    type="text"
                    name="location_description"
                    value={location_description}
                    // onChange={handleChange}
                    onChange={(e) => setLocationDescription(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Property type:</span>
                  <input
                    className="fn-contactAd"
                    placeholder="Enter IDs of listing separated by ,"
                    type="text"
                    name="property_type"
                    value={property_type.join(",")}
                    onChange={(e) => setPropertyType(e.target.value.split(","))}
                  />
                </label>

                <label className="contactAdLabel">
                  <span className="fn-span">Sale type:</span>
                  <input
                    className="fn-contactAd"
                    placeholder="Enter IDs of sale type separated by ,"
                    type="text"
                    name="sale_type"
                    value={sale_type.join(",")}
                    // onChange={handleChange}
                    onChange={(e) => setSaleType(e.target.value.split(","))}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Broker:</span>
                  <input
                    className="fn-contactAd"
                    placeholder="Enter IDs of brokers separated by ,"
                    type="text"
                    name="broker"
                    value={broker.join(",")}
                    // onChange={handleChange}
                    onChange={(e) => setBroker(e.target.value.split(","))}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Size:</span>
                  <input
                    className="fn-contactAd"
                    type="text"
                    // step='0.1'
                    name="size"
                    value={size}
                    // onChange={handleChange}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Price:</span>
                  <input
                    className="fn-contactAd"
                    type="number"
                    // step='0.1'
                    name="price"
                    value={price}
                    // onChange={handleChange}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Description:</span>
                  <textarea
                    className="fn-contactAd"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Building class:</span>
                  <select
                    className="fn-contactAd"
                    name="building_class"
                    value={building_class}
                    onChange={(e) => setBuildingClass(e.target.value)}
                  >
                    <option value="">Select Building Class</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Year built:</span>
                  <input
                    className="fn-contactAd"
                    type="number"
                    name="year_built"
                    value={year_built}
                    onChange={(e) => setYearBuilt(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Latitude:</span>
                  <input
                    className="fn-contactAd"
                    type="number"
                    step="0.1"
                    name="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
                  <span className="fn-span">Longitude:</span>
                  <input
                    className="fn-contactAd"
                    type="number"
                    step="0.1"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </label>
                <label className="contactAdLabel">
  <span className="fn-span">Property Files:</span>
  {propertyFiles.map((file) => (
    <div key={file.id} className="dynamic-input-container">
      <input
        type="file"
        name={`property_file_${file.id}`}
        accept="application/pdf"
        className="fn-contactAd"
        onChange={(e) => handleFileInputChange(e, file.id)}
      />
      <button type="button" onClick={() => removePropertyFile(file.id)}>
        <FontAwesomeIcon icon={faTrash} style={{ color: "#333" }} />
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addPropertyFile}
    style={{ marginLeft: "0px", marginRight: "auto" }}
  >
    <FontAwesomeIcon
      icon={faPlusCircle}
      style={{ color: "green", marginRight: "5px" }}
    />
    Add Another Property File
  </button>
</label>



<label className="contactAdLabel">
    <span className="fn-span">Property Images:</span>
    {propertyImages.map((image) => (
      <div key={image.id} className="dynamic-input-container">
        <input
          type="file"
          name={`property_image_${image.id}`}
          accept="image/*"
          className="fn-contactAd"
          multiple
          onChange={(e) => {
            const file = e.target.files[0];
            const updatedImages = propertyImages.map((img) =>
              img.id === image.id ? { ...img, imageUrlFile: file } : img
            );
            setPropertyImages(updatedImages);
          }}
        />

              <button
                type="button"
                onClick={() => removePropertyImage(image.id)}
              >
                <FontAwesomeIcon icon={faTrash} style={{ color: "#333" }} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPropertyImage}
            style={{ marginLeft: "0px", marginRight: "auto" }}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ color: "green", marginRight: "5px" }}
            />
            Add Another Property Image
          </button>
        </label>
       
        <label className="contactAdLabel">
          <span className="fn-span">Property Highlights:</span>
          {propertyHighlights.map((highlight) => (
            <div key={highlight.id} className="dynamic-input-container">
              <input
                type="text"
                name={`property_highlight_${highlight.id}`}
                className="fn-contactAd"
                value={highlight.highlight}
                onChange={(e) => {
                  const updatedHighlights = propertyHighlights.map((h) =>
                    h.id === highlight.id
                      ? { ...h, highlight: e.target.value }
                      : h
                  );
                  setPropertyHighlights(updatedHighlights);
                }}
              />
              <button
                type="button"
                onClick={() => removePropertyHighlight(highlight.id)}
              >
                <FontAwesomeIcon icon={faTrash} style={{ color: "#333" }} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPropertyHighlight}
            style={{ marginLeft: "0px", marginRight: "auto" }}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ color: "green", marginRight: "5px" }}
            />
            Add Another Property Highlight
          </button>
        </label>


                <div className="AdButtonCon">
                  {/* <button type='button' className='AdButton-save' onClick={async () => {
                    await handleSubmit({ preventDefault: () => { } }, false, true);
                    // clearFormFields();
                  }}>Save and add another</button> */}
                  <button
                    className="AdButton-save"
                    onClick={(e) => handleSubmit(e, true, false)}
                  >
                    Save and continue editing
                  </button>
                  <button
                    className="AdButton-save-real"
                    value="submit"
                    name="submit"
                    type="submit"
                    onClick={(e) => handleSubmit(e, false, false)}
                  >
                    Save
                  </button>
                  <button onClick={handleDelete} className="AdButton-delete">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProperty;
