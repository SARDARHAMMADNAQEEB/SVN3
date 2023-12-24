import React from 'react';
import './Footer1.css';

function Footer1() {
  return (
    <div className='main-footer'>
        <div className='first-div'>
            <div className='links-f'>
            <a href='/properties'>PROPERTIES</a>
            <a href='/offices'>OFFICES</a>
            <a href='/advisors'>ADVISORS</a>
            </div>
            <p className='p1'>Want to work with SVN? <a href='/contact' className='inquiry'> SUBMIT A VENDOR INQUIRY</a></p>
            <p className='copyright'>COPYRIGHT © 2023 SVN INTERNATIONAL CORP. ALL RIGHTS RESERVED All SVN® offices are independently owned and operated.</p>
        </div>
        <div className='second-div'>
          <div className='links-s'>
            <a href='/careers'>CAREERS</a>
            <a href='/affiliate'>AFFILIATE YOUR OFFICE</a>
            <a href='/news'>SVN NEWS</a>
            <a href='/contact'>CONTACT US</a>
            <a href='/privacy'>SVN PRIVACY POLICY AND TERMS OF USE</a>
            <a href='/sitemap'>SITEMAP</a>
            <a href='/accessibility'>ACCESSIBILITY STATEMENT</a>
          </div>
        </div>
    </div>
  )
}

export default Footer1