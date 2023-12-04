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
            <BrowserRouter>
                <div className='dashboard-sidebar'>
                    <SidebarSeller />
                </div>
                <div className='dashboard-main'>
                    <Routes>
                        <Route path="/seller/orders" element={<OrdersSection />} />
                        <Route path="/seller/categories" element={<CategoriesSection />} />
                        <Route path="/seller/products" element={<ProductsSection />} />
                        <Route path="/seller/customers" element={<CustomersSection />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default SellerDashboard;
