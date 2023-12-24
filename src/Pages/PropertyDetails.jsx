import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";
import "./PropertiesDetails.css";
import {
  faAngleLeft,
  faFile,
  faPhone,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-bootstrap/Carousel";

const PropertyDetails = () => {
  const { id } = useParams();
  // const [propertyDetails, setPropertyDetails] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    results: [],
    files: [],
  });

  const [brokers, setBrokers] = useState([]);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [SaleType, setSaleType] = useState(null);
  // const brokerIds = propertyDetails.broker;
  // ... (previous code)


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/account/open/property/${id}/`)
      .then((response) => {
        console.log("Property Details Response:", response);

        if (response.data) {
          setPropertyDetails(response.data);
          console.log("Property Details:", response.data);
          const latitude = response.data.latitude;
          const longitude = response.data.longitude;
          const propertyTypeDetails = response.data.property_type_detail;
          console.log("Property Type Details:", propertyTypeDetails);

          // Access sale type details
          const saleTypeDetails = response.data.sale_type_detail;
          console.log("Sale Type Details:", saleTypeDetails);

          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          if (latitude !== undefined && longitude !== undefined) {
            console.log("Setting Marker Position:", {
              lat: latitude,
              lng: longitude,
            });
            console.log("Setting Marker Position:", { lat: latitude, lng: longitude });
            setMarkerPosition({ lat: latitude, lng: longitude });
            console.log("Marker Position Set:", markerPosition);
          }
          const brokerField = response.data.broker_detail;

          if (Array.isArray(brokerField)) {
            const brokerIds = brokerField.map((broker) => broker.id);

            if (brokerIds && brokerIds.length > 0) {
              axios
                .get(
                  `http://localhost:8000/api/account/open/people/?ids=${brokerIds.join(",")}`
                )
                .then((brokerResponse) => {
                  if (
                    brokerResponse.data &&
                    brokerResponse.data.results &&
                    brokerResponse.data.results.length > 0
                  ) {
                    const brokerData = brokerResponse.data.results;
                    // Update brokerData to include people_type
                    const updatedBrokers = brokerData.map((broker) => ({
                      ...broker,
                      people_type: broker.people_type.map((type) => type.name).join(", "),
                    }));
                    setBrokers(updatedBrokers);
                  } else {
                    console.error("Error: Broker data is not in the expected format");
                  }
                })
                .catch((error) => console.error("Error fetching broker details:", error));
            } else {
              console.error("Error: Broker IDs not available");
            }
          } else {
            console.error("Error: Broker field is not in the expected format");
          }

        }
      })
      .catch((error) => console.error("Error fetching property details:", error));
  }, [id]);

  // ... (remaining code)

  if (!propertyDetails || propertyDetails.results === null) {
    return <p>Loading...</p>;
  }
  const results = propertyDetails.results;
  const carouselItems =
    propertyDetails.images && propertyDetails.images.length > 0
      ? propertyDetails.images.map((image, index) => (
        <Carousel.Item key={`${index}-${image.image}`}>
          <img
            className="d-block w-100 curosal-img"
            src={image.image}
            alt={`Slide ${index + 1}`}
            height='500px'
          />
        </Carousel.Item>
      ))
      : <Carousel.Item>No images available</Carousel.Item>;


  const saletype = SaleType && SaleType.results ? (
    SaleType.results.map((sale) => (
      <div
        key={sale.id}
      // style={{ lineHeight: "0.4rem", marginBottom: "10px" }}
      >
        {sale.sale_type}
      </div>
    ))
  ) : (
    <p></p>
  );
  const brokersInfo =
    (brokers ?? []).length > 0 ? (
      brokers.map((broker) => (
        <div key={broker.id}>
          {/* Display broker information */}
          <div style={
            {
              display: "flex",
              fontFamily: 'Montserrat , sans-serif',
              marginBottom: "10px",
            }
          }>
            <img src={broker.image} width='80px' height='80px' />

            <div style={{ display: 'grid', marginLeft: '15px', lineHeight: '0.2rem' }}>

              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{broker.name}</p>
              <p style={{ fontSize: '13px' }}>{broker.people_type}</p>
              <p style={{ fontSize: '13px', color: '#ed6b26' }}>
                <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faPhone} />
                {broker.phone}</p>
              <p style={{ fontSize: '13px', color: '#ed6b26' }}>
                <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faMailBulk} />
                {broker.email}</p>
            </div>
          </div>
          {/* Add more fields as needed */}
        </div>
      ))
    ) : (
      <p>No brokers found</p>
    );

  // const brokersInfo =
  //   brokers && brokers.results ? (
  //     brokers.results.map((broker) => (
  //       <div
  //         key={broker.id}
  //         style={{ lineHeight: "0.4rem", marginBottom: "10px" }}
  //       >
  //         <div style={{ display: "flex", width: "100%" }}>
  //           <img src={broker.image} style={{ width: "80px", height: "80px" }} />

  //           <p
  //             style={{
  //               fontWeight: "bold",
  //               marginTop: "20px",
  //               marginLeft: "10px",
  //             }}
  //           >
  //             {broker.name}
  //           </p>
  //         </div>
  //         <p
  //           style={{
  //             fontSize: "0.8rem",
  //             marginTop: "10px",
  //             marginLeft: "90px",
  //           }}
  //         >
  //           {broker.company_name}
  //         </p>

  //         <div
  //           style={{
  //             display: "flex",
  //             gap: "10px",
  //             marginTop: "5px",
  //             marginLeft: "90px",
  //           }}
  //         >
  //           <p style={{ color: "#ed6b26", fontSize: "0.8rem" }}>
  //             <FontAwesomeIcon
  //               icon={faPhone}
  //               style={{ color: "#ed6b26", paddingRight: "5px" }}
  //             />
  //             {broker.phone}
  //           </p>
  //           <p style={{ color: "#ed6b26", fontSize: "0.8rem" }}>
  //             <FontAwesomeIcon
  //               icon={faMailBulk}
  //               style={{ color: "#ed6b26", paddingRight: "5px" }}
  //             />
  //             {broker.email}
  //           </p>
  //         </div>
  //         {/* Add more fields as needed */}
  //       </div>
  //     ))
  //   ) : (
  //     <p>No brokers found</p>
  //   );


  const propertyFiles =
    propertyDetails.files && propertyDetails.files.length > 0 ? (
      <div className="file-prop">
        {propertyDetails.files.map((file, index) => (
          <div key={`${index}-${file.file}`} className="file-link">
            <a
              href={`${file.file}`}
              rel="noopener noreferrer"
              className="file_link"
              target="blank"
            >
              <FontAwesomeIcon icon={faFile} className="icon-file" />
              <div className="filename">{propertyDetails.name}</div>
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p>No files available</p>
    );



  const onLoad = (map) => {
    setMap(map);
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
  const mapContainerStyle = {
    // flex: "1",
    height: "400px",
    width: "100%",
  };
  const propertyType =
    propertyDetails.property_type_detail && propertyDetails.property_type_detail.length > 0
      ? propertyDetails.property_type_detail.map((type) => (
        <div key={type.id}>{type.name}</div>
      ))
      : <p>No property type available</p>;

  const saleType =
    propertyDetails.sale_type_detail && propertyDetails.sale_type_detail.length > 0
      ? propertyDetails.sale_type_detail.map((type) => (
        <div key={type.id}>{type.name}</div>
      ))
      : <p>No sale type available</p>;

  return (
    <div>
      <Navbar1 />
      <main className="main-office">
        <div className="main-container-1-office">
          <h1>
            <strong>Properties</strong>
          </h1>
          <div id="buildout">
            <div className="back-container">
              <div className="inner-back-con">
                <div className="header-back-con">
                  <a href="/properties">
                    <FontAwesomeIcon icon={faAngleLeft} className="icon-back" />
                    Back to properties
                  </a>
                </div>
              </div>
            </div>

            <div className="details-content-main">
              <div className="row-detail-con">
                <div className="col-detail-head">
                  <div className="property-header-detail">
                    <h1 className="h1-detail">{propertyDetails.name}</h1>
                  </div>
                  <div className="subheader-detail">
                    <div className="text-subhead">
                      <h2 className="h2-detail">{propertyDetails.location}</h2>
                    </div>
                  </div>
                </div>

                <div className="col2-detail-head">
                  <div className="col2-header1-detail">
                    <div className="text-subhead">
                      <h1 className="h1-detail-price">
                        ${propertyDetails.price}
                      </h1>
                    </div>
                    <div className="col2-header2-detail">
                      <div className="text-subhead">
                        <h2
                          className="h2-detail"
                          style={{ textAlign: "right" }}
                        >
                          {saleType} Price
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='tabNavigation'>
                <nav className='navs-detail'>
                  <div className='grid-detail'>
                    <button className='nav-toggle'></button>
                     </div>
                </nav>
              </div> */}
              <h5
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#ed6b26",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                OVERVIEW
              </h5>
              <div className="content-detail-container">
                <div className="tab-container-detail">
                  <div className="row-detail-tab">
                    {/* Left Column */}
                    <div className="LeftCol-detail">
                      <div className="section-Container-detail">
                        {/* Curosal of shows multiple property images from database */}
                        <Carousel>{carouselItems}</Carousel>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="RightCol-detail">
                      <div className="file-prop">
                        <h5
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#ed6b26",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            letterSpacing: "1px",

                          }}
                        >
                          FILES
                        </h5>
                        {propertyFiles}
                      </div>

                      <div className="brokers-info-detail">
                        <h2 className="h2-broker">BROKERS</h2>
                        {brokersInfo}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="details-content-prop">
                    <h2 className="h2-prop">Property Details</h2>
                </div> */}
                <section className="property-detail-section">
                  <div className="property-container-detail">
                    <div className="layout-container">
                      <div className="column-container-layout">
                        <div className="text-header-component">
                          <h2 className="header-details">Property Details</h2>
                        </div>
                        <div className="table-details">
                          <table className="table-inner-details">
                            <tbody className="tbody">
                              <tr className="tr-details">
                                <td className="td-details">
                                  <strong>Sale Price: </strong>
                                </td>
                                <td className="td-details">
                                  ${propertyDetails.price}
                                </td>
                              </tr>

                              <tr className="tr-details">
                                <td className="td-details">
                                  <strong>Property Type: </strong>
                                </td>
                                <td className="td-details">
                                  {propertyType}
                                </td>
                              </tr>

                              <tr className="tr-details">
                                <td className="td-details">
                                  <strong>Building Size: </strong>
                                </td>
                                <td className="td-details">
                                  {propertyDetails.size}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="property-detail-section">
                  <div className="property-container-detail">
                    <div className="layout-container">
                      <div className="column-container-layout">
                        <div className="text-header-component">
                          <h2 className="header-details">
                            Property Description
                          </h2>
                        </div>
                        <p className="description-prop">
                          {propertyDetails.description}
                        </p>
                      </div>

                    </div>
                  </div>
                </section>
                <section className="property-detail-section">
                  <div className="property-container-detail">
                    <div className="layout-container">
                      <div className="column-container-layout">
                        <div className="text-header-component">
                          <h2 className="header-details">
                            Location Description
                          </h2>
                        </div>
                        <p className="description-prop">
                          {propertyDetails.location_description}
                        </p>
                      </div>

                    </div>
                  </div>
                </section>
                <section className="property-detail-section">
                  <div className="property-container-detail">
                    <div className="layout-container">
                      <div className="column-container-layout">
                        <div className="text-header-component">
                          <h2 className="header-details">Highlights</h2>
                        </div>
                        <ul className="highlight-list">
                          {propertyDetails.highlights && Array.isArray(propertyDetails.highlights) && propertyDetails.highlights.map((highlight, index) => (
                            <li key={index} className="highlight-item">
                              {highlight.highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>



                <section className="property-detail-section">
                  <div className="property-container-detail">
                    <div className="layout-container">
                      <div className="column-container-layout">
                        <div className="text-header-component">
                          <h2 className="header-details">Map</h2>

                        </div>

                      </div>

                    </div>
                  </div>
                </section>
                <LoadScript
                  googleMapsApiKey="AIzaSyCyJ0bkkgqXveRPnBTvRF1lGdRsQYjXMXc"
                  // libraries={['places']}
                  // loadingElement={<div style={{ height: '100%' }} />}
                  onLoad={onLoad}
                >
                  <div className="map-container-prop">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={markerPosition}
                      zoom={15}
                      options={{
                        styles: grayscaleMapStyles,
                      }}
                    >
                      {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                  </div>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </main>




      <Footer1 />
    </div>
  );
};

export default PropertyDetails;
