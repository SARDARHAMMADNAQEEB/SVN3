import React from 'react';
import { Link } from 'react-router-dom';
import './ResultsComponent.css'

function ResultsComponent({ people }) {
  console.log('Results Component - People:', people);
  return (
    <div className="searchResults" >
      {people.length === 0 ? (
        <p style={{ marginLeft: '50%' }}>No results found</p>
      ) : (
        <table id="brokerlist">
          <tbody>
            {people.map((person) => (
              <tr className="tr" key={person.id}>
                <td className="thumbnail">
                  <div className="thumnail-div">
                    <img src={person.image} className="thumbnail-img" width="50px" height="50px" />
                  </div>
                </td>
                <td className="user-info">
                  <div className="name">
                    <Link to={`/person/${person.id}`} target="_top" className='Link-person'>
                      {person.name}
                    </Link>
                    <span className="underline"></span>
                  </div>
                  <div className="info">
                    <a> {person.phone} </a>|
                    <a> {person.email} </a>|
                    <a> View Profile </a>|
                    <a> View Listings </a>
                  </div>
                </td>
                <td className="CompanyInfo">
                  <div className="div-1-company-info">
                    <div className="company-name">
                      <span>{person.company_name}</span>
                    </div>
                    <div className="company-address">{person.company_address}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResultsComponent;
