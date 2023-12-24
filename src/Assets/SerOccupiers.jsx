import React, {useState} from 'react';
import './SerOccupiers.css';
import Button from 'react-bootstrap/Button';
import OccupierCircle from './OccupierCircle';
function SerOccupiers() {
    const initialLinks = [
        {
          id: 1,
          title: 'Corporate Capital Markets',
          description: 'Whether your business is looking to tap into the capital markets to fuel further portfolio expansion or looking to use them to monetize existing real estate assets to power other corporate growth initiatives, SVN’s occupier and tenant practice has deep ties with debt and equity sources to help you achieve your corporate goals.',
          imgSrc: 'ocu-sector.svg',
        },
        {
          id: 2,
          title: 'Strategic Consulting & Advisory',
          description: 'Commercial real estate is a complicated field, requiring deep expertise to make the best decisions. Maximizing the ROI on your company’s real estate budget means making the right calls on whether to lease or own, correctly deciding where to locate your business, negotiating the right leases or purchases in the right spaces, in the right buildings, and strategically managing each space in your portfolio throughout your tenancy. SVN’s strategic consulting and advisory practice can assist your decision-makers to optimize your portfolio of spaces across office, retail, land and industrial property types.',
          imgSrc: 'ocu-sector.svg',
        },
        {
          id: 3,
          title: 'Corporate Solutions',
          description: 'SVN® Advisors serve businesses of all types with a full range of corporate solutions. Whether you are looking to outsource your entire corporate real estate department or just get help leasing a new location, we can assist you with office, industrial or retail spaces. In addition, our land practice can assist you in finding the perfect location on which to have a new building constructed.',
          imgSrc: 'ocu-sector.svg',
        },
        {
          id: 4,
          title: 'Tenant Representation',
          description: 'With a growing number of offices in more cities in the United States, SVN has in-network local experts to represent you wherever you go with a consistent high standard of service. Our local specialists can assist you in finding the right office, industrial or retail space and can leverage their market insight to ensure you negotiate the best possible transaction to drive the highest possible ROI on your company’s real estate portfolio.',
          imgSrc: 'ocu-sector.svg',
        },
        {
          id: 5,
          title: 'Lease Administration',
          description: 'SVN’s occupier and tenant service teams help you maximize ROI on your company’s real estate portfolio. We provide proactive management and reporting to make sure that you are maximizing your entire portfolio and keeping in compliance with the terms of your leases. Our Advisors monitor the critical dates in your lease to ensure that you stay well ahead of CAM audit, rent increase, renewal (or termination) option and expiration dates.',
          imgSrc: 'ocu-sector.svg',
        },
        {
          id: 6,
          title: 'Technology Services',
          description: 'Whether you have a few leases or thousands, or are in the retail, office, or industrial sectors, it is difficult to stay ahead of changing assets and terms, decentralized data, and evolving compliance standards. Our Advisors are well-versed in the latest technologies and have an unparalleled understanding of how to leverage them to remove risk and unnecessary cost by optimizing every lease from start to finish so that you can make informed, strategic decisions and stay focused on your core business.',
          imgSrc: 'ocu-sector.svg',
        },
      ];
    
      const [selectedLinkId, setSelectedLinkId] = useState(1);
      const selectedLink = initialLinks.find(link => link.id === selectedLinkId);
    
      const handleLinkClick = (id) => {
        setSelectedLinkId(id);
      };


  return (
    <div className='occu-div-1'>
    <h1>
    Services for Occupiers</h1>
        <p>
        With over 30 years in commercial real estate, more than 1,620 commercial real estate Advisors and staff, and in more offices in the United States than any other commercial real estate firm, SVN is perfectly positioned to create exceptional value for our clients, our colleagues, and our communities.

        </p>
        <OccupierCircle/>

        {/* <div className="background">
  <div className="central-circle">
    <div className="content">
      <h2>{selectedLink.title}</h2>
      <p>{selectedLink.description}</p>
    </div>
  </div>
  <div className="mini-circles">
    {initialLinks.map((link, index) => (
      <div
        key={link.id}
        className="mini-circle-container"
        style={{
          transform: `rotate(${index * (360 / initialLinks.length)}deg) translateY(150px)`,
        }}
      >
        <div
          className={`mini-circle ${selectedLinkId === link.id ? 'active' : ''}`}
          onClick={() => handleLinkClick(link.id)}
        >
          <img src={link.imgSrc} alt={`Link ${link.id}`} />
          <span>{link.title}</span>
        </div>
      </div>
    ))}
  </div>
</div> */}





        {/* <div className="background">
        <div className="central-circle">
          <div className="content">
            <h2>{selectedLink.title}</h2>
            <p>{selectedLink.description}</p>
          </div>
        </div>
        <div className="mini-circles">
          {initialLinks.map(link => (
            <div
              key={link.id}
              className={`mini-circle ${selectedLinkId === link.id ? 'active' : ''}`}
              onClick={() => handleLinkClick(link.id)}
            >
              <img src={link.imgSrc} alt={`Link ${link.id}`} />
              <span>{link.title}</span>
            </div>
          ))}
        </div>
      </div> */}

     {/* <div className='main-con-sector'>
        <div className='sector-main'>
            <div className='row1-sec'>
            <div className='sector-1'>
                <img src='ocu-sector.svg' className='sec-img1'/>
            </div>
          
            <div className='sector-2'>
                <img src='ocu-sector.svg' className='sec-img1'/>
            </div>
            </div>
            
            <div className='row2-sec'>
            <div className='sector-3'>
                <img src='ocu-sector.svg' className='sec-img1'/>
            </div>
            </div>
           
            <div className='sector-4'>
                <img src='ocu-sector.svg' className='sec-img1'/>
            </div>
            <div className='row3-sec'>
            <div className='sector-5'>
                <img src='ocu-sector.svg' className='sec-img1'/>
            </div>
            <div className='sector-6'>
                <img src='ocu-sector.svg' className='sec-img1'/>
            </div>
            </div>
            
        </div>
        </div>   */}





        <div className="div-4">
            <h1>
            Learn more about SVN&reg; Occupier services
            </h1>
            <Button variant="outline-dark" className='div-4-btn1'>SPEAK WITH US</Button>
</div> 
</div>
  )
}

export default SerOccupiers