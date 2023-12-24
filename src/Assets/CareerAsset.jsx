import React from 'react'
import Button from 'react-bootstrap/Button';
import './CareerAsset.css';
function CareerAsset() {
  return (
    <div className='main-con-career'>
        <div className='car-con-1'>
 <div className='inner-con-abt1'>
        <div className='sec-1-abt1'>
        <img src='about1.svg' alt='The SVN Difference' className='abt-img1'/>
        <img src='about1_mob_img1.svg' alt='The SVN Difference' className='abt-img3'/>
        <div className='inner-sec-1'>
          <h1 className='car-head1'>
          Supercharging CRE Careers
          </h1>
          <p className='sec-1-p1'>SVN is known for inclusivity and trust through our transparent sales process. Working with our Shared Value Network®, we create demand for properties through shared fee incentives, online marketing, and SVN | Live® property broadcasts.</p>
        </div>
        </div>
        <div className="connector-abt1"></div>
        
        <div className='sec-2-abt1'>
            <div className='sec2-inner'>
            <p className='p1-abt1'>SVN is the industry leader in collaboration. We believe that by working together, we can drive commercial real estate forward and prosper. Our culture gives every Advisor the opportunity to succeed on his or her own, while also being part of a larger team that works, plays, and wins together.

</p>
            <Button variant="outline-light" className='car-btn1'>SVN CAREER OPPORUNITIES / OFFICE DIRECTORY </Button>
        </div>
        
        </div>
       </div>
       <img src='about2.svg' className='abt1-img2'/>
</div>
<div>
    
</div>
<div className='div-1'>
    <h1>Experience the Shared Value Network&reg;</h1>
    <p>At SVN, you have a tremendous opportunity to grow your business and make an impact in the communities you serve. You will be
empowered to take your career where you want it to go in an inclusive and collaborative environment with supportive teammates.</p>
</div>

<div className='main-sec-career'>
    <div className='row1-career'>
        <div className='col-1'>
            <h3>Culture</h3>
        </div>
        <div className='col-2'>
            <h3>Global Brand Recognition</h3>
        </div>
        <div className='col-3'>
            <h3>Training and Mentoring</h3>
        </div>
    </div>
    <div className='row2-career'>
        <div className='r2-col-1'>
            <p>Since 1987, SVN’s has been built on our Core Covenants that emphasize collaboration, accountability, responsibility, and transparency. They are the personification of our values and what differentiates us from our competition.</p>
        </div>
        <div className='r2-col-2'>
            <p>Combine the 7th most recognized brand in the commercial real estate (CRE) industry with your outstanding reputation to compete for business at a national and global level.</p>
        </div>
        <div className='r2-col-3'>
            <p>SVN’s training and mentoring programs leverage a combination of award-winning online training, live training events, and local training, as well as one-on-one and small-group mentoring and coaching to help you build your career. These programs provide the tools necessary for both industry newcomers and seasoned CRE professionals to grow and prosper.</p>
        </div>
    </div>

</div>

<div className='mob-career'>
    <div className='col-1'>
            <h3>Culture</h3>
        </div>
        <div className='r2-col-1-mob'>
            <p>Since 1987, SVN’s has been built on our Core Covenants that emphasize collaboration, accountability, responsibility, and transparency. They are the personification of our values and what differentiates us from our competition.</p>
        </div>
         <div className='col-2'>
            <h3>Global Brand Recognition</h3>
        </div>
         <div className='r2-col-2-mob'>
            <p>Combine the 7th most recognized brand in the commercial real estate (CRE) industry with your outstanding reputation to compete for business at a national and global level.</p>
        </div>
         <div className='col-3'>
            <h3>Training and Mentoring</h3>
        </div>
        <div className='r2-col-3-mob'>
            <p>SVN’s training and mentoring programs leverage a combination of award-winning online training, live training events, and local training, as well as one-on-one and small-group mentoring and coaching to help you build your career. These programs provide the tools necessary for both industry newcomers and seasoned CRE professionals to grow and prosper.</p>
        </div>
</div>

<div className='div-4'>
<h1>Learn what culture means to us</h1>
    <p>Our company was founded on the belief that proactively cooperating and collaborating with the global commercial real estate community is the right thing to do for our clients and the best way to ensure maximum value for a property. We’ve expanded this ideology to include a Shared Value Network approach across all our service lines, offices and the communities where our Advisors live and work.</p>
    <Button variant="outline-dark" className='con3-btn1' href='/culture'>LEARN WHAT CULTURE MEANS TO US</Button>
</div>
    </div>
  )
}

export default CareerAsset