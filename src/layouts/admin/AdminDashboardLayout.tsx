import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminDashboardLayout.css";

import AdminSidebar from "../../components/sidebar/AdminSidebar";
import CreateStoreDialog from "../../pages/admin/adminAuth/CreateStoreDialog";
import { useStore } from "../../hooks/store/useStore";

const AdminDashboardLayout = () => {
  const navigate = useNavigate();

  const { fetchStore } = useStore();

  const [showCreateStore, setShowCreateStore] = useState(false);
  const [hasStore, setHasStore] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNavigation = (id: string) => {
    navigate(id);
  };

  useEffect(() => {
    const checkStore = async () => {
      try {
        const res = await fetchStore();

        if (res.success) {
          setHasStore(true); // ✅ allow Outlet
        } else {
          setShowCreateStore(true); // ❌ no store
        }
      } catch (err) {
        setShowCreateStore(true); // ❌ error → show dialog
      } finally {
        setLoading(false);
      }
    };

    checkStore();
  }, []);

  // ⛔ While checking API
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <AdminSidebar onTagClick={handleNavigation} />

        {/* ✅ Show Outlet only if store exists */}
        {hasStore && <Outlet />}
      </div>

      {/* ❌ Show dialog if no store */}
      {showCreateStore && (
        <CreateStoreDialog onClose={() => setShowCreateStore(false)} />
      )}
    </div>
  );
};

export default AdminDashboardLayout;