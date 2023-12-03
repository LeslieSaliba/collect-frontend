import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SidebarSeller from '../DashComponents/sidebarSeller';
import OrdersSection from '../DashComponents/OrdersSection';
import CategoriesSection from '../DashComponents/CategoriesSection';
import ProductsSection from '../DashComponents/ProductsSection';
import CustomersSection from '../DashComponents/CustomersSection';

function SellerDashboard() {
    return (
        <BrowserRouter>
            <div className="">
                <SidebarSeller />
                <Routes>
                    <Route path="/seller/orders" element={<OrdersSection />} />
                    <Route path="/seller/categories" element={<CategoriesSection />} />
                    <Route path="/seller/products" element={<ProductsSection />} />
                    <Route path="/seller/customers" element={<CustomersSection />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default SellerDashboard;
