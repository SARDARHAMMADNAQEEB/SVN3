import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer1 from '../components/Footer1'

function Australia() {
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
                                            <span className='span-south'>Australia</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col2-south'>
                            <div className='heading-body-col2'>
                                <h2>SVN | Australia is an all encompassing Western Australian based property company that provides expert commercial solutions.</h2>
                                <p>The group incorporates a Commercial Management and Sales and Leasing division. All services are operated from SVN | Perth, our centrally located head office.</p>
                                <p>The team with SVN | Australia is ideally equipped to offer a level of services that extends well beyond the basic sales, leasing and management transactions. This company has been built on a model that factors professionalism and service delivery as the priority, continually exceeding the expectations of the most discerning investors, buyers and sellers.</p>
                                <p>When you consult with a SVN | Australia representative you are dealing with an expert in their field. The employee policy is centered on attracting and retaining the leading professionals in the property industry. Securing experienced and committed personnel is imperative to ensuring our professionalism and service delivery.</p>
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

export default Australia