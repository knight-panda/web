import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import "./AdminDashboardLayout.css"
import AdminSidebar from '../../components/sidebar/AdminSidebar'
import CreateStoreDialog from '../../pages/admin/adminAuth/CreateStoreDialog';

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
   const [showCreateStore, setShowCreateStore] = useState(true);

  const handleNavigation = (id: string) => {
    navigate(id);
  };

  return (
    <div className='admin-page'>
      <div className="admin-container">
        <AdminSidebar onTagClick={handleNavigation} />
        <Outlet />
      </div>

      {/* Create Store Dialog */}
      {showCreateStore && (
        <CreateStoreDialog onClose={() => setShowCreateStore(false)} />
      )}
    </div>
  )
}

export default AdminDashboardLayout