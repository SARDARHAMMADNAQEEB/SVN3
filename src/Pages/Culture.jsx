import React, {useState} from 'react'
import Navbar1 from '../components/Navbar1'
import Footer1 from '../components/Footer1'
import CultureAssets from '../Assets/CultureAssets';
import Rotation from '../Assets/Rotation';
// import Button from 'react-bootstrap/Button';

function Culture() {
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
    <div>
        <Navbar1/>
  {/* <div className="image-container">
    <div className='orbit'>
    <img
      src="svn1.svg"
      alt="Rotating Image"
      className={`rotating-image ${isRotating ? 'rotate' : ''}`}
      onMouseEnter={stopRotation}
      onMouseLeave={startRotation}
  
    />
  
    <div className={`image-text ${isHovered ? 'visible' : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
        <h1>
        The SVN Shared Value Network&reg;
        </h1>
        <p>SVN was founded on the belief that proactively cooperating and collaborating with the global commercial real estate community is the right thing to do for our clients and the best way to ensure maximum value for a property. We’ve expanded this ideology to include a Shared Value Network® approach across all our service lines, offices, and the communities where our Advisors live and work. Together with our clients, colleagues, and communities, we create greater value through openness, inclusivity and innovation.</p>
    </div>
    </div>
    </div> */}
    <Rotation/>
    <CultureAssets/>
    <Footer1/>
    </div>
  )
}
export default Culture