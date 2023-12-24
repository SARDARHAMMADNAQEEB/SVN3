import React,{useState, useContext, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch,Routes , Navigate, useNavigate} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar1 from './components/Navbar1';
import Aboutus from './Pages/Aboutus';
import Investors from './Pages/Investors';
import Occupiers from './Pages/Occupiers';
import Culture from './Pages/Culture';
import Properties from './Pages/Properties';
import Careers from './Pages/Careers';
import Affiliate from './Pages/Affiliate';
import Insight from './Pages/Insight';
import SouthKorea from './Pages/SouthKorea';
import Australia from './Pages/Australia';
import Romania from './Pages/Romania';
import Canada from './Pages/Canada';
import Mexico from './Pages/Mexico';
import Qatar from './Pages/Qatar';
import International from './Pages/International';
import Signup from './Pages/Signup';
import Peoples from './Pages/Peoples';
import Contact from './Pages/Contact';
import SVNLive from './Pages/SVNLive';
import Offices from './Pages/Offices';
import PropertyDetails from './Pages/PropertyDetails';
import Peoples2 from './Pages/Peoples2';
import Person from './Pages/Person';
import Login from './Pages/AdminSide/Login';
import Dashboard from './Pages/AdminSide/Dashboard';
import ChangePassword from './Pages/AdminSide/ChangePassword';
import ContactAdmin from './Pages/AdminSide/PagesAdmin/ContactAdmin';
import OfficeAdmin from './Pages/AdminSide/PagesAdmin/OfficeAdmin';
import PeopleAdmin from './Pages/AdminSide/PagesAdmin/PeopleAdmin';
import PropertiesAdmin from './Pages/AdminSide/PagesAdmin/PropertiesAdmin';
import PropertyTypeAdmin from './Pages/AdminSide/PagesAdmin/PropertyTypeAdmin';
import SaleTypeAdmin from './Pages/AdminSide/PagesAdmin/SaleTypeAdmin';
import SignUpAdmin from './Pages/AdminSide/PagesAdmin/SignUpAdmin';
import AddContact from './Pages/AdminSide/PagesAdmin/AddContact';
import UpdateContact from './Pages/AdminSide/PagesAdmin/UpdateContact';
import AddOffice from './Pages/AdminSide/PagesAdmin/AddOffice';
import UpdateOffice from './Pages/AdminSide/PagesAdmin/UpdateOffice';
import AddPeople from './Pages/AdminSide/PagesAdmin/AddPeople';
import AddSignup from './Pages/AdminSide/PagesAdmin/AddSignup';
import UpdateSignup from './Pages/AdminSide/PagesAdmin/UpdateSignup';
import AddProperty from './Pages/AdminSide/PagesAdmin/AddProperty';
import UpdateProperty from './Pages/AdminSide/PagesAdmin/UpdateProperty';
import UpdatePeople from './Pages/AdminSide/PagesAdmin/UpdatePeople';
import AddPropertyType from './Pages/AdminSide/PagesAdmin/AddPropertyType';
import AddSaleType from './Pages/AdminSide/PagesAdmin/AddSaleType';
import UpdatePropertyType from './Pages/AdminSide/PagesAdmin/UpdatePropertyType';
import UpdateSaleType from './Pages/AdminSide/PagesAdmin/UpdateSaleType';
import Contacted from './Pages/AdminSide/PagesAdmin/Contacted';
// Import necessary Font Awesome modules
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Pages/AdminSide/PrivateRoute';
import { AuthProvider  } from './Pages/AdminSide/AuthContext';
// Initialize Font Awesome library with the imported icons
library.add(fas);

// const PrivateRoute = ({ element: Component, authenticated, isAdmin, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={
//         authenticated && isAdmin ? (
//           <Component />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };


