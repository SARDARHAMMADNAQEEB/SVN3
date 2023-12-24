import React from 'react'
import { useState } from 'react';
import './ImageRotate.css';
import Button from 'react-bootstrap/Button';
function ImageRotate() {
    const [isRotating, setIsRotating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(true);
    };
    const startRotation = () => {
      setIsRotating(true);
    };
  
    const stopRotation = () => {
      setIsRotating(false);
    };
  
    return (
      <div className="image-container">
        <div className='orbit'>
        <img
          src="svn1.svg"
          // src='home1.svg'
          alt="Rotating Image"
          className={`rotating-image ${isRotating ? 'rotate' : ''}`}
          onMouseEnter={stopRotation}
          onMouseLeave={startRotation}
      
        />
      
        <div className={`image-text ${isHovered ? 'visible' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <h1>
                <span className='span1'>
                    Collective
                </span> Strength. Accelerated <span className='span2'>Growth</span>.
            </h1>
            <div className='line'/>
            <p>SVN® delivers commercial real estate brokerage solutions that accelerate client growth through the power of shared data, knowledge, and opportunities.</p>
            <Button variant="outline-dark" className='btn_prop'>FIND PROPERTIES</Button>
        </div>
        
        </div>
        <img 
            src='svn_arrow(2).svg'
            alt='Orbit Arrow'
            className={`orbit_arrow ${isHovered ? 'visible' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        />

        <div className='play-main'>
      <h1 className='Svn-diff'>The SVN Difference</h1>
      <h2>Play Video</h2>
      <div className='play-con'>
      <a href='/'><img src='video-btn.svg' alt='Play Video' className='play-btn'/></a>
      </div>
      <div className="connector-line"></div>
          {/* <div className='asset3'>
            <img src='asset1.svg' className='asset3-img'/>
          </div> */}
          <br/>
          <br/>
          <br/>
        </div>
        
      </div>
    );
  };
  
  

export default ImageRotate