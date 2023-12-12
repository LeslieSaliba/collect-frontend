import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../css/Dashboard.css";
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
        <div className='dashboard-flex'>
       
                <div className='dashboard-sidebar'>
                    <SidebarAdmin />
                </div>
                <div className='dashboard-main'>
                    <Routes>
                        <Route path="orders" element={<OrdersSection />} />
                        <Route path="categories" element={<CategoriesSection />} />
                        <Route path="products" element={<ProductsSection />} />
                        <Route path="banner" element={<BannerSection />} />
                        <Route path="customers" element={<CustomersSection />} />
                        <Route path="team" element={<TeamSection />} />
                        <Route path="analytics" element={<AnalyticsSection />} />
                    </Routes>
                </div>
            
        </div>
    );
}

export default AdminDashboard;
