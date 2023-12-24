import React, { useState, useEffect } from "react";
import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { LoadScript } from "@react-google-maps/api";
import PropertyInfo from "../Assets/PropertyInfo";
import PropertyDetails from "./PropertyDetails";
import "./Properties.css"; // Add your CSS file for styling
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from 'react-router-dom';
const mapContainerStyle = {
  flex: "1",
  height: "500px",
  width: "100%",
};

const mapStyles = {
  width: "100%",
  height: "100%",
};
const grayscaleMapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        saturation: -100, // Set saturation to -100 for grayscale
      },
    ],
  },
];

function Properties() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 39.8333, lng: -97.4167 },
    zoom: 5,
  });
  const [searchParams] = useSearchParams();
  const propertyIds = searchParams.get('ids');
  const [loadFromURL, setLoadFromURL] = useState(true);
  const calculateAverageCoordinates = (locations) => {
    if (locations.length === 0) {
      return { lat: 39.8333, lng: -97.4167 };
    }
    const totalLat = locations.reduce(
      (sum, location) => sum + location.latitude,
      0
    );
    const totalLng = locations.reduce(
      (sum, location) => sum + location.longitude,
      0
    );

    return {
      lat: totalLat / locations.length,
      lng: totalLng / locations.length,
    };
  };

  const onMarkerClick = (property) => {
    console.log("Marker Clicked. Selected property:", property);
    setSelectedProperty(property);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (propertyIds) {
          console.log("Property IDs from URL:", propertyIds);
          response = await axios.get("http://localhost:8000/api/account/open/property/", {
            params: {
              ids: propertyIds,
              search: searchQuery,
            },
          });
        } else {
          response = await axios.get("http://localhost:8000/api/account/open/property/", {
            params: {
              search: searchQuery,
            },
          });
        }

        console.log("API Response:", response.data);

        if (response.data && response.data.results) {
          const updatedMarkers = response.data.results;
          setMarkers(updatedMarkers);
          setSearchResults(updatedMarkers);
          setNotFound(false);

          // Set the center and zoom based on the updated markers
          const updatedCenter = calculateAverageCoordinates(updatedMarkers);
          setMapOptions({
            center: updatedCenter,
            zoom: updatedMarkers.length > 0 ? 5 : 12,
          });
        } else {
          setMarkers([]);
          setSearchResults([]);
          setNotFound(true);
          console.error("Error: Response data is not in the expected format");
        }
      } catch (error) {
        console.error("AxiosError:", error);
      }
    };

    fetchData();
  }, [propertyIds, searchQuery]);



  
  const onLoad = (map) => {
    setMap(map);
  };

  const onMapClick = () => {
    setSelectedProperty(null);
  };

  const center = calculateAverageCoordinates(searchResults);

  const infoWindowContent = selectedProperty && (
    <InfoWindow
      position={{
        lat: selectedProperty.latitude,
        lng: selectedProperty.longitude,
      }}
      onCloseClick={() => setSelectedProperty(null)}
    >
      <div>
        <div>
          <PropertyInfo property={selectedProperty} />
        </div>
      </div>
    </InfoWindow>
  );
  //   <div className="search-bttn-office">
  //   <button
  //     className="button-office-search"
  //     onClick={() => setSearchQuery(searchQuery)}
  //   >
  //     Search
  //   </button>
  // </div>
  useEffect(() => {
    searchResults.forEach((property) => {
      console.log(`Image URL: http://localhost:8000${property.images[0].image.url}`);
    });
  }, [searchResults]);


  return (
    <div>
      <Navbar1 />
      <main className="main-prop">
        <div className="main-container-1-office">
          <h1>
            <strong>Properties</strong>
          </h1>
        </div>
        <div className="container-2-office">
          <div className="search-input-main-office">
            <div className="search-input-inner">
              <div className="left-abboden-search">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    color: "#ed6b26",
                    left: '130px',
                    top: "17px",
                    overflow: "visible",
                    width: "1em",
                    position: "absolute",
                    pointerEvents: "none",
                    display: "inline-block",
                    fontSize: "inherit",
                    height: "1em",
                    verticalAlign: "-0.125em",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  placeholder="Search by property name, location"
                  autoComplete="off"
                  className="search-input-prop"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <div className="search-bttn-office">
            <button
              className="button-office-search"
              onClick={() => setSearchQuery((e) => e.target.value)}
            >
              Search
            </button>
          </div> */}
        </div>

        <div className="map-container">
        {/* <div className="embedded-map">
          <iframe
            title="Embedded Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52891323.64355656!2d-161.7572472789203!3d35.990241455780485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1703329185741!5m2!1sen!2s"
            width="900"
            height="450"
            style={{ border: "0",  }}
            allowFullScreen=""
            loading="lazy"
            zoom='5'
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}

          <LoadScript
            googleMapsApiKey="AIzaSyCyJ0bkkgqXveRPnBTvRF1lGdRsQYjXMXc"
            onLoad={onLoad} // Use the onLoad callback
          >
            <GoogleMap
  mapContainerStyle={mapContainerStyle}
  center={mapOptions.center}
  zoom={mapOptions.zoom}
  onLoad={onLoad}
  onClick={onMapClick}
  options={{
    styles: grayscaleMapStyles,
  }}
>
  {searchResults.map((property) => (
    <Marker
      key={property.id}
      position={{
        lat: property.latitude,
        lng: property.longitude,
      }}
      onClick={() => onMarkerClick(property)}
    />
  ))}
  {infoWindowContent}
</GoogleMap>

          </LoadScript>
        </div>
        <div className="property-list-container">
          {notFound ? (
            <p>Sorry, no properties found.</p>
          ) : (
            <div className="property-cards1">
              
  

              {searchResults.map((property) => (
   <div className="property-cards" key={property.id}>
   <Link to={`/property/${property.id}`} className="link-style">
   <div
        className="property-card"
        onClick={() => onMarkerClick(property)}
        onMouseEnter={() => console.log("Image URL:", property.images && property.images.length > 0 ? `http://localhost:8000${property.images[0].image}` : 'Undefined')}
        style={{
          backgroundImage: property.images && property.images.length > 0
    ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${property.images[0].image})`
    : 'none', 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          cursor: "pointer",
          color:'#fff',
          
        }}
      >
        {/* {property.images && property.images.length > 0 ? (
          <img
            src={`http://localhost:8000${property.images[0].image}`}
            className="property-image"
            alt={`Property Image`}
          />
        ) : (
          <div className="no-image-placeholder">No Image Available</div>
        )} */}

        <div className="property-details">
          <p className="property-sale-type">{property.sale_type_detail && property.sale_type_detail.length > 0
                            ? property.sale_type_detail.map((type) => (
                              <span key={type.id}>{type.name}</span>
                            ))
                            : null}</p>
          <p className="property-name">{property.name}</p>
          <p className="property-location">{property.location}</p>
        </div>
      </div>
    </Link>
  </div>
))}

</div>

          )}
        </div>
      </main>
      <Footer1 />
    </div>
  );
}

export default Properties;
