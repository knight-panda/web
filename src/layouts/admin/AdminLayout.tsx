import React, { useState } from 'react'
import './AdminLayout.css'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminFooter from '../../components/footer/AdminFooter'
import AdminHome from '../../pages/admin/home/AdminHome'
import OurServices from '../../pages/admin/ourServices/OurServices'
import AdminPricing from '../../pages/admin/pricing/AdminPricing'
import AdminLogin from "../../pages/admin/adminAuth/AdminLogin"

const AdminLayout: React.FC = () => {

  const [openLogin, setOpenLogin] = useState<boolean>(false)

  return (
    <>
      <AdminNavbar setOpenLogin={setOpenLogin} />

      <AdminHome />
      <OurServices />
      <AdminPricing />
      <AdminFooter />

      {/* ===== LOGIN MODAL HERE ===== */}
      {openLogin && (
        <AdminLogin onClose={() => setOpenLogin(false)} />
      )}
    </>
  )
}

export default AdminLayout