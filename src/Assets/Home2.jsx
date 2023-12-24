import React from 'react';
import { useState , useEffect} from 'react';
import './Home2.css';
function Home2() {

    const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='main-conh2'>
          <div className='asset3'>
            <img src='asset1.svg' className='asset3-img'/>
          </div>
       
        <div className='con2'>
            <h1 className='heading1'>The Future of Commercial Real Estate</h1>
            <div className='connector2'></div>
        </div>
        
        <div className={`con3 ${scrollDirection === 'up' ? 'fade-left-in' : 'fade-left-out'}`}>
            <div className='sec1-con3'>
            
            </div>
           
            <div className='sec2-con3'>
                <div className='left-img'>
                    <img src='home2_1.svg' className='left-img-1'/>
                </div>
                <div className='content'>
                    <h1 className='content-heading'>Technology and automation</h1>
                    <p className='content-para'>Our clients harness emerging technologies and leading automation tools to own, occupy, and manage their commercial real estate in smarter ways. SVN Advisors help you leverage the right technologies to stay ahead of the curve.</p>
                </div>
            </div>
        </div>

        {/* Con4 */}

        <div className='con4'>
            <div className='sec1-con4'>
            <div className='right-img'>
                    <img src='home2_2.svg' className='right-img-1'/>
                </div>
                <div className='content2'>
                    <h1 className='content-heading2'>Data ubiquity</h1>
                    <p className='content-para2'>In a world where data rules, SVN Advisors drive value for their clients by collecting and curating data into manageable, actionable insights for you. Together, we devise expert strategies for your commercial real estate portfolio.</p>
                </div>
            </div>
           
            <div className='sec2-con4'>
               
            </div>
        </div>

        {/* Con5 */}
        <div className='con5'>
            <div className='sec1-con5'>
            
            </div>
           
            <div className='sec2-con5'>
                <div className='left-img'>
                    <img src='home2_3.svg' className='left-img-2'/>
                </div>
                <div className='content3'>
                    <h1 className='content-heading3'>Disintermediation</h1>
                    <p className='content-para3'>Today, transactions are digitized, data is generated in new ways, and previously discrete people, objects, and services are now connected. SVN Advisors employ a holistic approach to commercial real estate, with a focus on leveraging our connections and cooperation to drive growth with our clients.</p>
                </div>
            </div>
        </div>
     
{/* Mobile Tablet */}
<div className='mob-con1'>
<div className='mob-con2'>
            <h1 className='mob-head'>The Future of Commercial Real Estate</h1> 
        </div>
    <div className='mob-con3'>
    <h1 className='mob-head1'>Technology and automation</h1>
        <p className='mob-para1'>Our clients harness emerging technologies and leading automation tools to own, occupy, and manage their commercial real estate in smarter ways. SVN Advisors help you leverage the right technologies to stay ahead of the curve.</p>
        <img src='mob_img1.svg' className='mob-img1'/>
    
    </div>

    <div className='mob-con3'>
    <h1 className='mob-head1'>Data ubiquity</h1>
        <p className='mob-para1'>In a world where data rules, SVN Advisors drive value for their clients by collecting and curating data into manageable, actionable insights for you. Together, we devise expert strategies for your commercial real estate portfolio.</p>
        <img src='mob_img2.svg' className='mob-img1'/>
    
    </div>

    <div className='mob-con3'>
    <h1 className='mob-head1'>Disintermediation</h1>
        <p className='mob-para1'>Today, transactions are digitized, data is generated in new ways, and previously discrete people, objects, and services are now connected. SVN Advisors employ a holistic approach to commercial real estate, with a focus on leveraging our connections and cooperation to drive growth with our clients.</p>
        <img src='mob_img3.svg' className='mob-img2'/>
    
    </div>
</div>


    </div>
  )
}

export default Home2