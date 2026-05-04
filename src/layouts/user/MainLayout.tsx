import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { useEffect, useMemo } from "react";
import { usePublicStore } from "../../hooks/user/usePublicStore";

/* ================= STORE DETECTION ================= */
const getStoreName = () => {
  let host = window.location.hostname.toLowerCase();

  console.log("HOST:", host);

  // remove www
  host = host.replace(/^www\./, "");


  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    const parts = window.location.host.split(":")[0].split(".");

    // e.g. store.localhost
    if (parts.length > 1) {
      return parts[0];
    }

    return null;
  }

  if (host === "crazoweb.com") {
    return null;
  }

  const parts = host.split(".");

  // =========================
  // 3. SUBDOMAIN (abc.crazoweb.com)
  // =========================
  if (host.endsWith("crazoweb.com") && parts.length > 2) {
    return parts[0];
  }

  // =========================
  // 4. CUSTOM DOMAIN (knightpanda.in)
  // =========================
  return host;
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