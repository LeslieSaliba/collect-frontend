import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Wishlist from "./Pages/Wishlist"
import Cart from "./Pages/Cart";
// import SignIn from "./Pages/SignIn";
// import SignUp from "./Pages/SignUp";
import AdminDashboard from './Pages/AdminDashboard';
import SellerDashboard from './Pages/SellerDashboard';
import ColumnChart from './Charts/ColumnChart';
import ApexChart from './Charts/GraphChart';
import PieChart from './Charts/PieChart';
// import PageNotFound from './Pages/PageNotFound';

function App() {
  return (

    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/Wishlist" element={<Wishlist />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path='/AboutUs' element={<AboutUs />} />
      <Route path='/AdminDashboard/*' element={<AdminDashboard />} />
      <Route path='/SellerDashboard/*' element={<SellerDashboard />} />
      {/* <Route path='/*' element={<PageNotFound/>}/> */}

    </Routes>

  );
}

export default App;