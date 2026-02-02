import React from 'react'
import { Outlet } from 'react-router-dom'
import "./AdminDashboard.css"
import AdminSidebar from '../../components/sidebar/AdminSidebar'

const AdminDashboard = () => {
    return (
        <div className='admin-page'>
            <div className="admin-container">
                <AdminSidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard