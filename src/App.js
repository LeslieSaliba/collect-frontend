import './App.css';
import Wishlist from "./Pages/Wishlist"
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Cart from "./Pages/Cart";
import ColumnChart from './Charts/ColumnChart';
import ApexChart from './Charts/GraphChart';
import PieChart from './Charts/PieChart'

function App() {
  return (
    <div className="App">
       {/* <Wishlist/> */}
      {/* <HomePage/> */}
       {/* <ContactUs /> */}
      {/* <Cart /> */}
      {/* <ColumnChart/> */}
      <ApexChart/>
      {/* <PieChart/> */}
      {/* <AboutUs/> */}
    </div>
  );
}

export default App;
