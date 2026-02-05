import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import "./AdminDashboard.css"
import AdminSidebar from '../../components/sidebar/AdminSidebar'

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (id: string) => {
        // This will navigate to /admin/orders, /admin/profile, etc.
        // Assuming your routes are set up relative to this dashboard
        navigate(id); 
    };

    return (
        <div className='admin-page'>
            <div className="admin-container">
                <AdminSidebar onTagClick={handleNavigation} />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard