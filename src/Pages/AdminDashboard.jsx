import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SidebarAdmin from '../DashComponents/sidebarAdmin';
import OrdersSection from '../DashComponents/OrdersSection';
import CategoriesSection from '../DashComponents/CategoriesSection';
import ProductsSection from '../DashComponents/ProductsSection';
import BannerSection from '../DashComponents/BannerSection';
import CustomersSection from '../DashComponents/CustomersSection';
import TeamSection from '../DashComponents/TeamSection';
import AnalyticsSection from '../DashComponents/AnalyticsSection';

function AdminDashboard() {
    return (
        <BrowserRouter>
            <div className="">
                <SidebarAdmin />
                <Routes>
                    <Route path="/admin/orders" element={<OrdersSection />} />
                    <Route path="/admin/categories" element={<CategoriesSection />} />
                    <Route path="/admin/products" element={<ProductsSection />} />
                    <Route path="/admin/banner" element={<BannerSection />} />
                    <Route path="/admin/customers" element={<CustomersSection />} />
                    <Route path="/admin/team" element={<TeamSection />} />
                    <Route path="/admin/analytics" element={<AnalyticsSection />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AdminDashboard;