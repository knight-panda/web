import React from 'react'
import AdminDashboard from '../../pages/admin/dashboard/AdminDashboard'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminFooter from '../../components/footer/AdminFooter'
import AdminHome from '../../pages/admin/home/AdminHome'
import OurServices from '../../pages/admin/ourServices/OurServices'
import AdminPricing from '../../pages/admin/pricing/AdminPricing'

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <AdminHome />
      <OurServices />
      <AdminPricing />
      <AdminFooter />
    </div>
  )
}

export default AdminLayout