import React, { useState } from 'react'
import './AdminStoreLayout.css'
import EditHome from '../../pages/adminStore/editHome/EditHome'

function AdminStoreLayout() {
  const [activeMenu, setActiveMenu] = useState('Home')

  const menus = ['Home', 'Product Details', 'Cart', 'Profile']

  return (
    <div className='admin-store-layout'>
      <div className='asl-top'>
        <div className='asl-save-btn'>Save</div>
        <div className='asl-view-btn'>View</div>
      </div>

      <div className='asl-menu-container'>
        {menus.map((menu) => (
          <div
            key={menu}
            className={`asl-menu ${activeMenu === menu ? 'active' : ''}`}
            onClick={() => setActiveMenu(menu)}
          >
            {menu}
          </div>
        ))}
      </div>

      <div>
        <EditHome />
      </div>
    </div>
  )
}

export default AdminStoreLayout