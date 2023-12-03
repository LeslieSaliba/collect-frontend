import './App.css';
import Wishlist from "./Pages/Wishlist"
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Cart from "./Pages/Cart";
import AdminDashboard from './Pages/AdminDashboard';
import SidebarAdmin from './DashComponents/sidebarAdmin';

function App() {
  return (
    <div className="App">
      {/* <Wishlist/> */}
      {/* <HomePage/> */}
      {/* <ContactUs /> */}
      {/* <Cart /> */}
      {/* <AboutUs /> */}
      {/* <AdminDashboard /> */}
      <SidebarAdmin />
    </div>
  );
}

export default App;
