import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { useEffect, useMemo } from "react";
import { usePublicStore } from "../../hooks/user/usePublicStore";

/* ================= STORE DETECTION ================= */
const getStoreName = () => {
  const host = window.location.hostname;
  const parts = host.split(".");

  console.log("HOST:", host); // DEBUG

  // localhost support
  if (host.includes("localhost")) {
    return parts.length > 1 ? parts[0] : null;
  }

  return parts.length > 2 ? parts[0] : null;
};

const MainLayout = () => {
  const { fetchStore, loading, error, data } = usePublicStore();

  // ✅ memoized (important)
  const storeName = useMemo(() => getStoreName(), []);

  /* ================= FETCH STORE ================= */
  useEffect(() => {
    if (storeName) {
      fetchStore(storeName);
    }
  }, [storeName]);

  /* ================= SAFETY CHECK ================= */
  // ❗ This should ideally never happen if routing is correct
  if (!storeName) {
    return null; // or redirect
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading store...</h2>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error || !data?.success) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Store Not Available</h1>
        <p>{error || "This store does not exist."}</p>
      </div>
    );
  }

  /* ================= SUCCESS ================= */
  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Outlet
        context={{
          storeId: data?.data?.id,
          store: data?.data,
          storeName, // ✅ useful everywhere
        }}
      />

      <Footer />
    </div>
  );
};

export default MainLayout;