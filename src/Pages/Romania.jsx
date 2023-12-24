import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer1 from '../components/Footer1'

function Romania() {
  return (
    <div>
        <Navbar2/>
        <main className='south-main'>
            <section className='bg-dark-south'>
                <div className='container-south-lg'>
                    <div className='heading-container-south'>
                        <div className='heading-start'></div>
                        <div className='col1-heading-title'>
                            <div className='heading-inner-col1-title'>
                                <div className='heading-col1-inner-title2'>
                                    <div className='title3-inner-col1'>
                                        <h1 className='title-h1-col1'>
                                            <img srcSet='logo2x.png 2x' src='logo2x2.png' alt='SVN' className='img-korea' />
                                            <br/>
                                            <span className='span-south'>Romania</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col2-south'>
                            <div className='heading-body-col2'>
                                <h2>SVN | Romania</h2>
                                <p>SVN | Romania consists of multiple specialty practices, such as condominium sales, multifamily, residential, land sales, research and valuation, credit and financial solutions and property management.</p>
                                <p>Our team has a combined experience of more than 12 years in the market, as well as a proven record of success, hands-on experience and superior knowledge within our asset class. We pride ourselves on our hands-on approach, as we are involved with our clients from the first meeting, through closing the deal and then continuing the relationship by managing the day-to-day operations for them if requested.</p>
                                <p>Our team structure consists today of a total of 131 employees and brokers: Top Management (2), Project Managers (7), Marketing Specialists (8), Residential & Commercial Brokers (30), Condominium Sales Consultants (41), Credit Specialists (7), Research & Valuation (4), Property Management & REO Services (24), Staff (8).</p>
                            </div>
                        </div>
                        <div className='heading-end-south'></div>
                    </div>
                </div>
            </section>
        </main>
        <Footer1/>
    </div>
  )
}

export default Romania