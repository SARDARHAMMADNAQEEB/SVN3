import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Person.css';
import Navbar1 from '../components/Navbar1';
import Footer1 from '../components/Footer1';

function Person() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [activeTab, setActiveTab] = useState('aboutMe');
  const [propertyListings, setPropertyListings] = useState([]);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        console.log('Fetching person details for ID:', id);
        const response = await axios.get(`http://localhost:8000/api/account/open/people/${id}/`);
        const data = response.data;
        console.log('Fetched person details:', data);
        setPerson(data);

        const brokerId = data.id;  // Assuming the broker ID is directly available in the person data
        const listingsResponse = await axios.get(`http://localhost:8000/api/account/open/property/?broker=${id}`);
        const listingsData = listingsResponse.data;

        // Check if the response has the 'results' key
        if (listingsData.hasOwnProperty('results')) {
          const propertyListingsArray = listingsData.results;
          console.log('Fetched property listings:', propertyListingsArray);
          setPropertyListings(propertyListingsArray);
        } else {
          console.error('Invalid property listings response:', listingsData);
        }
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    };

    fetchPersonDetails();
  }, [id]);
  if (!person) {
    return <div>Loading...</div>;
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar1 />
      <div className="main-people">
        <div className="people-container">
          <h1 className="People-heading">
            <strong>People</strong>
          </h1>
          <div className='brokerShow'>
            <div className='headerBar'>
              <a className='backSearch' href='/peoples2'>&#60;&#60; Back to Search</a>
            </div>
            <table className='LayoutPerson'>
              <tbody className='tbodyPerson'>
                <tr className='trPerson'>
                  <td className='LeftColumnPer'>
                    <div className='ProfilePhoto'>
                      {person.image ? (
                        <img src={person.image} className='imageper' alt={person.name + " image"} />
                      ) : (
                        <div>No Image Available</div>
                      )}
                    </div>
                    <div className='LicenseInfo'>
                      {person.license_info}
                    </div>
                    <div className='ContactInfoPer'>
                      <table className='contactTable'>
                        <tbody className='tbodyContact'>
                          <tr className='trContact'>
                            <td>Phone:</td>
                            <td>{person.phone}</td>
                          </tr>
                          <tr className='trContact'>
                            <td>Email:</td>
                            <td>{person.email}</td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </td>

                  <td className='RighColumnPer'>
                    <h1 className='PerNameh1'>
                      <div className='perNamediv'>{person.name}</div>
                    </h1>
                    <div className='JobTitle'>
    {person.people_type.map((type, index) => (
      <div key={index}>{type.name}</div>
    ))}
  </div>
                    {/* <h3 className='Perh3'> */}
                      {/* <div className='JobTitle'>{person.people_type[0]}</div> */}
                    {/* </h3> */}
                    <div className='companyNamePer'>{person.company_name}</div>
                    <div className='tabs'>
                      <ul className='ultabs'>
                        <li
                          className={`tab${activeTab === 'aboutMe' ? 'Selected' : ''}`}
                          onClick={() => handleTabClick('aboutMe')}
                        >
                          About Me
                        </li>
                        <li
                          className={`tab${activeTab === 'listings' ? 'Selected' : ''}`}
                          onClick={() => handleTabClick('listings')}
                        >
                          Listings
                        </li>
                      </ul>
                    </div>

                    {/* Conditional rendering based on the active tab */}
                    {activeTab === 'aboutMe' && (
                      <div className='biography'>
                        {/* Display biography content here */}
                        Biography
                        <div className='biography-text'>
                          {person.biography}
                        </div>
                      </div>
                    )}

                    {activeTab === 'listings' && (
                      <div className='propertyListings'>
                        {/* Display property listings content here */}
                        {/* You can fetch and display property listings related to the person here */}
                        {/* <ul>
                          {propertyListings.map((listing) => (
                            <li key={listing.id}>
                              {listing.name}, {listing.property_type}, {listing.price}
                            </li>
                          ))}
                        </ul> */}
                        {propertyListings.map((listing) => (
                          <div key={listing.id} className='propertyLists'>
                            <div className='propertyListWrapper'>
                              <div className='propertyListinner'>
                                <div className='prop-main'>
                                  <table className='prop-table'>
                                    <tbody className='prop-tbody'>
                                      <tr className='prop-tr'>
                                        <td className='prop-td'>
                                          <a className='imgLink' href='#'>
                                            <img src={listing.images[0].image} className='img-prop-list' alt={listing.name + 'img'} />
                                          </a>
                                        </td>
                                        <td className='prop-address-info-td'>
                                          <a className='aprop-sale'>{listing.name}</a>
                                          
                                          <p className='prop-loc'>
                                            <img src='https://assets.buildout.com/assets/map-marker-tiny-cdee388259210afd200237a4c089c5cbd4a09eb5969d7ee297c691e1510ecb13.png' className='loc'/>
                                            {' '+ listing.location}
                                          </p>
                                          <p className='prop-desc'>
                                            {listing.description}
                                          </p>
                                        
                                        </td>
                                        <td className='propertyInfo-list-td'>
                                            <div>${listing.price}</div>
                                            <div style={{fontSize:'14px'}}>{listing.size}</div>
                                            <div>{listing.property_type}</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            {/* <p>{listing.name}, {listing.property_type}, {listing.price}</p> */}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default Person;