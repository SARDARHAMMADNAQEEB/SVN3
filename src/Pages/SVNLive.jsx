import React from "react";
import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";
import "./SVNLive.css";

function SVNLive() {
  return (
    <div>
      <Navbar1 />
      <section className="bg-dark-south">
        <div className="container-south-lg">
          <div className="heading-container-south">
            <div className="heading-start"></div>
            <div className="col1-heading-title">
              <div className="heading-inner-col1-title">
                <div className="heading-col1-inner-title2">
                  <div class="text-center text-lg-end text-white">
                    <h2 style={{textAlign:'right'}}>
                      SVN | Live<span class="headline-reg">®</span>
                    </h2>
                    <p style={{textAlign:'right'}}>
                      Each Monday at 8:30 AM PT | 11:30 AM ET, we present a
                      selection of our featured commercial real estate
                      properties on SVN | Live®. Be the first to know about new
                      properties in your area. Everyone is welcome to join.
                    </p>

                    <div class="vstack">
                      <a
                        role="button"
                        className="reg-bttn"
                      >
                        Register Here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col2-south">
              <div className="heading-body-col2">
                <h2 className="heading-svnlive">Property Blast</h2>
                <p className="p-svnlive">
                  Want to see the most popular listings within The SVN Shared
                  Value Networks®? Sign up for our weekly email property blasts.
                </p>
                <div className="live-signup-bttn">
                  <a href="/signup" className="bttn-signup-inner">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <div className="heading-end-south"></div>
          </div>
        </div>
      </section>
      <div className="space-height"></div>
      <section className="container2-svn-live">
        <article>
            <h1 className="live-con2-heading">Watch the most recent SVN Live</h1>
            <p className="live-con2-p">The SVN® brand was founded in 1987 out of a desire to improve the commercial real estate industry for all stakeholders through cooperation and organized competition. SVN is now a globally recognized commercial real estate brand united by a shared vision of creating value with clients, colleagues and our communities. When you choose SVN you mobilize the entire SVN organization of experts and all our trusted relationships to act on your behalf. This shared network is the SVN Difference.</p>
        </article>
      </section>

      <Footer1 />
    </div>
  );
}

export default SVNLive;
