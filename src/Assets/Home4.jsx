import React from "react";
import "./Home4.css";
import Button from "react-bootstrap/Button";
function Home4() {
  return (
    <div className="main-con-h4">
      <div className="connector-h4"></div>
      <div className="h4-con1">
        <img src="home4-1.svg" className="h4-img1" />
      </div>
      <div className="first-row">
        {/* <div className='sec1-fr'> */}
        <div className="sec1-fr">
          <div className="right-img">
            <img src="home2_2.svg" className="right-img-1" />
          </div>
          <div className="content2">
            <h1 className="fr-heading">Join us every Monday</h1>
            <p className="content-para2">
              SVN | Live® is our weekly commercial real estate property
              broadcast. New and featured properties, represented by SVN
              Advisors, are shared each Monday at 8:30 AM PT | 11:30AM ET to
              anyone in the industry who registers via our svn.com website.
            </p>
            <Button variant="outline-dark" className="fr-bttn">
              REGISTER HERE
            </Button>
          </div>
          {/* </div> */}
        </div>
        <div className="sec2-fr">
          <div className="img-sec2">
            <img src="home4-3.svg" className="img-sec-2-inner" />
            {/* <img src='home4-img2-1.jpg' className='img2-sec2-inner'/> */}
          </div>
          <div className="img2-sec2">
            <img src="home4-img2-1.jpg" className="img2-sec2-inner" />
          </div>
        </div>
      </div>

      <div className="second-row">
        <div className="sec1-sr">
          <div className="img-sec2">
            <img src="home4-img3.svg" className="img-sec-2-inner" />
          </div>
          <p className="sr-sec1-p">
            <span className="span-sr">9.6%</span> Report
          </p>
        </div>
        <div className="sec2-sr">
          <div className="left-img-sr">
            <img src="home2_3.svg" className="left-img-sr1" />
          </div>
          <div className="content-sr">
            <h1 className="content-heading-sr">
              Leveraging research and technology
            </h1>
            <p className="content-para">
              SVN | Research helps you keep pace with the rapidly changing
              commercial real estate industry. We track the underlying factors —
              macroeconomics, valuation, occupancy, rent — that drive the
              performance and value of commercial real estate assets and
              translate them into actionable insights.
            </p>
            <Button variant="outline-dark" className="sr-bttn">
              DOWNLOAD 9.6% REPORT
            </Button>
          </div>
        </div>
      </div>

      <div className="third-row">
        <div className="sec1-fr">
          <div className="right-img">
            <img src="home2_2.svg" className="right-img-1" />
          </div>
          <div className="content2">
            <h1 className="tr-heading">SVN | Live Weekly Property Blast</h1>
            <p className="content-para2">
              The most popular listings within the SVN Shared Value Network® all
              in one place. Each Monday we present a selection of our featured
              property listings on SVN | Live® and in our property email blast.
              Sign up now to get them straight to your inbox.
            </p>
            <Button variant="outline-dark" className="fr-bttn">
              SIGN UP HERE
            </Button>
          </div>
          {/* </div> */}
        </div>
        <div className="sec2-fr">
          <div className="img-sec2">
            <img src="home4-img4.svg" className="img-sec-2-inner" />
            {/* <img src='home4-img2-1.jpg' className='img2-sec2-inner'/> */}
          </div>
          <div className="img2-sec2">
            <img src="home4-img4-1.jpg" className="img2-sec2-inner" />
          </div>
        </div>
      </div>

      <div className="forth-row">
        <div className="sec1-sr">
          <div className="img-sec2">
            <img src="home4-img3.svg" className="img-sec-2-inner" />
          </div>
          {/* <p className='sr-sec1-p'><span className='span-sr'>9.6%</span> Report</p> */}
        </div>
        <div className="sec2-sr">
          <div className="left-img-sr">
            <img src="home4-2.svg" className="left-img-sr1" />
          </div>
          <div className="content-sr">
            <h1 className="content-heading-sr">SVN® on the Go Podcast</h1>
            <p className="content-para">
              Tune in to SVN’s premier podcast series to get an inside view of
              our unique approach to being Advisors to our clients. You’ll learn
              what our Advisors know with access to our internal tips, training,
              and updates on resources and industry trends.
            </p>
            <Button variant="outline-dark" className="fr-bttn">
              LISTEN HERE
            </Button>
          </div>
        </div>
      </div>

      <img src="home3_1.svg" className="h3-img1" />

      {/* Mobile Tablet */}
      <div className="Mob-con1">
        <div className="first-part">
       
    <h1 className='mob-head1'>Join us every Monday</h1>
        <p className='mob-para1'>SVN | Live® is our weekly commercial real estate property
              broadcast. New and featured properties, represented by SVN
              Advisors, are shared each Monday at 8:30 AM PT | 11:30AM ET to
              anyone in the industry who registers via our svn.com website.</p>
        {/* <img src='mob_img1.svg' className='mob-img1'/> */}
        <Button variant="outline-dark" className="mob-btn-fr">
              REGISTER HERE
            </Button>
       <div className="container">
            <div className="img-sec2">
            <img src="home4-3.svg" className="img-sec-2-inner" />
            
          </div>
          <div className="img2-sec2">
            <img src="home4-img2-1.jpg" className="img2-sec2-inner" />
          </div>
     </div>

        </div>

        <div className="first-part">
       
       <h1 className='mob-head1'> Leveraging research and technology</h1>
           <p className='mob-para1'>SVN | Research helps you keep pace with the rapidly changing
              commercial real estate industry. We track the underlying factors —
              macroeconomics, valuation, occupancy, rent — that drive the
              performance and value of commercial real estate assets and
              translate them into actionable insights.</p>
           {/* <img src='mob_img1.svg' className='mob-img1'/> */}
           <Button variant="outline-dark" className="mob-btn-fr">
              DOWNLOAD 9.6% REPORT
               </Button>
          <div className="container">
               <div className="img-sec2">
               <img src="home4-img3.svg" className="img-sec-2-inner" />
               
             </div>
             <div className="img2-sec2">
               {/* <img src="home4-img2-1.jpg" className="img2-sec2-inner" /> */}
             </div>
        </div>
   
           </div>

           <div className="first-part">
       
       <h1 className='mob-head1'> SVN | Live Weekly Property Blast</h1>
           <p className='mob-para1'>  The most popular listings within the SVN Shared Value Network® all
              in one place. Each Monday we present a selection of our featured
              property listings on SVN | Live® and in our property email blast.
              Sign up now to get them straight to your inbox.</p>
           {/* <img src='mob_img1.svg' className='mob-img1'/> */}
           <Button variant="outline-dark" className="mob-btn-fr">
              SIGN UP HERE
               </Button>
          <div className="container">
               <div className="img-sec2">
               <img src="home4-img3.svg" className="img-sec-2-inner" />
               
             </div>
             <div className="img2-sec2">
               <img src="home4-img4-1.jpg" className="img2-sec2-inner" />
             </div>
        </div>
   
           </div>

           <div className="first-part">
       
       <h1 className='mob-head1'> SVN® on the Go Podcast</h1>
           <p className='mob-para1'> Tune in to SVN’s premier podcast series to get an inside view of
              our unique approach to being Advisors to our clients. You’ll learn
              what our Advisors know with access to our internal tips, training,
              and updates on resources and industry trends.</p>
           {/* <img src='mob_img1.svg' className='mob-img1'/> */}
           <Button variant="outline-dark" className="mob-btn-fr">
              LISTEN HERE
               </Button>
          <div className="container">
               <div className="img-sec2">
               <img src="home4-img3.svg" className="img-sec-2-inner" />
               
             </div>
             <div className="img2-sec2">
               {/* <img src="home4-img4-1.jpg" className="img2-sec2-inner" /> */}
             </div>
        </div>
   
           </div>

      </div>
    </div>
  );
}

export default Home4;
