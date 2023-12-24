import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer1 from '../components/Footer1'

function Qatar() {
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
                                            <span className='span-south'>Qatar</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col2-south'>
                            <div className='heading-body-col2'>
                                <h2>SVN| Qatar</h2>
                            <p>SVN| QATAR creates real estate solutions to prepare our clients for today’s and tomorrow’s world of changes. With the vision to bring their extensive knowledge & expertise to Qatar’s real estate market, we aim to build a strong foundation to better serve our distinguished clients.</p>
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

export default Qatar