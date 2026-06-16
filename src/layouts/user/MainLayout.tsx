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

    // ================= TITLE =================
    document.title = store.storeName || "Store";

    // ================= DESCRIPTION =================
    let metaDescription = document.querySelector(
      "meta[name='description']"
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      store.storeDescription || "Welcome to our store"
    );

    // ================= THEME COLOR =================
    let metaTheme = document.querySelector(
      "meta[name='theme-color']"
    );

    if (!metaTheme) {
      metaTheme = document.createElement("meta");
      metaTheme.setAttribute("name", "theme-color");
      document.head.appendChild(metaTheme);
    }

    metaTheme.setAttribute(
      "content",
      store.primaryColor || "#ff6b00"
    );

    // ================= FAVICON =================
    const favicon = store.faviconUrl || store.logoUrl;

    if (favicon) {
      document
        .querySelectorAll("link[rel*='icon']")
        .forEach((item) => item.remove());

      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = favicon;

      document.head.appendChild(link);
    }

    // ================= OG TITLE =================
    let ogTitle = document.querySelector(
      "meta[property='og:title']"
    );

    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute(
      "content",
      store.storeName || "Store"
    );

    // ================= OG DESCRIPTION =================
    let ogDescription = document.querySelector(
      "meta[property='og:description']"
    );

    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute(
        "property",
        "og:description"
      );
      document.head.appendChild(ogDescription);
    }

    ogDescription.setAttribute(
      "content",
      store.storeDescription || "Welcome to our store"
    );

    // ================= OG IMAGE =================
    let ogImage = document.querySelector(
      "meta[property='og:image']"
    );

    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }

    ogImage.setAttribute(
      "content",
      store.logoUrl || ""
    );

    // ================= OG URL =================
    let ogUrl = document.querySelector(
      "meta[property='og:url']"
    );

    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }

    ogUrl.setAttribute(
      "content",
      window.location.href
    );

    // ================= JSON-LD STORE SCHEMA =================
    const schema = {
      "@context": "https://schema.org",
      "@type": "Store",
      name: store.storeName,
      description: store.storeDescription,
      image: store.logoUrl,
      logo: store.logoUrl,
      url: window.location.origin,
    };

    let schemaTag = document.getElementById(
      "store-schema"
    ) as HTMLScriptElement | null;

    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.id = "store-schema";
      schemaTag.type = "application/ld+json";
      document.head.appendChild(schemaTag);
    }

    schemaTag.textContent = JSON.stringify(schema);

    return () => {
      const schema = document.getElementById("store-schema");
      schema?.remove();
    };
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