function App() {
  // const { authenticated, isAdmin } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const PrivateRoute = ({ element: Component, path }) => {
  //   if (authenticated && isAdmin) {
  //     return <Route path={path} element={<Component />} />;
  //   } else {
  //     return <Navigate to="/login" />;
  //   }
  // };
  // const navigate = useNavigate();
  // const { authenticated, isAdmin } = useContext(AuthContext);
  // useEffect(() => {
  //   // Check for changes in authentication status
  //   if (authenticated && isAdmin) {
  //     navigate('/dashboard');
  //   }
  // }, [authenticated, isAdmin, navigate]);

  // const { authenticated, isAdmin } = useAuth();
  return (
    <div>
      {/* <Navbar1 /> */}
     
        <AuthProvider>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path='/investors' element={<Investors/>}/>
        <Route path='/occupiers' element={<Occupiers/>}/>
        <Route path='/culture' element={<Culture/>}/>
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/careers' element={<Careers/>}/>
        <Route path='/office' element={<Affiliate/>}/>
        <Route path='/insights' element={<Insight/>}/>
        <Route path='/southkorea' element={<SouthKorea/>}/>
        <Route path='/australia' element={<Australia/>}/>
        <Route path='/romania' element={<Romania/>}/>
        <Route path='/canada' element={<Canada/>}/>
        <Route path='/mexico' element={<Mexico/>}/>
        <Route path='/qatar' element={<Qatar/>}/>
        <Route path='/international' element={<International/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/peoples' element={<Peoples/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/svn-live' element={<SVNLive/>}/>
        <Route path='/offices' element={<Offices/>}/>
        <Route path='/property/:id/' element={<PropertyDetails/>}/>
        <Route path='/peoples2' element={<Peoples2/>}/>
        <Route path='/person/:id/' element={<Person/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <PrivateRoute
            path='/dashboard'
            element={<Dashboard />}
            authenticated={authenticated}
            isAdmin={isAdmin}
          /> */}
          {/* <Route
            path='/dashboard'
            element={<PrivateRoute element={<Dashboard />} path='/dashboard' />}
          /> */}
          {/* <PrivateRoute
            path='/dashboard'
            element={<Dashboard />}
            authenticated={authenticated}
            isAdmin={isAdmin}
          /> */}
           {/* {authenticated && isAdmin ? (
            <Route path='/dashboard' element={<Dashboard />} />
          ) : (
            <Route path='/dashboard' element={<Navigate to='/login' />} />
          )} */}

{/* {authenticated && isAdmin ? (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
             
            </>
          ) : (
            <Route path='/login' element={<Login/>}/>
            
          )} */}
   {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
   {/* <Route
        path="/dashboard"
        element={
          authenticated && isAdmin ? (
            <Dashboard />
          )  : (
            <Navigate to="/login" replace={true}  />
            

          )
        }
      /> */}
   {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
<Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/contact-admin' element={<ContactAdmin/>}/>
        <Route path='/offices-admin' element={<OfficeAdmin/>}/>
        <Route path='/people-admin' element={<PeopleAdmin/>}/>
        <Route path='/properties-admin' element={<PropertiesAdmin/>}/>
        <Route path='/propertyType-admin' element={<PropertyTypeAdmin/>}/>
        <Route path='/salesType-admin' element={<SaleTypeAdmin/>}/>
        <Route path='/sign-up-admin' element={<SignUpAdmin/>}/>
        <Route path='/add-contact' element={<AddContact/>}/>
        <Route path='/update-contact/:id/' element={<UpdateContact/>}/>
        <Route path='/add-office' element={<AddOffice/>}/>
        <Route path='/update-office/:id/' element={<UpdateOffice/>}/>
        <Route path='/add-people' element={<AddPeople/>}/>
        <Route path='/add-signup' element={<AddSignup/>}/>
        <Route path='/update-signup/:id/' element={<UpdateSignup/>}/>
        <Route path='/add-property' element={<AddProperty/>}/>
        <Route path='/update-property/:id/' element={<UpdateProperty/>}/>
        <Route path='/update-people/:id/' element={<UpdatePeople/>}/>
        <Route path='/add-property-type' element={<AddPropertyType/>}/>
        <Route path='/add-sale-type' element={<AddSaleType/>}/>
        <Route path='/update-property-type/:id/' element={<UpdatePropertyType/>}/>
        <Route path='/update-sale-type/:id/' element={<UpdateSaleType/>}/>
        <Route path='/contacted' element={<Contacted/>}/>
      </Routes>
  
      </AuthProvider>
      <ToastContainer />
    {/* </div> */}
   
   {/* </Router> */}
   </div>
  )
}

export default App