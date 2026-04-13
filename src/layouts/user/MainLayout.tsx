import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { useEffect } from "react";
import { usePublicStore } from "../../hooks/user/usePublicStore";

const MainLayout = () => {
  const location = useLocation();
  const { fetchStore, loading, error, data } = usePublicStore();

  const slug = location.pathname.split("/")[1];

  useEffect(() => {
    if (slug) {
      fetchStore(slug);
    }
  }, [slug]);

  if (loading) {
    return <div>Loading store...</div>;
  }

  if (error || !data?.success) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Store Not Available</h1>
        <p>{error || "This store does not exist."}</p>
      </div>
    );
  }

  // pass storeId or full data
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      
      <Outlet context={{ 
        storeId: data.data.id,
        store: data.data
      }} />
      
      <Footer />
    </div>
  );
};

export default MainLayout;