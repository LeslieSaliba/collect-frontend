import './App.css';
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Wishlist from "./Pages/Wishlist"
import Cart from "./Pages/Cart";
import AdminDashboard from './Pages/AdminDashboard';
import SellerDashboard from './Pages/SellerDashboard';
import ColumnChart from './Charts/ColumnChart';
import ApexChart from './Charts/GraphChart';
import PieChart from './Charts/PieChart';
import AuthForm from './Pages/AuthForm';

function App() {
  return (
    <div className="App">
      {/* <HomePage/> */}
      {/* <Wishlist/> */}
      {/* <ContactUs /> */}
      {/* <Cart /> */}
      {/* <AboutUs /> */}
      <AdminDashboard />
      {/* <SellerDashboard /> */}
      {/* <ColumnChart /> */}
      {/* <ApexChart /> */}
      {/* <PieChart /> */}
      {/* <AuthForm /> */}
    </div>
  );
}

export default App;
