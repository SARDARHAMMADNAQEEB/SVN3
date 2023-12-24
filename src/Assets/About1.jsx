import React from 'react';
import './About1.css';
import Button from 'react-bootstrap/Button';
function About1() {
   
  return (
    <div className='main-con-abt1'>
        <div className='inner-con-abt1'>
        <div className='sec-1-abt1'>
        <img src='about1.svg' alt='The SVN Difference' className='abt-img1'/>
        <img src='about1_mob_img1.svg' alt='The SVN Difference' className='abt-img3'/>
        <div className='inner-sec-1'>
          <h1 className='sec-1-head'>
            The SVN® Difference
          </h1>
          <p className='sec-1-p1'>Our global coverage and amplified outreach drive success for all. Our model is built on collaboration and transparency and supported by an inclusive culture. We promote properties and share fees to build connections and create wealth together.</p>
        </div>
        </div>
        <div className="connector-abt1"></div>
        
        <div className='sec-2-abt1'>
            <div className='sec2-inner'>
            <p className='p1-abt1'>The SVN® brand was founded in 1987 out of a desire to improve the commercial real estate industry for all stakeholders through cooperation and organized competition. SVN is now a globally recognized commercial real estate brand united by a shared vision of creating value with clients, colleagues and our communities. When you choose SVN you mobilize the entire SVN organization of experts and all our trusted relationships to act on your behalf. This shared network is the SVN Difference.</p>
            <Button variant="outline-light" className='abt1-btn1'>MEET THE TEAM</Button>
            <Button variant="outline-light" className='abt1-btn2'>MEET THE ADVISORY BOARD</Button>
        </div>
        
        </div>
       </div>
       <img src='about2.svg' className='abt1-img2'/>

       <div className='inner-con2-abt1'>
          <h1 className='con2-head'>SVN by the numbers</h1>
          <p className='con2-p'>Our focus on moving the commercial real estate industry forward has attracted a strong and powerful team of real estate professionals. Together, we have grown the SVN® brand into a globally recognized establishment that continues to grow and prosper.</p>
       <div className='con3-img'>
        <div className='con3-col1'>
          <h3 className='col1-head1'>200+</h3>
          <p className='col1-p1'>Offices Worldwide</p>
          <h3 className='col1-head2'>$21.1B</h3>
          <p className='col1-p2'>Total Value of Sales & Lease Transactions</p>
          <h3 className='col1-head3'>8</h3>
          <p className='col1-p3'>Countries & Expanding</p>
        </div>
        <div className='con3-col2'>
       <img src='about-img-4.svg' className='img1-con3'/>
       <img src='about1_mob_img2.svg' className='img2-mob-con3'/>
       </div>
       <div className='con3-col3'>
          <h3>2,000+</h3>
          <p>Advisors and Staff</p>
          <h3>57M+</h3>
          <p>SF in Properties Managed</p>
          <h3>7+7</h3>
          <p>Core Services & Specialty Practice Areas</p>
        </div>
       </div>
       </div>

<div className='main-team-con'>
<div className='leader-con'>
<h1 className='leader-head'>
          Our Leadership Team
          </h1>

        <img src='about-img-5.svg' className='leader-img1'/>
</div>

<div className='advisor-con'>
<h1 className='advisor-head'>
          Board of Advisors
          </h1>

        {/* <img src='about-img-5.svg' className='leader-img1'/> */}
</div>

</div>
       
    </div>
  )
}

export default About1