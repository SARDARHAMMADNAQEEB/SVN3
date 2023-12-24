import React, { useState, useEffect } from "react";
import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { LoadScript } from "@react-google-maps/api";
import "./Offices.css";
import OfficeInfo from "../Assets/OfficeInfo";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
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

function Offices() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch office data from Django backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/account/open/office/", {
        params: {
          search: searchQuery,
        },
      })
      .then((response) => {
        console.log("API Response:", response);

        if (response.data && response.data.results) {
          setMarkers(response.data.results);
          setSearchResults(response.data.results); // Set initial search results
        } else {
          console.error("Error: Response data is not in the expected format");
        }
      })
      .catch((error) => console.error("Error fetching office data:", error));
  }, [searchQuery]);

  // Handle map load event
  const onLoad = (map) => {
    setMap(map);
  };

  // Handle marker click event
  const onMarkerClick = (office) => {
    console.log("Marker Clicked. Selected Office:", office);
    setSelectedOffice(office);
  };

  // Handle map click event
  const onMapClick = () => {
    setSelectedOffice(null);
   
  };

  // Handle search button click event
  const handleSearchClick = () => {
    // Get the value from the search input
    const searchInputValue = document.querySelector('.search-input-office').value;

    // Update the searchQuery state with the input value
    setSearchQuery(searchInputValue.trim());
    // If the search input is empty, fetch all office locations
    if (!searchInputValue.trim()) {
      axios
        .get("http://localhost:8000/api/account/open/office/")
        .then((response) => {
          console.log("API Response:", response);

          if (response.data && response.data.results) {
            setMarkers(response.data.results);
            setSearchResults(response.data.results); // Set initial search results
          } else {
            console.error("Error: Response data is not in the expected format");
          }
        })
        .catch((error) => console.error("Error fetching office data:", error));
    }

  };

  // Function to calculate average coordinates
  const center = calculateAverageCoordinates(searchResults);

  // Function to calculate average coordinates
  function calculateAverageCoordinates(markers) {
    if (markers.length === 0) {
      return { lat: 39.8333, lng: -97.4167 }; // Default center if no markers
    }

    // Calculate the average latitude and longitude
    const totalLat = markers.reduce((sum, marker) => sum + marker.latitude, 0);
    const totalLng = markers.reduce(
      (sum, marker) => sum + marker.longitude,
      0
    );

    return {
      lat: totalLat / markers.length,
      lng: totalLng / markers.length,
    };
  }

  const infoWindowContent = selectedOffice ? (
    <InfoWindow
      position={{
        lat: selectedOffice.latitude,
        lng: selectedOffice.longitude,
      }}
      onCloseClick={() => setSelectedOffice(null)}
    >
      <div>
        <div>
          <h5>{selectedOffice.name}</h5>
          <p>{selectedOffice.location}</p>
          {/* <button>Advisors</button>
          <button>Property Listings</button>
          <a href={selectedOffice.website_link} style={{ textDecoration: 'none', color: 'black' }}>Office Website</a> */}
        </div>
        <div>
          {/* <OfficeInfo office={selectedOffice} /> */}
        </div>
      </div>
    </InfoWindow>
  ) : null;
  const defaultCenter = { lat: 39.8283, lng: -98.5795 };
  return (
    <div>
      <Navbar1 />
      <main className="main-office">
        <div className="main-container-1-office">
          <h1>
            <strong>Offices</strong>
          </h1>
          <div className="container-2-office">
            <div className="search-input-main-office">
              <div className="search-input-inner">
                <div className="left-abboden-search">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      color: "#ed6b26",
                      left: "10px",
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
                    placeholder="Search by city, state, or office"
                    autoComplete="off"
                    className="search-input-office"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                </div>
              </div>
            </div>
            {/* <div className="search-bttn-office">
              <button className="button-office-search" onClick={handleSearchClick}>Search</button>
            </div> */}
          </div>

          <LoadScript googleMapsApiKey="AIzaSyCyJ0bkkgqXveRPnBTvRF1lGdRsQYjXMXc">
            <div>
              {/* Google Map and InfoWindowContent wrapped in a div */}
              <div>
                {/* Google Map */}
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={selectedOffice ? { lat: selectedOffice.latitude, lng: selectedOffice.longitude } : center}
                  zoom={5}
                  onLoad={onLoad}
                  onClick={onMapClick}
                  options={{
                    styles: grayscaleMapStyles,
                  }}
                >
                  {/* Markers for each office */}
                  {searchResults.map((office) => (
                    <Marker
                      key={office.id}
                      position={{ lat: office.latitude, lng: office.longitude }}
                      onClick={() => onMarkerClick(office)}
                    />
                  ))}

                  {/* Render the InfoWindow directly */}
                  {infoWindowContent}
                </GoogleMap>
              </div>
            </div>
          </LoadScript>
          <div className="office-list-container" style={{ width: '100%' }}>
            {searchResults.length === 0 ? (
              <p>Sorry, no office locations found.</p>
            ) : (
              <ul style={{ listStyle: 'none', width: '100%' }}>
                {searchResults.map((office) => (
                  <li key={office.id} style={{ width: '100%', }}>
                    <OfficeInfo office={office} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer1 />
    </div>
  );
}

export default Offices;
