import React from 'react'
import Navbar1 from '../components/Navbar1'
import Footer1 from '../components/Footer1'
import Button from 'react-bootstrap/Button';
import SerInvestors from '../Assets/Ser-Investors';
function Investors() {
  return (

    <div>
        <Navbar1/>
        <div className='main-con-abt1'>
        <div className='inner-con-abt1'>
        <div className='sec-1-abt1'>
        <img src='about1.svg' alt='The SVN Difference' className='abt-img1'/>
        <img src='about1_mob_img1.svg' alt='The SVN Difference' className='abt-img3'/>
        <div className='inner-sec-1'>
          <h1 className='sec-1-head'>
            Investors
          </h1>
          <p className='sec-1-p1'>The power of the SVN® Shared Value Network means a more holistic approach to the buyer and selling process. The collective strength of our resources, data and opportunities results in more rewarding sale and deal potential for our clients.</p>
        </div>
        </div>
        <div className="connector-abt1"></div>
        
        <div className='sec-2-abt1'>
            <div className='sec2-inner'>
            <p className='p1-abt1'>SVN is a full-service commercial real estate firm helping investors and landlords grow their portfolios. Our advisors leverage the strength and expertise of a network of SVN professionals across the US and the world to assist you with buying and selling your investment real estate property. In addition, our leasing, capital markets, and property management services help to make your ownership experience simpler, more productive, and more profitable. We address each client’s individual needs and build a property-specific strategy, harnessing the power of collaboration to drive outsized success.</p>
            <Button variant="outline-light" className='abt1-btn1'>SPEAK WITH US</Button>
           
        </div>
        
        </div>
       </div>
       <img src='about2.svg' className='abt1-img2'/>
       </div>

    <SerInvestors/>

        <Footer1/>
        </div>
  )
}

export default Investors