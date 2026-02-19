import React from 'react'
import AdminDashboard from '../../pages/admin/dashboard/AdminDashboard'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminFooter from '../../components/footer/AdminFooter'
import AdminHome from '../../pages/admin/home/AdminHome'

const AdminLayout = () => {
  return (
    <div>
        <AdminNavbar />
        <AdminHome />
        <AdminDashboard/>
        {/* <AdminFooter /> */}
    </div>
  )
}

export default AdminLayout