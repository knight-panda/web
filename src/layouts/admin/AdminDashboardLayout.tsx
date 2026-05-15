import { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
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

  // Store Data
  const [storeData, setStoreData] =
    useState<any>(null);

  const handleNavigation = (
    id: string
  ) => {

    navigate(id);
  };

  useEffect(() => {

    const checkStore = async () => {

      try {

        const res =
          await fetchStore();

        if (res.success) {

          const store =
            res.data;

          // Save Store
          setStoreData(store);

          // Allow Outlet
          setHasStore(true);

          /* =========================
             STORE BRANDING
          ========================= */

          // Page Title
          document.title =
            store.storeName ||
            "Store";

          // Favicon
          const favicon =
            store.faviconUrl ||
            store.logoUrl;

          if (favicon) {

            let link =
              document.querySelector(
                "link[rel='icon']"
              ) as HTMLLinkElement;

            if (!link) {

              link =
                document.createElement(
                  "link"
                );

              link.rel =
                "icon";

              document.head.appendChild(
                link
              );
            }

            link.href =
              favicon;
          }

          // Theme Color
          let metaTheme =
            document.querySelector(
              "meta[name='theme-color']"
            );

          if (!metaTheme) {

            metaTheme =
              document.createElement(
                "meta"
              );

            metaTheme.setAttribute(
              "name",
              "theme-color"
            );

            document.head.appendChild(
              metaTheme
            );
          }

          metaTheme.setAttribute(
            "content",
            store.primaryColor ||
            "#ff6b00"
          );

          // Description
          let metaDescription =
            document.querySelector(
              "meta[name='description']"
            );

          if (!metaDescription) {

            metaDescription =
              document.createElement(
                "meta"
              );

            metaDescription.setAttribute(
              "name",
              "description"
            );

            document.head.appendChild(
              metaDescription
            );
          }

          metaDescription.setAttribute(
            "content",
            store.storeDescription ||
            "Welcome to our store"
          );

        } else {

          setShowCreateStore(
            true
          );
        }

      } catch (err) {

        console.error(err);

        setShowCreateStore(
          true
        );

      } finally {

        setLoading(false);
      }
    };

    checkStore();

  }, []);

  // Loading
  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return (

    <div className="admin-page">

      <div className="admin-container">

        {/* Sidebar */}
        <AdminSidebar
          onTagClick={
            handleNavigation
          }
        />

        {/* Outlet */}
        {hasStore && (

          <Outlet
            context={{
              store:
                storeData
            }}
          />

        )}

      </div>

      {/* Create Store */}
      {showCreateStore && (

        <CreateStoreDialog
          onClose={() =>
            setShowCreateStore(
              false
            )
          }
        />

      )}

    </div>
  );
};

export default AdminDashboardLayout;