import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer1 from '../components/Footer1'
import './SouthKorea.css'

function SouthKorea() {
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
                                            <span className='span-south'>South Korea</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col2-south'>
                            <div className='heading-body-col2'>
                                <h2>South Korea</h2>
                                <p>SVN | KOREA is an integrated partnership between DTZPAC Group operating 11 nationwide branches. SVN | KOREA provides commercial real estate services for Seoul-headquartered corporate entities, focusing on the cross-border deal & office relocation, regionally targeting North America.</p>
                                <p>SVN | KOREA is committed to delivering client-oriented & trusted real estate services with SVN Internatinal and will be exploring new opportunities with SVN partners.</p>
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

export default SouthKorea