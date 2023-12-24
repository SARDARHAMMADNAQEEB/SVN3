import React, { useState, useEffect } from "react";
import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";
import "./Peoples.css";
import axios from "axios";
function Peoples() {
  const [specialties, setSpecialties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(100);
  const [People, setPeople] = useState([]);
  const [people, setpeople] = useState([]);
  const [displayRange, setDisplayRange] = useState({ start: 1, end: 10 });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(
      displayRange.start,
      displayRange.end,
      searchQuery,
      selectedSpecialties
    );
  }, [displayRange, searchQuery, selectedSpecialties]);

  const fetchData = async (start, end, searchQuery, selectedSpecialties) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/account/open/people/?start=${start}&end=${end}&search=${searchQuery}&specialties=${selectedSpecialties.join(
          ","
        )}`
      );

      setTotalPages(response.data.count);
      setPeople(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredPeople = selectedSpecialties.length
    ? people.filter(filterPeopleBySpecialty)
    : people;

  const searchFilteredPeople = filteredPeople.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.officeName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const paginatedPeople = searchFilteredPeople.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );

  {
    paginatedPeople.map((person) => (
      <tr className="tr" key={person.id}>
        <td className="thumbnail">
          <div className="thumnail-div">
            <img
              src={person.image}
              className="thumbnail-img"
              width="50px"
              height="50px"
            />
          </div>
        </td>
        <td className="user-info">
          <div className="name">
            <a target="_top">{person.name}</a>
            <span className="underline"></span>
          </div>
          <div className="info">
            <a> {person.phone} </a>|<a> {person.email} </a>|
            <a> View Profile </a>|<a> View Listings </a>
          </div>
        </td>
        <td className="CompanyInfo">
          <div className="div-1-company-info">
            <div className="company-name">
              <span>{person.companyName}</span>
            </div>
            <div className="company-address">{person.companyAddress}</div>
          </div>
        </td>
      </tr>
    ));
  }
  const handleGroupAllClick = (group) => {
    const checkboxes = document.querySelectorAll(`.${group} input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
      handleCheckboxChange(checkbox, checkboxes);
    });
  };
  
  const handleGroupNoneClick = (group) => {
    const checkboxes = document.querySelectorAll(`.${group} input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      handleCheckboxChange(checkbox, checkboxes);
    });
  };
  
  

  // const updateDisplayRange = (start, end) => {
  //   setDisplayRange({ start, end });
  // };

  // useEffect(() => {
  //   // Fetch initial data when the component mounts
  //   fetchData(displayRange.start, displayRange.end);
  // }, [displayRange]);

  // const handleNext = () => {
  //   const newStart = displayRange.end + 1;
  //   const newEnd = newStart + 9; // Displaying 10 items per page
  //   updateDisplayRange(newStart, newEnd);
  // };

  // const handlePrevious = () => {
  //   let newStart = displayRange.start - 10;
  //   if (newStart < 1) newStart = 1; // Ensure the start doesn't go below 1
  //   const newEnd = newStart + 9; // Displaying 10 items per page
  //   updateDisplayRange(newStart, newEnd);
  // };

  useEffect(() => {
    // const handleGroupAllClick = (group) => {
    //   const checkboxes = document.querySelectorAll(
    //     `.${group} input[type="checkbox"]`
    //   );
    //   checkboxes.forEach((checkbox) => {
    //     checkbox.checked = true;
    //   });
    // };

    // const handleGroupNoneClick = (group) => {
    //   const checkboxes = document.querySelectorAll(
    //     `.${group} input[type="checkbox"]`
    //   );
    //   checkboxes.forEach((checkbox) => {
    //     checkbox.checked = false;
    //   });
    // };

    // const attachGroupHandlers = (group) => {
    //   const allLink = document.querySelector(`.${group} .All`);
    //   const noneLink = document.querySelector(`.${group} .None`);
    //   const checkboxes = document.querySelectorAll(
    //     `.${group} input[type="checkbox"]`
    //   );

    //   if (allLink && noneLink) {
    //     allLink.addEventListener("click", () => handleGroupAllClick(group));
    //     noneLink.addEventListener("click", () => handleGroupNoneClick(group));

    //     checkboxes.forEach((checkbox) => {
    //       checkbox.addEventListener("change", () =>
    //         handleCheckboxChange(checkbox, checkboxes)
    //       );
    //     });
    //   }
    // };

    // attachGroupHandlers("saleSpecialties");
    // attachGroupHandlers("leaseSpecialties");
    // attachGroupHandlers("productSpecialties");

    const attachGroupHandlers = (group) => {
      const allLink = document.querySelector(`.${group} .All`);
      const noneLink = document.querySelector(`.${group} .None`);
      const checkboxes = document.querySelectorAll(`.${group} input[type="checkbox"]`);
  
      if (allLink && noneLink) {
        allLink.addEventListener("click", () => handleGroupAllClick(group));
        noneLink.addEventListener("click", () => handleGroupNoneClick(group));
  
        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", () =>
            handleCheckboxChange(checkbox, checkboxes)
          );
        });
      }
    };
  
    attachGroupHandlers("saleSpecialties");
    attachGroupHandlers("leaseSpecialties");
    attachGroupHandlers("productSpecialties");

    return () => {
      // Remove event listeners if necessary
    };
  }, []);

  const handleCheckboxChange = (changedCheckbox, checkboxes) => {
    const checkedCheckboxes = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    );
    const allChecked = checkedCheckboxes.length === checkboxes.length;

    checkboxes.forEach((checkbox) => {
      if (allChecked && !checkedCheckboxes.includes(changedCheckbox)) {
        checkbox.disabled = true;
      } else {
        checkbox.disabled = false;
      }
    });
  };
  const handleCheckboxChangeSpecialties = (specialty) => {
    const updatedSpecialties = [...selectedSpecialties];

    if (updatedSpecialties.includes(specialty)) {
      updatedSpecialties.splice(updatedSpecialties.indexOf(specialty), 1);
    } else {
      updatedSpecialties.push(specialty);
    }

    setSelectedSpecialties(updatedSpecialties);
    setCurrentPage(1);
  };

  const filterPeopleBySpecialty = (person) => {
    return selectedSpecialties.some((specialty) =>
      person.specialties.includes(specialty)
    );
  };
  useEffect(() => {
    fetchData(displayRange.start, displayRange.end);
  }, [displayRange]);


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/account/open/people/")
      .then((response) => {
        console.log(response.data);

        // Check if response.data.results is an array before setting state
        if (Array.isArray(response.data.results)) {
          setPeople(response.data.results);
        } else {
          console.error("Results property is not an array:", response.data);
          // Handle the case where the results property is not an array
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error
      });

    setSpecialties([
      "Asset Recovery (SVNART)",
      "Auction",
      "Charter Schools",
      "Corporate Real Estate",
      "Distressed Assets",
      "Golf & Resorts",
      "Hospitality",
      "Industrial",
      "Institutional Capital Markets",
      "Land & Development",
      "Leasing",
      "Marinas",
      "Medical Office",
      "Multifamily",
      "Office",
      "Property Management",
      "Restaurant",
      "Retail",
      "Self Storage",
      "SFR Portfolios",
      "Single Tenant Investments",
      "Telecom & Leasing Infrastructure",
      "Golf & Resorts",
      "Industrial",
      "Medical Office",
      "Miscellaneous",
      "Office",
      "Retail",
      "Tenant Representation",
      "Charter School",
      "Corporate Lease Back",
      "Corporate Sales",
      "Golf & Resorts",
      "Hospitality",
      "Industrial",
      "Land",
      "Marinas",
      "Medical Office",
      "Mobile Homes",
      "Multifamily/Apartment",
      "Office",
      "Property Management",
      "Retail",
      "Self Storage",
      "Senior Housing",
    ]);
  }, []);

  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleCheckboxChangeSpecialties = (specialty) => {
  //   const updatedSpecialties = [...selectedSpecialties];

  //   if (updatedSpecialties.includes(specialty)) {
  //     // Remove the specialty if it's already selected
  //     updatedSpecialties.splice(updatedSpecialties.indexOf(specialty), 1);
  //   } else {
  //     // Add the specialty if it's not selected
  //     updatedSpecialties.push(specialty);
  //   }

  //   setSelectedSpecialties(updatedSpecialties);
  //   setCurrentPage(1); // Reset to the first page when updating filters
  // };

  // const filterPeopleBySpecialty = (person) => {
  //   // Check if the person has at least one selected specialty
  //   return selectedSpecialties.some((specialty) =>
  //     person.specialties.includes(specialty)
  //   );
  // };

  // const filteredPeople = selectedSpecialties.length
  //   ? people.filter(filterPeopleBySpecialty)
  //   : currentPeople;

  return (
    <div>
      <Navbar1 />
      <div className="main-people">
        <div className="people-container">
          <h1 className="People-heading">
            <strong>People</strong>
          </h1>
          <div id="brokersIndex">
            <div id="advance-plugin">
              <div className="top-filters">
                <div className="searchbox">
                  <input
                    id="searchbox"
                    autoComplete="off"
                    placeholder="Search by name, location, or office name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div id="searchbttn">
                    <img src="search1.png" className="img-1-search" />
                    <img
                      src="https://assets.buildout.com/assets/loading-results-spinner-search-79b0aa952513d2ec7d0970966c33db5cccbc28fd3eb3c1ef8365e7c0b56501b5.gif"
                      className="searchingicon"
                    />
                  </div>
                </div>
                <img
                  src="people_divider_filter.png"
                  className="divider-filter"
                />
                <span className="searchPageInfo">
                  Displaying
                  <span id="range">
                    {" "}
                    {/* {`${displayRange.start}-${displayRange.end}`}{" "} */}
                  </span>
                  of
                  <span id="count"> {totalPages}</span>
                </span>
                <span className="prevNextButtons">
                  <div
                    id="prevButton"
                    // onClick={handlePrevious}
                    // className={displayRange.start === 1 ? "disabled" : ""}
                  ></div>
                  {/* <div id="nextButton" onClick={handleNext}></div> */}
                </span>
              </div>

              <div className="layout-people">
                <table className="layout">
                  <tbody>
                    <tr>
                      <td className="sideFilters">
                        <div className="filterSection saleSpecialties">
                          <div className="sectionHeader">
                            Sale Specialties
                            <span className="sectionLinks">
                              <a
                                className="All"
                                onClick={() =>
                                  handleGroupAllClick("saleSpecialties")
                                }
                              >
                                All
                              </a>
                              <a
                                className="None"
                                onClick={() =>
                                  handleGroupNoneClick("saleSpecialties")
                                }
                              >
                                None
                              </a>
                            </span>
                          </div>
                          {/* <div className="sectionBody">
                            {console.log("Specialties Array:", specialties)}{" "}
                            Debugging statement
                            {specialties.map((specialty) => (
                              <div key={specialty}>
                                <input
                                  id={specialty}
                                  type="checkbox"
                                  value={specialty}
                                  checked={selectedSpecialties.includes(
                                    specialty
                                  )}
                                  onChange={() =>
                                    handleCheckboxChangeSpecialties(specialty)
                                  }
                                />
                                <label htmlFor={specialty}>{specialty}</label>
                              </div>
                            ))}
                          </div> */}

                          <div className="sectionBody">
                            <div>
                              <input
                                id="Charter"
                                type="checkbox"
                                value="10"
                                checked
                              />
                              <label for="Charter">Charter School</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Corporate"
                                type="checkbox"
                                value="12"
                              />
                              <label for="Corporate">
                                Corporate Lease Back
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="CorporateSales"
                                type="checkbox"
                                value="11"
                              />
                              <label for="CorporateSales">
                                Corporate Sales
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="GolfResorts"
                                type="checkbox"
                                value="37"
                              />
                              <label for="GolfResorts">
                                Golf &amp; Resorts
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Hospitality"
                                type="checkbox"
                                value="5"
                              />
                              <label for="Hospitality">Hospitality</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Industrial"
                                type="checkbox"
                                value="3"
                              />
                              <label for="Industrial">Industrial</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Land"
                                type="checkbox"
                                value="6"
                              />
                              <label for="Land">Land</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Marinas"
                                type="checkbox"
                                value="27"
                              />
                              <label for="Marinas">Marinas</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="MedicalOffice"
                                type="checkbox"
                                value="45"
                              />
                              <label for="MedicalOffice">Medical Office</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="MobileHomes"
                                type="checkbox"
                                value="7"
                              />
                              <label for="MobileHomes">Mobile Homes</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Multifamily"
                                type="checkbox"
                                value="1"
                                className="name-filters"
                              />
                              <label for="Multifamily">
                                Multifamily/Apartment
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Office"
                                type="checkbox"
                                value="4"
                                className="name-filters"
                              />
                              <label for="Office">Office</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="PropertyManagement"
                                type="checkbox"
                                value="28"
                                className="name-filters"
                              />
                              <label for="PropertyManagement">
                                Property Management
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Retail"
                                type="checkbox"
                                value="2"
                                className="name-filters"
                              />
                              <label for="Retail">Retail</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="SelfStorage"
                                type="checkbox"
                                value="8"
                                className="name-filters"
                              />
                              <label for="SelfStorage">Self Storage</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="SeniorHousing"
                                type="checkbox"
                                value="9"
                                className="name-filters"
                              />
                              <label for="SeniorHousing">Senior Housing</label>
                            </div>
                          </div>
                        </div>

                        <div className="filterSection leaseSpecialties">
                          <div className="sectionHeader">
                            Lease Specialties
                            <span className="sectionLinks">
                              <a className="All">All</a>
                              <a className="None">None</a>
                            </span>
                          </div>
                          <div class="sectionBody">
                            <div>
                              <input
                                checked
                                id="GolfResorts38"
                                type="checkbox"
                                value="38"
                                className="name-filters"
                              />
                              <label for="GolfResorts38">
                                Golf &amp; Resorts
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Industrial15"
                                type="checkbox"
                                value="15"
                                className="name-filters"
                              />
                              <label for="Industrial15">Industrial</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="MedicalOffice46"
                                type="checkbox"
                                value="46"
                                className="name-filters"
                              />
                              <label for="MedicalOffice46">
                                Medical Office
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Miscellaneous16"
                                type="checkbox"
                                value="16"
                                className="name-filters"
                              />
                              <label for="Miscellaneous16">Miscellaneous</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Office13"
                                type="checkbox"
                                value="13"
                                className="name-filters"
                              />
                              <label for="Office13">Office</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Retail14"
                                type="checkbox"
                                value="14"
                                className="name-filters"
                              />
                              <label for="Retail14">Retail</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="TenantRepresentation17"
                                type="checkbox"
                                value="17"
                                className="name-filters"
                              />
                              <label for="TenantRepresentation17">
                                Tenant Representation
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="filterSection productSpecialties">
                          <div className="sectionHeader">
                            Product Council
                            <span className="sectionLinks">
                              <a className="All">All</a>
                              <a className="None">None</a>
                            </span>
                          </div>
                          <div class="sectionBody">
                            <div>
                              <input
                                checked
                                id="AssetRecovery29"
                                type="checkbox"
                                value="29"
                                className="name-filters"
                              />
                              <label for="AssetRecovery29">
                                Asset Recovery (SVNART)
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Auction24"
                                type="checkbox"
                                value="24"
                                className="name-filters"
                              />
                              <label for="Auction24">Auction</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="CharterSchools30"
                                type="checkbox"
                                value="30"
                                className="name-filters"
                              />
                              <label for="CharterSchools30">
                                Charter Schools
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="CorporateRealEstate31"
                                type="checkbox"
                                value="31"
                                className="name-filters"
                              />
                              <label for="CorporateRealEstate31">
                                Corporate Real Estate
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="DistressedAssets40"
                                type="checkbox"
                                value="40"
                                className="name-filters"
                              />
                              <label for="DistressedAssets40">
                                Distressed Assets
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="GolfResorts39"
                                type="checkbox"
                                value="39"
                                className="name-filters"
                              />
                              <label for="GolfResorts39">
                                Golf &amp; Resorts
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Hospitality21"
                                type="checkbox"
                                value="21"
                                className="name-filters"
                              />
                              <label for="Hospitality21">Hospitality</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Industrial32"
                                type="checkbox"
                                value="32"
                                className="name-filters"
                              />
                              <label for="Industrial32">Industrial</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="InstitutionalCapitalMarkets41"
                                type="checkbox"
                                value="41"
                                className="name-filters"
                              />
                              <label for="InstitutionalCapitalMarkets41">
                                Institutional Capital Markets
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="LandDevelopment42"
                                type="checkbox"
                                value="42"
                                className="name-filters"
                              />
                              <label for="LandDevelopment42">
                                Land &amp; Development
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Leasing33"
                                type="checkbox"
                                value="33"
                                className="name-filters"
                              />
                              <label for="Leasing33">Leasing</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Marinas34"
                                type="checkbox"
                                value="34"
                                className="name-filters"
                              />
                              <label for="Marinas34">Marinas</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="MedicalOffice35"
                                type="checkbox"
                                value="35"
                                className="name-filters"
                              />
                              <label for="MedicalOffice35">
                                Medical Office
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Multifamily20"
                                type="checkbox"
                                value="20"
                                className="name-filters"
                              />
                              <label for="Multifamily20">Multifamily</label>
                            </div>
                            <div>
                              <input
                                id="Office19"
                                type="checkbox"
                                value="19"
                                className="name-filters"
                              />
                              <label for="Office19">Office</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="PropertyManagement36"
                                type="checkbox"
                                value="36"
                                className="name-filters"
                              />
                              <label for="PropertyManagement36">
                                Property Management
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Restaurant43"
                                type="checkbox"
                                value="43"
                                className="name-filters"
                              />
                              <label for="Restaurant43">Restaurant</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="Retail18"
                                type="checkbox"
                                value="18"
                                className="name-filters"
                              />
                              <label for="Retail18">Retail</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="SelfStorage23"
                                type="checkbox"
                                value="23"
                                className="name-filters"
                              />
                              <label for="SelfStorage23">Self Storage</label>
                            </div>
                            <div>
                              <input
                                checked
                                id="SFRPortfolios44"
                                type="checkbox"
                                value="44"
                                className="name-filters"
                              />
                              <label for="SFRPortfolios44">
                                SFR Portfolios
                              </label>
                            </div>
                            <div>
                              <input
                                checked
                                id="SingleTenantInvestments25"
                                type="checkbox"
                                value="25"
                                className="name-filters"
                              />
                              <label for="SingleTenantInvestments25">
                                Single Tenant Investments
                              </label>
                            </div>
                            <div>
                              <input
                                id="TelecomLeasingInfrastructure26"
                                type="checkbox"
                                value="26"
                                className="name-filters"
                              />
                              <label for="TelecomLeasingInfrastructure26">
                                Telecom &amp; Leasing Infrastructure
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="content-people">
                        <div className="searchResults">
                          <table id="brokerlist">
                            <tbody>
                            
                              {People.map((People) => (
                                <tr className="tr" key={People.id}>
                                  <td className="thumbnail">
                                    <div className="thumnail-div">
                                      <img
                                        src={People.image}
                                        className="thumbnail-img"
                                        width="50px"
                                        height="50px"
                                      />
                                    </div>
                                  </td>
                                  <td className="user-info">
                                    <div className="name">
                                      <a target="_top">{People.name}</a>
                                      <span className="underline"></span>
                                    </div>
                                    <div className="info">
                                      <a> {People.phone} </a>|
                                      <a> {People.email} </a>|
                                      <a> View Profile </a>|
                                      <a> View Listings </a>
                                    </div>
                                  </td>
                                  <td className="CompanyInfo">
                                    <div className="div-1-company-info">
                                      <div className="company-name">
                                        <span>{People.company_name}</span>
                                      </div>
                                      <div className="company-address">
                                        {People.company_address}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <div>
                  {Array.from(
                    { length: Math.ceil(people.length / peoplePerPage) },
                    (_, index) => (
                      <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    )
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default Peoples;
