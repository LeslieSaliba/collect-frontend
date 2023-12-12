import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../css/Dashboard.css";
import SidebarSeller from '../DashComponents/sidebarSeller';
import OrdersSection from '../DashComponents/OrdersSection';
import CategoriesSection from '../DashComponents/CategoriesSection';
import ProductsSection from '../DashComponents/ProductsSection';
import CustomersSection from '../DashComponents/CustomersSection';

function SellerDashboard() {
    return (
        <div className='dashboard-flex'>
                <div className='dashboard-sidebar'>
                    <SidebarSeller />
                </div>
                <div className='dashboard-main'>
                    <Routes>
                        <Route path="orders" element={<OrdersSection />} />
                        <Route path="categories" element={<CategoriesSection />} />
                        <Route path="products" element={<ProductsSection />} />
                        <Route path="customers" element={<CustomersSection />} />
                    </Routes>
                </div>
        </div>
    );
}

export default SellerDashboard;
