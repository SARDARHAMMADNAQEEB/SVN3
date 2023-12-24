import React from 'react'
import Navbar1 from '../components/Navbar1'
import Footer1 from '../components/Footer1'
import Button from 'react-bootstrap/Button';
import SerOccupiers from '../Assets/SerOccupiers';
function Occupiers() {
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
            Occupiers
          </h1>
          <p className='sec-1-p1'>SVN® helps occupiers and tenants prosper. Our Advisors collaborate with the most geographically diverse network of commercial real estate specialists to help you find the right properties. Our progressive approach, coupled with leading service in every asset class, produces stronger outcomes for our clients.</p>
        </div>
        </div>
        <div className="connector-abt1"></div>
        
        <div className='sec-2-abt1'>
            <div className='sec2-inner'>
            <p className='p1-abt1'>Whether your business requires simple tenant representation or a full set of corporate real estate solutions including, but not limited to, lease administration, corporate capital markets, strategic consultation and advisory and technology services, SVN Advisors have the expertise and experience to help you prosper.</p>
            <Button variant="outline-light" className='abt1-btn1'>SPEAK WITH US</Button>
           
        </div>
        
        </div>
       </div>
       <img src='about2.svg' className='abt1-img2'/>
       </div>

     <SerOccupiers/>
        <Footer1/>
    </div>
  )
}

export default Occupiers