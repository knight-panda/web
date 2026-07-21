import React, { useEffect, useState } from 'react'
import './AdminLayout.css'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminFooter from '../../components/footer/AdminFooter'
import AdminHome from '../../pages/admin/home/AdminHome'
import OurServices from '../../pages/admin/ourServices/OurServices'
import AdminPricing from '../../pages/admin/pricing/AdminPricing'
import AdminLogin from "../../pages/admin/adminAuth/AdminLogin"

const AdminLayout: React.FC = () => {

  const [openLogin, setOpenLogin] = useState<boolean>(false)

  useEffect(() => {

    document.title = "CrazoWeb - Create Your Online Store";

    // Description
    let description = document.querySelector(
      "meta[name='description']"
    );

    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    description.setAttribute(
      "content",
      "CrazoWeb helps businesses create and manage online stores with products, orders, payments, and custom domains."
    );

    // Open Graph Title
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
      "CrazoWeb - Create Your Online Store"
    );

    // Open Graph Description
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
      "Build your online store with CrazoWeb."
    );

    // Open Graph Image
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
      "https://storage.googleapis.com/crazoweb-storage/products/crazoweb_icon.png"
    );

    // Favicon
    document
      .querySelectorAll("link[rel*='icon']")
      .forEach((item) => item.remove());

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href =
      "https://storage.googleapis.com/crazoweb-storage/products/crazoweb_icon.png";

    document.head.appendChild(favicon);

    // Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CrazoWeb",
      url: window.location.origin,
      logo:
        "https://storage.googleapis.com/crazoweb-storage/products/crazoweb_icon.png",
      description:
        "Create and manage online stores with CrazoWeb."
    };

    let schemaTag = document.getElementById(
      "crazoweb-schema"
    ) as HTMLScriptElement | null;

    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.id = "crazoweb-schema";
      schemaTag.type = "application/ld+json";
      document.head.appendChild(schemaTag);
    }

    schemaTag.textContent = JSON.stringify(schema);

  }, []);

  return (
    <>
      <AdminNavbar setOpenLogin={setOpenLogin} />

      <AdminHome setOpenLogin={setOpenLogin} />
      <OurServices />
      <AdminPricing />
      <AdminFooter />

      {/* ===== LOGIN MODAL HERE ===== */}
      {openLogin && (
        <AdminLogin onClose={() => setOpenLogin(false)} />
      )}
    </>
  )
}

export default AdminLayout