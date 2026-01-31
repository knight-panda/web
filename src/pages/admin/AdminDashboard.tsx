import React from 'react'
import "./AdminDashboard.css"
import AdminSidebar from '../../components/sidebar/AdminSidebar'
import Orders from '../../components/order/Orders'

const AdminDashboard = () => {
    return (
        <div className='admin-page'>
            <div className="admin-container">
                <AdminSidebar />
                <Orders />
            </div>
        </div>
    )
}

export default AdminDashboard