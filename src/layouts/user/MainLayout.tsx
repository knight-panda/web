import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { useEffect } from "react";
import { usePublicStore } from "../../hooks/user/usePublicStore";

const MainLayout = () => {
  const location = useLocation();
  const { fetchStore, loading, error, data } = usePublicStore();

  // ✅ extract slug from URL → "/fhf" => "fhf"
  const slug = location.pathname.split("/")[1];

  useEffect(() => {
    if (slug) {
      fetchStore(slug);
    }
  }, [slug]);

  // ⏳ Loading
  if (loading) {
    return <div>Loading store...</div>;
  }

  // ❌ Store not found
  if (error || !data?.success) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Store Not Available</h1>
        <p>{error || "This store does not exist."}</p>
      </div>
    );
  }

  // ✅ Store loaded
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;