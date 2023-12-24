import React, { useState } from "react";
import './Ser-Investors.css';
import Button from 'react-bootstrap/Button';

function SerInvestors() {
    // const [selectedLink, setSelectedLink] = useState(1);

    const initialLinks = [
      { id: 1, title: "Industrial", description: "SVN® Commercial Real Estate Advisors offer both national reach and local expertise across all industrial property types. Whether you’re looking to buy, sell, or lease light industrial or flex space, a large industrial park, or a free-standing net-leased industrial building, SVN Advisors stand ready to serve your needs. With their specific knowledge and experience, our team of experts are well versed in the factors that impact industrial investment, such as market demographics, site plans, tenant mixes, tenant credit, and traffic patterns, and they bring the highest value proposition to their clients. Our advisors can assist you with sales, leasing, property management, capital markets and accelerated sales."  },
      { id: 2, title: "Multifamily", description: 'SVN® Commercial Real Estate Advisors who participate in the national multifamily practice offer both national reach and local expertise. Whether you’re looking to buy or sell a single property or a geographically diversified portfolio, SVN Advisors have the capability to advise you on your multifamily needs. Advisors routinely work on properties ranging in scope and scale from a small apartment property in a tertiary market to large institutional caliber multi-state portfolios and can assist you with sales, property management, capital markets and accelerated sales.'},
      { id: 3, title: "Office" , description : 'SVN® Commercial Real Estate Advisors offer both national reach and local expertise across all office property types. Whether you’re looking to buy, sell, or lease space in a suburban Class A building, a Class C office building in a tertiary market, or a CBD trophy high-rise, SVN Advisors stand ready to serve your needs and can assist you with sales, leasing, property management, capital markets and accelerated sales.'},
      { id: 4, title: "Retail" , description: 'SVN® Commercial Real Estate Advisors who form the national retail practice offer both national reach and local expertise across all retail property types. Whether you’re looking to buy, sell, or lease space in a local strip center, larger anchored or shadow anchored centers, large power centers, or freestanding net leased investments, SVN Advisors stand ready to serve your needs and can assist you with sales, leasing, property management, capital markets and accelerated sales.'},
      { id: 5, title: "Land & Development" ,description: 'SVN® Commercial Real Estate Advisors offer both national reach and local expertise across all land property types. Whether you’re looking to buy or sell land for development purposes, agricultural applications or for long-term hold, SVN Advisors stand ready to serve your needs. With their specific knowledge of the factors that impact raw land, our team of experts bring the highest value proposition to their clients. SVN Advisors can assist you with sales, capital market and accelerated sales.'},
      { id: 6, title: "Single Tenant Investment" ,description: 'SVN® Commercial Real Estate Advisors have a strong presence in the Single Tenant Investment arena. Sharing fees and exposing our listings the entire brokerage community separates us from the competitors and allows all buyers to compete on a level playing field. As a buyer, SVN Advisors can provide you with quality properties leased to strong companies. As a seller, we will find you the best buyer for your asset by leveraging the power of the SVN Difference. SVN Advisors can assist you with sales, capital markets and accelerated sales.' },
      { id: 7, title: "Hospitality" , description:'SVN® Commercial Real Estate Advisors offer both national reach and local expertise across all hospitality property types. Whether you’re looking to buy or sell a motel in a smaller market, a boutique property, major flagged or unflagged properties, or destination resorts, SVN Advisors stand ready to serve your needs. With specific knowledge about the factors that impact hospitality properties such as market demographics, competitive property information, ADRs, occupancy break-even analysis, amenity assessments, and more, SVN Advisors know how to add value across all aspects of the hospitality property spectrum. Our team of experts can assist you with sales, management, capital markets and accelerated sales.' },
      { id: 8, title: "Healthcare" ,description:'SVN® Commercial Real Estate Advisors bring expertise to all aspects of healthcare real estate. Because the lines between hospitals, medical offices, congregate care, senior housing and retail medical space are blurrier than ever, we take a holistic approach to find the right solutions to your healthcare real estate needs. SVN Advisors can assist you with sales, leasing, property management, capital markets, and accelerated sales.'},
      { id: 9, title: "Property Management", description: 'SVN® Commercial Real Estate Advisors offer both national reach and local expertise across all property management types. SVN® Property Management services include our exclusive insurance product, opportunities to increase NOI, holistic risk management, comprehensive reporting, and technological infrastructure that enhances operational efficiency.' },
      { id: 10, title: "Restaurant" , description:'SVN® Commercial Real Estate Advisors understand restaurant real estate and operations. Whether you need help filling vacant space, preparing your restaurant business and its real estate for sale or finding a single-tenant net leased property, our restaurant experts can devise an strategy to maximize value. SVN advisors can assist you with restaurant sales, leasing, property management, capital markets, and accelerated sales.'},
      { id: 11, title: "Self-Storage" , description:'SVN® Commercial Real Estate Advisors offer both national reach and local expertise in the brokerage of self-storage properties. Whether are looking to market a rural outdoor property or a newly-built climate controlled facility in a high-density urban location, we create efficient markets to maximize values for your asset. SVN advisors can assist you with sales, property management, capital markets, and accelerated sales.'},
      { id: 12, title: "SFR Portfolio", description:'SVN® Commercial Real Estate Advisors are at the leading edge of the emerging SFR / BFR portfolio space. Portfolios of single-family residences and of build-for-rent houses offer healthy investment returns with multiple exit strategies. Our SFR / BFR Portfolio specialists can help you acquire a new portfolio, dispose of an asset or assist you in valuing your current holdings.' },
      {id: 13, title: "Golf & Resorts",description: "SVN® Commercial Real Estate Advisors can offer both national reach and local expertise when it comes to providing in-depth knowledge of this unique investment type. Golf and lifestyle resorts are increasingly becoming a desired investment commodity, gaining the attention of investors on both a national and international level. SVN Golf and Resort experts know how to add value across all aspects of this specialty property spectrum and can assist you with sales, management, capital markets and accelerated sales."},
      {id: 14,title: "Marinas",description: "SVN® Commercial Real Estate Advisors understand marina and marine business real estate and operations. They have the knowledge, contacts, and strategic marketing resources required to successfully acquire and divest specialty marine properties and related businesses as distinct asset classes with specific risk-return characteristics. SVN Marina experts analyze, underwrite, position, and promote marina assets to the right universe of buyers, investors, strategic acquirers, and lifestyle seekers."},
      {id: 15,title: "Auction",description: "SVN® Commercial Real Estate Advisors have a significant in-house service few other commercial real estate firms offer; Auction! The auction method of accelerated marketing and sales has seen significant and steady growth for decades, and is clearly no longer just for troubled assets. With the tremendous expansion of online sales in nearly all things, SVN has brought the future of commercial real estate transactions here today. While live, onsite, open-cry and sealed bid auctions are still extremely popular and still all available options at SVN, many buyers are getting enthused about the opportunity to search for assets, perform their due diligence, bid and purchase investment properties, all online from the comfort of their home or office. Sellers are also extremely pleased with the “certainty of execution” afforded them with auction; especially online. SVNAS (SVN Auction Services) is providing their online technology to SVN and all of its Advisors, harnessing the power of its bidding platform to every SVN office across the country. Whether you are buying or selling, put the power of Auction to work for your assets with SVN Auction."},
    
 
    ];
  
     const [isLinkListVisible, setLinkListVisible] = useState(false);

  const toggleLinkList = () => {
    setLinkListVisible(!isLinkListVisible);
  };

    const [selectedLinkId, setSelectedLinkId] = useState(1);
    const selectedLink = initialLinks.find(link => link.id === selectedLinkId);
  
    const handleLinkClick = (id) => {
      setSelectedLinkId(id);
    };

  return (
    <div className='main-con-investors'>
        <div className='div-1'>
            <h1>
                Services for Investors & Landlords</h1>
                <p>
                Our collective experience means we provide world-class expertise, strategy, and asset specific understanding across the 12 main asset classes. Together, we attract a stronger chance of success, more opportunities and an increase in the growth and the overall potential of your investment and your property portfolio.
                </p>
        </div>

        <div className='div-3'>

{/* <div className="mobile-dev"> */}
   <div className="header">
        {/* <h2>Mobile App</h2> */}
        <button
          className={`dropdown-button ${isLinkListVisible ? 'active' : ''}`}
          onClick={toggleLinkList}
        >
          {selectedLink.title}
        </button>
      </div>
      {isLinkListVisible && (
        <div className="link-list">
          {initialLinks.map(link => (
            <a
              key={link.id}
              // href="#"
              onClick={() => {
                handleLinkClick(link.id);
                toggleLinkList();
              }}
              className={selectedLinkId === link.id ? 'active' : ''}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
{/* </div> */}



<div className="links">
      
        <ul className="link-list">
          {initialLinks.map(link => (
            <li key={link.id}>
              <a
                // href=""
                onClick={() => handleLinkClick(link.id)}
                className={selectedLinkId === link.id ? 'active' : ''}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
        <div className="divider"></div>
      <div className="description">
      
        <div>
          <h3>{selectedLink.title}</h3>
          <p>{selectedLink.description}</p>
        </div>
      </div>
     
        </div>

<div className="div-4">
            <h1>
              Grow your wealth with SVN® Investor services
            </h1>
            <Button variant="outline-dark" className='div-4-btn1'>SPEAK WITH US</Button>
</div>

    </div>
  )
}

export default SerInvestors