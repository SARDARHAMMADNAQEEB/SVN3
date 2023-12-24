import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer1 from '../components/Footer1'
import './International.css';
function International() {
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
                                        {/* <img srcSet='logo2x.png 2x' src='logo2x2.png' alt='SVN' className='img-korea' />
                                        <br/>
                                        <span className='span-south'>Qatar</span> */}
                                       SVN<span className='reg'>&reg; </span> Global is Expanding!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col2-south'>
                        <div className='heading-body-col2'>
                            {/* <h2>SVN| Qatar</h2> */}
                      <p>The SVN brand is growing and with over 200 global offices, 1620+ Advisors and staff and more than $12.5 Billion in sales and leasing, we have the commercial real estate experiences and expertise to meet all of your needs. Select the country you are interested in from the list below to learn more about the SVN partnership and the services that they offer.</p>
                        </div>
                    </div>
                    <div className='heading-end-south'></div>
                </div>
            </div>
        </section>

        <section className='container-intenational'>
            <article className='article-international'>
                <div className='international-row-col'>
                    <div className='column-international'>
                        <div className='country-office-con'>
                            <div className='country-image-con'>
                                <div className='country-image-inner'>
                                    <img src='south-korea.jpg' alt='SVN-SOUTH KOREA' className='country-main-img'/>
                                </div>
                            </div>
                            <a className='button-country' href='/southkorea'>
                                <strong>South Korea</strong>
                            </a>
                        </div>
                    </div>

                    <div className='column-international'>
                        <div className='country-office-con'>
                            <div className='country-image-con'>
                                <div className='country-image-inner'>
                                    <img src='australia.jpg' alt='SVN-SOUTH KOREA' className='country-main-img'/>
                                </div>
                            </div>
                            <a className='button-country' href='/australia'>
                                <strong>Australia</strong>
                            </a>
                        </div>
                    </div>
                    
                    <div className='column-international'>
                        <div className='country-office-con'>
                            <div className='country-image-con'>
                                <div className='country-image-inner'>
                                    <img src='romania.jpg' alt='SVN-SOUTH KOREA' className='country-main-img'/>
                                </div>
                            </div>
                            <a className='button-country' href='/romania'>
                                <strong>Romania</strong>
                            </a>
                        </div>
                    </div>

                    <div className='column-international'>
                        <div className='country-office-con'>
                            <div className='country-image-con'>
                                <div className='country-image-inner'>
                                    <img src='canada.jpg' alt='SVN-SOUTH KOREA' className='country-main-img'/>
                                </div>
                            </div>
                            <a className='button-country' href='/canada'>
                                <strong>Canada</strong>
                            </a>
                        </div>
                    </div>
                    
                    <div className='column-international'>
                        <div className='country-office-con'>
                            <div className='country-image-con'>
                                <div className='country-image-inner'>
                                    <img src='mexico.jpg' alt='SVN-SOUTH KOREA' className='country-main-img'/>
                                </div>
                            </div>
                            <a className='button-country' href='/canada'>
                                <strong>Mexico</strong>
                            </a>
                        </div>
                    </div>

                    <div className='column-international'>
                        <div className='country-office-con'>
                            <div className='country-image-con'>
                                <div className='country-image-inner'>
                                    <img src='Qatar.jpg' alt='SVN-SOUTH KOREA' className='country-main-img'/>
                                </div>
                            </div>
                            <a className='button-country' href='/canada'>
                                <strong>Qatar</strong>
                            </a>
                        </div>
                    </div>
                </div>

                <div className='end-international'>
                    <h3>Interested in bringing SVN to your country?</h3>
                    <a href='/contact'>
                        <strong>Contact Us</strong>
                        </a>
                </div>
            </article>
        </section>
    </main>
    <Footer1/>
</div>
  )
}

export default International