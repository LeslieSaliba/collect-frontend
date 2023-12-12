import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Wishlist from "./Pages/Wishlist"
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import AdminDashboard from './Pages/AdminDashboard';
import SellerDashboard from './Pages/SellerDashboard';
import AllProduct from './Pages/AllProducts';
import ColumnChart from './Charts/ColumnChart';
import ApexChart from './Charts/GraphChart';
import PieChart from './Charts/PieChart';
import PrivateRoute from './PrivateRoute';
import PageNotFound from './Pages/PageNotFound';
import NoAccess from './Pages/NoAccess';

function App() {
  return (
   
    <Routes>

      <Route path="/" element={<HomePage/>} />
      <Route path="/Wishlist" element={<Wishlist/>} />
      <Route path="/ContactUs" element={<ContactUs/>} />
      <Route path= '/Shop' element={<AllProduct/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/AboutUs' element={<AboutUs/>}/>
      <Route path= '/NoAccess' element={<NoAccess/>}/>
      <Route path='/AdminDashboard/*' 
       element={<PrivateRoute element={<AdminDashboard/>} allowedRoles={'admin'} fallbackPath="/NoAccess" />}
       />
      <Route path='/SellerDashboard/*' 
      element={<PrivateRoute element={<SellerDashboard/>} allowedRoles={['admin', 'seller']} fallbackPath="/NoAccess" />}
      />
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      
      <Route path='/*' element={<PageNotFound/>}/>
      
    </Routes>
  
  );
}

export default App;
