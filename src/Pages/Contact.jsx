import React, { useState } from "react";
import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";
import "./Contact.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [firstname, setFirstName] = useState(null);
  const [secondname, setSecondName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // const apiKey = '7QHEU9Lh.w0RBncKPwlU0lDXRcVPqUUcjRVFUkMhP'; // Replace with your actual API key

    const response = await axios.post('http://localhost:8000/api/account/contact-us/', {
      first_name: firstname,
      last_name: secondname,
        email,
        phone,
        message
    }, {
        // headers: {
        //     'Authorization': `Api-Key ${apiKey}`,
        //     'Content-Type': 'application/json',
        // },
    });
        console.log('Contact Us successfull:', response.data);
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
        hideProgressBar: true, // Hide the progress bar
        className: "success-toast",
        onClose: () => {
          // scrollToTop();
          clearFormFields();
        },
        });
        // Add further handling like updating state or displaying success message
 } catch (error) {
        if (error.response) {
            console.error('Contact Us failed:', error.response.data);
            toast.error("Form submission failed. Please try again.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
          hideProgressBar: true, // Hide the progress bar
          className: "error-toast",
            });
            // Handle specific response status errors
        } else if (error.request) {
            console.error('Contact Us failed:', 'No response received');
            // Handle no response error
        } else {
            console.error('Contact Us failed:', error.message);
            // Handle other errors
        }
    }
};

// const scrollToTop = () => {
//   window.scrollTo(0, 0); // Scroll to the top of the page
// };

const clearFormFields = () => {
  setFirstName("");
  setSecondName("");
  setEmail("");
  setPhone("");
  setMessage("");
};

  return (
    <div>
      <Navbar1 />
      <ToastContainer />
      <div className="main-contact">
        <div className="space-height"></div>
        <h1>Contact Us</h1>
        <pre>
          <code></code>
        </pre>
        <section className="container-section-contact">
          <p className="contact-p">
            Please note that if you have questions about a particular property,
            you will need to contact the local office or Advisor associated with
            that property. All SVN® offices are independently owned and
            operated.
          </p>
        </section>
        <div className="space-height"></div>
        <section className="contact-container-second">
          <div className="second-con-div1">
            <div className="div1-leftdiv-contact">
              <div className="image-contact">
                <div className="image-inner-contact">
                  <img
                    decoding="async"
                    src="contact.png"
                    className="contact-img"
                  />
                </div>
              </div>
            </div>

            <div className="div2-rightdiv-contact">
              <div className="div2-inner-contact">
                <div className="inner-col1">
                  <p className="inner-col1-p">
                    SVN International Corp.
                    <br />
                    185 Devonshire Street, M102
                    <br />
                    Boston, MA 02110
                  </p>
                </div>
                <div className="inner-col2">
                  <div className="col2-gap1">
                    <div>
                      P:
                      <a href="tel:12345">12345</a>
                    </div>
                    <div>F: 12345</div>
                    <div>
                      E:
                      <a href="info@gmail.com">info@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='space-height'></div> */}
              <div className="form-main-contact">
                <form method='POST' onSubmit={handleSubmit}>
                  <div className="firstname-div">
                    <div className="input">
                      <input
                        placeholder="First name*"
                        type="text"
                        name="firstname"
                        autoComplete="given-name"
                        required
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="firstname-div">
                    <div className="input">
                      <input
                        placeholder="Last name*"
                        type="text"
                        name="lastname"
                        autoComplete="given-name"
                        required
                        value={secondname}
                        onChange={(e) => setSecondName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="firstname-div">
                    <div className="input">
                      <input
                        placeholder="Email*"
                        type="email"
                        name="email"
                        autoComplete="given-name"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="firstname-div">
                    <div className="input">
                      <input
                        placeholder="Phone*"
                        type="number"
                        name="phone"
                        autoComplete="given-name"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="firstname-div">
                    <div className="input">
                      <textarea
                        placeholder="Message*"
                        type="text"
                        name="message"
                        spellCheck="false"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="submit-bttn-contact">
                    <div className="actions-submit">
                      <input type="submit" name="Submit" value="submit" onClick={handleSubmit} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
     
      <Footer1 />
    </div>
  );
}

export default Contact;
