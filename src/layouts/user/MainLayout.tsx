import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { useEffect, useMemo } from "react";
import { usePublicStore } from "../../hooks/user/usePublicStore";

/* ================= STORE DETECTION ================= */
const getStoreName = () => {
  const host = window.location.hostname;
  const cleanHost = host.replace("www.", "");

  console.log("HOST:", host);

  // 1. Localhost (dev)
  if (host.includes("localhost")) {
    const parts = host.split(".");
    return parts.length > 1 ? parts[0] : null;
  }

  // 3. Main domain → NO STORE (show landing page)
  if (cleanHost === "crazoweb.com") {
    return null;
  }

  const parts = cleanHost.split(".");

  // 4. Subdomain → abc.crazoweb.com
  if (parts.length > 2) {
    return parts[0];
  }

  // 5. Custom domain → knightpanda.in
  return cleanHost;
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