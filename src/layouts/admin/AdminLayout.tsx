import React from 'react'
import AdminDashboard from '../../pages/admin/dashboard/AdminDashboard'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminFooter from '../../components/footer/AdminFooter'

const AdminLayout = () => {
  return (
    <div>
        <AdminNavbar />
        <AdminDashboard/>
        <AdminFooter />
    </div>
  )
}

export default AdminLayout