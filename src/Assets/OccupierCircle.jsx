import React, { useState } from 'react';
import './OccupierCircle.css';

function OccupierCircle() {
  const initialLinks = [
            { id: 1,
              title: 'Corporate Capital Markets',
              description: 'Whether your business is looking to tap into the capital markets to fuel further portfolio expansion or looking to use them to monetize existing real estate assets to power other corporate growth initiatives, SVN’s occupier and tenant practice has deep ties with debt and equity sources to help you achieve your corporate goals.',
            //   imgSrc: 'ocu-sector.svg',
            },
            {
              id: 2,
              title: 'Strategic Consulting & Advisory',
              description: 'Commercial real estate is a complicated field, requiring deep expertise to make the best decisions. Maximizing the ROI on your company’s real estate budget means making the right calls on whether to lease or own, correctly deciding where to locate your business, negotiating the right leases or purchases in the right spaces, in the right buildings, and strategically managing each space in your portfolio throughout your tenancy. SVN’s strategic consulting and advisory practice can assist your decision-makers to optimize your portfolio of spaces across office, retail, land and industrial property types.',
            //   imgSrc: 'ocu-sector.svg',
            },
            {
              id: 3,
              title: 'Corporate Solutions',
              description: 'SVN® Advisors serve businesses of all types with a full range of corporate solutions. Whether you are looking to outsource your entire corporate real estate department or just get help leasing a new location, we can assist you with office, industrial or retail spaces. In addition, our land practice can assist you in finding the perfect location on which to have a new building constructed.',
            //   imgSrc: 'ocu-sector.svg',
            },
            {
              id: 4,
              title: 'Tenant Representation',
              description: 'With a growing number of offices in more cities in the United States, SVN has in-network local experts to represent you wherever you go with a consistent high standard of service. Our local specialists can assist you in finding the right office, industrial or retail space and can leverage their market insight to ensure you negotiate the best possible transaction to drive the highest possible ROI on your company’s real estate portfolio.',
            //   imgSrc: 'ocu-sector.svg',
            },
            {
              id: 5,
              title: 'Lease Administration',
              description: 'SVN’s occupier and tenant service teams help you maximize ROI on your company’s real estate portfolio. We provide proactive management and reporting to make sure that you are maximizing your entire portfolio and keeping in compliance with the terms of your leases. Our Advisors monitor the critical dates in your lease to ensure that you stay well ahead of CAM audit, rent increase, renewal (or termination) option and expiration dates.',
            //   imgSrc: 'ocu-sector.svg',
            },
            {
              id: 6,
              title: 'Technology Services',
              description: 'Whether you have a few leases or thousands, or are in the retail, office, or industrial sectors, it is difficult to stay ahead of changing assets and terms, decentralized data, and evolving compliance standards. Our Advisors are well-versed in the latest technologies and have an unparalleled understanding of how to leverage them to remove risk and unnecessary cost by optimizing every lease from start to finish so that you can make informed, strategic decisions and stay focused on your core business.',
            //   imgSrc: 'ocu-sector.svg',
            },
            // {
            //     id:7,
            // }
          ];
        
  

  const [selectedLinkId, setSelectedLinkId] = useState(1);

  // Find the selected link based on the selectedLinkId
  const selectedLink = initialLinks.find((link) => link.id === selectedLinkId);

  // Handle button click
  const handleLinkClick = (id) => {
    setSelectedLinkId(id);
  };

  return (
    <div>
      <section className='container-occupier'>
        <article className='occupier-article'>
          <div className='occupiers-sector-nav-con'>
            {initialLinks.map((link) => (
              <button
                key={link.id}
                className={`occupiers-sector-button${
                  link.id === selectedLinkId ? ' selected' : ''
                }`}
                aria-selected={link.id === selectedLinkId}
                role='tab'
                onClick={() => handleLinkClick(link.id)}
              >
                <div className='occupier-sector-inner'>
                  <div className='occupier-sector-image'>
                    <img decoding='async' src='sector.svg' className='sector-img-real' alt='Sector' />
                  </div>
                  <h5 className='sector-title-real'>{link.title}</h5>
                </div>
              </button>
            ))}
          </div>

          <div className='tab-circle-content'>
            <div className='tab-pane' role='tabpanel'>
              <h3 className='tab-pane-h3'>{selectedLink.title}</h3>
              {selectedLink.description}
            </div>
          </div>
        </article>
      </section>

      {/* Mobile */}
      <section className='occu-mob-container'>
        <article className='mob-article-ocu'>
              <div className='occupiers-sector-nav-con-mob'>
                {initialLinks.map((link) => (
                  <button
                    key={link.id}
                    className={`occupiers-sector-button-mob${
                      link.id === selectedLinkId ? ' selected' : ''
                    }`}
                    aria-selected={link.id === selectedLinkId}
                    role='tab'
                    onClick={() => handleLinkClick(link.id)}
                  >
                    <div className='occupier-sector-inner-mob'>
                      <div className='occupier-sector-image-mob'>
                        <img decoding='async' src='sector.svg' className='sector-img-real' alt='Sector' />
                      </div>
                      <h5 className='sector-title-real-mob'>{link.title}</h5>
                    </div>
                  </button>
                ))}
              </div>

              <div className='tab-circle-content-mob'>
            <div className='tab-pane-mob' role='tabpanel'>
              <h3 className='tab-pane-h3-mob'>{selectedLink.title}</h3>
              {selectedLink.description}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default OccupierCircle;
