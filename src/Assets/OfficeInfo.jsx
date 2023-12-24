import {useState,React} from 'react';
import './OfficeInfo.css';
import { useNavigate } from 'react-router-dom';

const OfficeInfo = ({ office }) => {
    const navigate = useNavigate();

    const [showPropertyIds, setShowPropertyIds] = useState(true);

    const handleListingClick = async () => {
        try {
            if (office.listing_detail && Array.isArray(office.listing_detail) && office.listing_detail.length > 0) {
                console.log('Listing details:', office.listing_detail);

                // Modify the logic to join property IDs using a comma
                const propertyIds = office.listing_detail.map(property => property.id).join(',');
                console.log('Property IDS:', propertyIds);

                // Set a delay to show property IDs temporarily
                setTimeout(() => {
                  setShowPropertyIds(false);
              
                  // Update the URL to include the property IDs directly
                  navigate(`/properties/?ids=${propertyIds}`);
              }); // Adjust the delay time as needed
            } else {
                console.error('No listings available for this office.');
                // Optionally, you can provide feedback to the user that there are no listings.
                alert('No listings available for this office.');
            }
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };

    // const handleWebsiteClick = async () => {
    //   navigate({office.website_link});
    // }

    //   Similar for advisors
    const handleAdvisorsClick = async () => {
      try {
          if (office.advisors_detail && Array.isArray(office.advisors_detail) && office.advisors_detail.length > 0) {
              console.log('Advisors:', office.advisors_detail);
  
              // Modify the logic to join advisor IDs using a comma
              const advisorIds = office.advisors_detail.map(advisor => advisor.id).join(',');
              console.log('Advisor IDS:', advisorIds);
  
              // Set a delay to show advisor IDs temporarily
              setTimeout(() => {
                  // Add your logic to display or navigate to advisor details
                  // For now, it will just log the advisor IDs and navigate to the people2 route
                  console.log(`Navigate to advisors details: ${advisorIds}`);
                  navigate(`/peoples2/?ids=${advisorIds}`);
              }); // Adjust the delay time as needed
          } else {
              console.error('No advisors available for this office.');
              // Optionally, you can provide feedback to the user that there are no advisors.
              alert('No advisors available for this office.');
          }
      } catch (error) {
          console.error('Error during navigation:', error);
      }
  };

  return (
    <div className="office-info">
      <div className='row-office'>
        <h5>{office.name}</h5>
        <p className='p-office-mob'>{office.location}</p>
        <div className='bttn-div-officeinfo'>
          <button className='advisor-bttn-office' onClick={handleAdvisorsClick}>Advisors</button>
          <button className='advisor-bttn-office' onClick={handleListingClick}>Listings</button>
          <button className='advisor-bttn-office' >Website</button>
        </div>
      </div>
      <p className='p-office'>{office.location}</p>
     
    </div>
  );
};

export default OfficeInfo;
