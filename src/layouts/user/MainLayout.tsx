import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { useEffect, useMemo } from "react";
import { usePublicStore } from "../../hooks/user/usePublicStore";
import AppShimmer from "../../components/shimmer/AppShimmer";
import './MainLayout.css'

/* ================= STORE DETECTION ================= */
const getStoreName = () => {

  let host = window.location.hostname.toLowerCase();
  console.log("HOST:", host);

  // remove www
  host = host.replace(/^www\./, "");

  /* ================= LOCALHOST ================= */
  if (host.includes("localhost") || host.includes("127.0.0.1")) {

    const parts = window.location.host.split(":")[0].split(".");
    // store.localhost
    if (parts.length > 1) {
      return parts[0];
    }

    return null;
  }

  /* ================= MAIN DOMAIN ================= */
  if (host === "crazoweb.com") {
    return null;
  }

  const parts = host.split(".");

  /* ================= SUBDOMAIN ================= */
  if (
    host.endsWith("crazoweb.com") &&
    parts.length > 2
  ) {
    return parts[0];
  }

  /* ================= CUSTOM DOMAIN ================= */
  return host;
};

const MainLayout = () => {

  const { fetchStore, loading, error, data } = usePublicStore();

  // Memoized
  const storeName = useMemo(() => getStoreName(), []);

  /* ================= FETCH STORE ================= */
  useEffect(() => {
    if (storeName) {
      fetchStore(storeName);
    }
  }, [storeName]);

  /* ================= BRANDING ================= */
  useEffect(() => {
    const store = data?.data;

    if (!store) return;

    // Title
    document.title = store.storeName || "Store";

    // Favicon
    const favicon = store.faviconUrl || store.logoUrl;

    if (favicon) {

      // Remove old favicons
      const oldLinks = document.querySelectorAll("link[rel*='icon']");

      oldLinks.forEach((item) => item.remove());

      // Create new favicon
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";

      // cache bust
      link.href = favicon + "?v=" + Date.now();

      document.head.appendChild(link);
    }

    // Theme Color
    let metaTheme = document.querySelector("meta[name='theme-color']");

    if (!metaTheme) {
      metaTheme = document.createElement("meta");
      metaTheme.setAttribute("name", "theme-color");
      document.head.appendChild(metaTheme);
    }

    metaTheme.setAttribute("content", store.primaryColor || "#ff6b00");

    // Meta Description
    let metaDescription = document.querySelector("meta[name='description']");

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      store.storeDescription ||
      "Welcome to our store"
    );

    // Open Graph Title
    let ogTitle = document.querySelector("meta[property='og:title']");

    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute(
      "content",
      store.storeName ||
      "Store"
    );

    // Open Graph Image
    let ogImage = document.querySelector("meta[property='og:image']");

    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute("content", store.logoUrl || "");
  }, [data]);

  /* ================= SAFETY ================= */
  if (!storeName) {
    return null;
  }

  /* ================= LOADING ================= */
  if (loading) {

    return (
      <AppShimmer />
    );
  }

  /* ================= ERROR ================= */
  if (
    error ||
    !data?.success
  ) {

    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "6rem"
        }}
      >
        <h1>
          Store Not Available
        </h1>

        <p>
          {
            error ||
            "This store does not exist."
          }
        </p>
      </div>
    );
  }

  /* ================= SUCCESS ================= */
  return (

    <div
      className="bg-main-layout"
      style={{
          "--store-primary-color": data?.data?.primaryColor || "var(--primary-color)"
        } as React.CSSProperties}>

      <ScrollToTop />

      <Navbar
        logoUrl={data?.data?.logoUrl}
        storeName={data?.data?.storeName}
        storeData={data?.data}
      />

      <Outlet
        context={{
          storeId: data?.data?.id,
          storeData: data?.data,
          storeName,
        }}
      />

      <Footer storeId={data?.data?.id} />

    </div>
  );
};

export default MainLayout;