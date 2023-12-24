import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from '../components/Navbar1';
import Footer1 from '../components/Footer1';
import SearchComponent from '../Assets/SearchComponent';
import FilterComponent from '../Assets/FilterComponent';
import ResultsComponent from '../Assets/ResultsComponent';
import PaginationComponent from '../Assets/PaginationComponent';
import { useSearchParams } from 'react-router-dom';

function Peoples2() {
  const [people, setPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]); // Fix the variable name here
  const [currentPage, setCurrentPage] = useState(1);
  const peoplePerPage = 100;
  const [totalPages, setTotalPages] = useState(0);
  const [specialties, setSpecialties] = useState([]);
  const [searchParams] = useSearchParams();
  const peoplesIds=searchParams.get('ids');  
  const [officePeople, setOfficePeople] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, selectedSpecialties, peoplesIds]);


  const specialtiesNameMapping = {
    "sale_charter_school": "Charter School",
    "sale_corporate_lease_back": "Corporate Lease Back",
    "sale_corporate_sales": "Corporate Sales",
    "sale_golf_and_resorts": "Golf & Resorts",
    "sale_hospitality": "Hospitality",
    "sale_industrial": "Industrial",
    "sale_land": "Land",
    "sale_marinas": "Marinas",
    "sale_medical_office": "Medical Office",
    "sale_mobile_homes": "Mobile Homes",
    "sale_multifamily_or_apartment": "Multifamily/Apartment",
    "sale_office": "Office",
    "sale_property_management": "Property Management",
    "sale_retail": "Retail",
    "sale_self_storage": "Self Storage",
    "sale_senior_housing": "Senior Housing",
    "lease_golf_and_resorts": "Lease Golf & Resorts",
    "lease_industrial": "Lease Industrial",
    "lease_medical_office": "Lease Medical Office",
    "lease_miscellaneous": "Lease Miscellaneous",
    "lease_office": "Lease Office",
    "lease_retail": "Lease Retail",
    "lease_tenant_representation": "Lease Tenant Representation",
    "prodduct_asset_recovery_svnart": "Product Asset Recovery (SVNART)",
    "prodduct_auction": "Product Auction",
    "prodduct_charter_schools": "Product Charter Schools",
    "prodduct_corporate_real_estate": "Product Corporate Real Estate",
    "prodduct_distressed_assets": "Product Distressed Assets",
    "prodduct_golf_and_resorts": "Product Golf & Resorts",
    "prodduct_hospitality": "Product Hospitality",
    "prodduct_industrial": "Product Industrial",
    "prodduct_institutional_capital_markets": "Product Institutional Capital Markets",
    "prodduct_land_and_development": "Product Land & Development",
    "prodduct_leasing": "Product Leasing",
    "prodduct_marinas": "Product Marinas",
    "prodduct_medical_office": "Product Medical Office",
    "prodduct_multifamily": "Product Multifamily",
    "prodduct_office": "Product Office",
    "prodduct_property_management": "Product Property Management",
    "prodduct_restaurant": "Product Restaurant",
    "prodduct_retail": "Product Retail",
    "prodduct_self_storage": "Product Self Storage",
    "prodduct_sfr_portfolios": "Product SFR Portfolios",
    "prodduct_single_tenant_investments": "Product Single Tenant Investments",
    "prodduct_telecom_and_leasing_infrastructure": "Product Telecom & Leasing Infrastructure",
    // Add mappings for other specialties...
  };
  
  
  const fetchData = async () => {
    try {
      const isMobileScreen = windowWidth >= 100 && windowWidth <= 768;

      if (isMobileScreen) {
        // Fetch all people without applying filters
        const apiUrl = `http://localhost:8000/api/account/open/people/?search=${searchQuery}`;

        const response = await axios.get(apiUrl);

        setTotalPages(1); // Set total pages to 1 since there's only one page of results
        setPeople(response.data.results);
      } else if (peoplesIds) {
        // Split the IDs and create the API URL
        const idsArray = peoplesIds.split(',');
        const apiUrl = `http://localhost:8000/api/account/open/people/?ids=${idsArray.join(',')}&search=${searchQuery}`;
  
        const response = await axios.get(apiUrl);
  
        // Set the data for the office people
        setPeople(response.data.results);
        setTotalPages(1); // Set total pages to 1 since there's only one page of results
      } else if (selectedSpecialties.length > 0) {
        // Fetch data based on specialties when peoplesIds is not present
        const specialtiesQueryString = selectedSpecialties
          .map((spec) => `${spec.toLowerCase().replace(/\s+/g, '_')}=${'True'}`)
          .join('&');
        const apiUrl = `http://localhost:8000/api/account/open/people/?start=${currentPage}&end=${currentPage + peoplePerPage - 1}&search=${searchQuery}&${specialtiesQueryString}`;
  
        const response = await axios.get(apiUrl);
  
        const filteredPeople = response.data.results.filter((person) => {
          const specialties = person.sale_specialtie || person.lease_specialtie || person.product_council;
  
          const isMatch = selectedSpecialties.some((selectedSpec) => {
            if (selectedSpec.startsWith('sale_') || selectedSpec.startsWith('lease_') || selectedSpec.startsWith('prodduct_')) {
              const specialtyKey = selectedSpec.split('=')[0];
              return specialties && specialties[specialtyKey] === true;
            } else {
              const [key, value] = selectedSpec.split('=');
              return specialties && specialties[key] === (value === 'true' ? true : value === 'false' ? false : value);
            }
          });
  
          return isMatch;
        });
  
        setTotalPages(Math.ceil(filteredPeople.length / peoplePerPage));
        setPeople(filteredPeople.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));
      } else {
        // No specialties or office IDs, set people to empty
        setPeople([]);
        setTotalPages(0); // Reset total pages to 0
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  // const fetchData = async () => {
  //   try {
  //     if (selectedSpecialties.length === 0) {
  //       setPeople([]);
  //       return;
  //     }
  
  //     const specialtiesQueryString = selectedSpecialties
  // .map((spec) => `${spec.toLowerCase().replace(/\s+/g, '_')}=${'True'}`)
  // .join('&');
  //       const apiUrl = `http://localhost:8000/api/account/open/people/?start=${currentPage}&end=${currentPage + peoplePerPage - 1}&search=${searchQuery}&${specialtiesQueryString}`;
  //       console.log('API URL:', apiUrl);
  
  //     const response = await axios.get(apiUrl);
  
  //     console.log('Backend Specialties:', response.data.results);
  
  //     const filteredPeople = response.data.results.filter((person) => {
  //       const specialties = person.sale_specialtie || person.lease_specialtie || person.product_council;
  
  //       console.log('Person:', person, 'Specialties:', specialties);
  
  //       const isMatch = selectedSpecialties.some((selectedSpec) => {
  //         if (selectedSpec.startsWith('sale_') || selectedSpec.startsWith('lease_') || selectedSpec.startsWith('prodduct_')) {
  //           const specialtyKey = selectedSpec.split('=')[0];
  //           return specialties && specialties[specialtyKey] === true;
  //         } else {
  //           const [key, value] = selectedSpec.split('=');
  //           return specialties && specialties[key] === (value === 'true' ? true : value === 'false' ? false : value);
  //         }
  //       });
  
  //       console.log('Is Match:', isMatch);
  
  //       return isMatch;
  //     });
  
  //     console.log('Filtered People:', filteredPeople);
  
  //     setTotalPages(Math.ceil(filteredPeople.length / peoplePerPage));
  //     setPeople(filteredPeople.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  
  useEffect(() => {
    // Set default selection when component mounts
    const defaultSpecialties = specialties_.reduce(
      (acc, category) => acc.concat(category.subSpecialties),
      []
    );
    setSelectedSpecialties(defaultSpecialties);
  }, []);
  
  
  
  
  

  console.log('People:', people);
  const handleSearchChange = (event) => {
    console.log('Search query:', event.target.value);
    setSearchQuery(event.target.value);
  
    setCurrentPage(1);
  };
  

  

  const handleCheckboxChangeSpecialties = (specialty) => {
    const updatedSpecialties = [...selectedSpecialties];
  
    if (updatedSpecialties.includes(specialty)) {
      updatedSpecialties.splice(updatedSpecialties.indexOf(specialty), 1);
    } else {
      // Check if the specialty is a boolean field
      const isBooleanField = specialty.startsWith('sale_') || specialty.startsWith('lease_') || specialty.startsWith('prodduct_');
      // If it's a boolean field, set the value to true
      // Otherwise, add the specialty to the list
      updatedSpecialties.push(isBooleanField ? `${specialty}=true` : specialty);
    }
  
    console.log('Updated Specialties:', updatedSpecialties);
    setSelectedSpecialties(updatedSpecialties);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const specialties_ = [
    {
      heading: 'Sale Specialities',
      subSpecialties: ['Sale Charter School', 'Sale Corporate Lease Back', 'Sale Corporate Sales', 'Sale Golf & Resorts', 'Sale Hospitality', 'Sale Industrial', 'Sale Land', 'Sale Marinas', 'Sale Medical Office', 'Sale Mobile Homes', 'Sale Multifamily/Apartment', 'Sale Office', 'Sale Property Management', 'Sale Retail', 'Sale Self Storage', 'Sale Senior Housing'],
    },
    {
      heading: 'Lease Specialities',
      subSpecialties: ['Lease Golf & Resorts', 'Lease Industrial', 'Lease Medical Office', 'Lease Miscellaneous', 'Lease Office', 'Lease Retail', 'Lease Tenant Representation'],
    },
    {
      heading: 'Product Council',
      subSpecialties: ['Prodduct Asset Recovery (SVNART)', 'Prodduct Auction', 'Prodduct Charter Schools', 'Prodduct Corporate Real Estate',
      'Prodduct Distressed Assets',
      'Prodduct Golf & Resorts',
      'Prodduct Hospitality',
      'Prodduct Industrial',
      'Prodduct Institutional Capital Markets',
      'Prodduct Land & Development',
      'Prodduct Leasing',
      'Prodduct Marinas',
      'Prodduct Medical Office',
      'Prodduct Multifamily',
      'Prodduct Office',
      'Prodduct Property Management',
      'Prodduct Restaurant',
      'Prodduct Retail',
      'Prodduct Self Storage',
      'Prodduct SFR Portfolios',
      'Prodduct Single Tenant Investments',
      'Prodduct Telecom & Leasing Infrastructure'],
    },
  ];

  const handleSelectAll = (subSpecialties) => {
    const updatedSpecialties = [...selectedSpecialties, ...subSpecialties];
    setSelectedSpecialties(updatedSpecialties);
    setCurrentPage(1);
  };

  const handleSelectNone = (subSpecialties) => {
    const updatedSpecialties = selectedSpecialties.filter(
      (specialty) => !subSpecialties.includes(specialty)
    );
    setSelectedSpecialties(updatedSpecialties);
    setCurrentPage(1);
  };
  return (
    <div>
      <Navbar1 />
      <div className="main-people">
        <div className="people-container">
          <h1 className="People-heading">
            <strong>People</strong>
          </h1>
          {/* Search Component */}
          <SearchComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
          {/* Filter Component */}
          <FilterComponent
            specialties={specialties_}
            selectedSpecialties={selectedSpecialties}
            handleCheckboxChangeSpecialties={handleCheckboxChangeSpecialties}
            handleSelectAll={handleSelectAll}
            handleSelectNone={handleSelectNone}
         />
          {/* Results */}
          <ResultsComponent people={people} />
          {/* Pagination */}
          <PaginationComponent totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default Peoples2;
