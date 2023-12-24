import React, {useState} from 'react'
import Navbar1 from '../components/Navbar1'
import Footer1 from '../components/Footer1'
import './Signup.css'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Signup = ()=> {


    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [state, setState] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const apiKey = 'Z4ajofTx.lxIZBPl780HDhNcClHUuXsuLOYZujFSw'; // Replace with your actual API key

        const response = await axios.post('http://localhost:8000/api/account/signup/', {
            email,
            name,
            state
        }, {
            headers: {
                'Authorization': `Api-Key ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
            console.log('Signup successful:', response.data);
            toast.success("Subscribed successfully!", {
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
                console.error('Signup failed:', error.response.data);
                toast.error("Subscribed failed. Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
                hideProgressBar: true, // Hide the progress bar
                className: "error-toast",
                  });
                // Handle specific response status errors
            } else if (error.request) {
                console.error('Signup failed:', 'No response received');
                // Handle no response error
            } else {
                console.error('Signup failed:', error.message);
                // Handle other errors
            }
        }

       

    };

    const clearFormFields = () => {
        setName("");
        setState("");
        setEmail("");
        
       
      };


  return (
    <div>
        <Navbar1/>
        <ToastContainer/>
        <div className='signup-main'>
            <section className='signup-section'>
                <article className='signup-article'>
                    <div className='block-spacer'></div>
                    <h2>Receive our weekly Property Blast in
                        <br/>
                        your inbox today
                    </h2>
                    <pre>
                        <code></code>
                    </pre>
                    <p>
                    Enter your name, email address, and state below to subscribe.
                    </p>
                </article>
            </section>

            <section className='signup-section'>
                <article className='signup-article'>
                    <div className='layout-signup'>
                        <div className='left-layout-signup'>
                            <figure>
                                <img src='home4-img4-1.jpg' alt='Building' className='img-signup'/>
                            </figure>
                        </div>
                        <div className='right-layout-signup'>
                            <div className='inner-right-signup'>
                                <form method='POST' className='form-signup' onSubmit={handleSubmit}>
                                    <div className='name-form-main'>
                                      
                                        <div className='input-name'>
                                            <input onChange={(e) => setName(e.target.value)} name='name' placeholder='Name*' required type='text' value={name} ></input>
                                        </div>
                                    </div>

                                    <div className='name-form-main'>
                                        
                                        <div className='input-name'>
                                            <input onChange={(e) => setEmail(e.target.value)} name='email' placeholder='Email*' required type='email' value={email} ></input>
                                        </div>
                                    </div>
                                    <div className='name-form-main'>
                                        <select onChange={(e) => setState(e.target.value)} required value={state}>
                                            
                                            <option disabled selected value={'Select State*'}>Select State*</option>
                                            <option value={'Alabama'}>Alabama</option>
                                            <option value={'Alaska'}>Alaska</option>
                                            <option value={'Arizona'}>Arizona</option>
                                            <option value={'Arkansas'}>Arkansas</option>
                                            <option value={'California'}>California</option>
                                            <option value={'Colorado'}>Colorado</option>
                                            <option value={'Connecticut'}>Connecticut</option>
                                            <option value={'Delaware'}>Delaware</option>
                                            <option value={'Florida'}>Florida</option>
                                            <option value={'District of Columbia'}>District of Columbia</option>
                                            <option value={'Georgia'}>Georgia</option>
                                            <option value={'Hawaii'}>Hawaii</option>
                                            <option value={'Idaho'}>Idaho</option>
                                            <option value={'Illinois'}>Illinois</option>
                                            <option value={'Indiana'}>Indiana</option>
                                            <option value={'Iowa'}>Iowa</option>
                                            <option value={'Kansas'}>Kansas</option>
                                            <option value={'Kentucky'}>Kentucky</option>
                                            <option value={'Louisiana'}>Louisiana</option>
                                            <option value={'Maine'}>Maine</option>
                                            <option value={'Maryland'}>Maryland</option>
                                            <option value={'Massachusetts'}>Massachusetts</option>
                                            <option value={'Michigan'}>Michigan</option>
                                            <option value={'Minnesota'}>Minnesota</option>
                                            <option value={'Mississippi'}>Mississippi</option>
                                            <option value={'Missouri'}>Missouri</option>
                                            <option value={'Montana'}>Montana</option>
                                            <option value={'Nebraska'}>Nebraska</option>
                                            <option value={'Nevada'}>Nevada</option>
                                            <option value={'New Hampshire'}>New Hampshire</option>
                                            <option value={'New Jersey'}>New Jersey</option>
                                            <option value={'New Mexico'}>New Mexico</option>
                                            <option value={'New York'}>New York</option>
                                            <option value={'North Carolina'}>North Carolina</option>
                                            <option value={'North Dakota'}>North Dakota</option>
                                            <option value={'Ohio'}>Ohio</option>
                                            <option value={'Oklahoma'}>Oklahoma</option>
                                            <option value={'Oregon'}>Oregon</option>
                                            <option value={'Pennsylvania'}>Pennsylvania</option>
                                            <option value={'Pennsylvania'}>Pennsylvania</option>
                                            <option value={'Rhode Island'}>Rhode Island</option>
                                            <option value={'South Carolina'}>South Carolina</option>
                                            <option value={'South Dakota'}>South Dakota</option>
                                            <option value={'Tennessee'}>Tennessee</option>
                                            <option value={'Texas'}>Texas</option>
                                            <option value={'Utah'}>Utah</option>
                                            <option value={'Vermont'}>Vermont</option>
                                            <option value={'Virginia'}>Virginia</option>
                                            <option value={'Virgin Island'}>Virgin Island</option>
                                            <option value={'Washington'}>Washington</option>
                                            <option value={'West Virginia'}>West Virginia</option>
                                            <option value={'Wisconsin'}>Wisconsin</option>
                                            <option value={'Wyoming'}>Wyoming</option>
                                            <option value={'Outside of the United States'}>Outside of the United States</option>

                                        </select>

                                    </div>
                                    <div className='text-container-signup'>
                                        <div className='rich-text'>
                                            <p>
                                            SVN needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our 
                                             <a href='/privacy' rel='noopener'> Privacy Policy</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='button-signup'>
                                        <div className='actions'>
                                            <input value='Submit' type='submit' onClick={handleSubmit}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
        <Footer1/>
    </div>
  )
}

export default Signup