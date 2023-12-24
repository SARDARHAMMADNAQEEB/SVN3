import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer1 from '../components/Footer1'
function Mexico() {
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
                                            <span className='span-south'>Mexico</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col2-south'>
                            <div className='heading-body-col2'>
                                <h2>New Opportunity</h2>
                            <p>SVN International Corp. (SVNIC) is offering an exciting opportunity to expand our emerging and dynamic SVN®️ commercial real estate brand by bringing our domestically successful business model to Mexico.</p>
                            <p>SVNIC is currently seeking a partner to develop the SVN brand within Mexico. Please contact us for further information.</p>
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

export default Mexico