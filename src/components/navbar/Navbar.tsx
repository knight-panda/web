import { useState } from "react";
import "./Navbar.css";
import defaultLogo from "../../assets/Knight Panda Logo.png";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import type { Store } from "../../models/store/response/SingleStoreResponse";

/* ================= TYPES ================= */

interface NavbarProps {
  logoUrl?: string;
  storeName?: string;
  storeData?: Store;
}

interface NavbarSettings {
  bgColor: string;
  showSearch: boolean;
  showLogin: boolean;
  showOrders: boolean;
  showCart: boolean;
}

/* ================= COMPONENT ================= */

const Navbar: React.FC<NavbarProps> = ({
  logoUrl,
  storeName,
  storeData,
}) => {

  const activeStoreId = localStorage.getItem("activeStoreId");
  const storeTokens = JSON.parse(localStorage.getItem("storeTokens") || "{}");
  const isLoggedIn = activeStoreId && storeTokens[activeStoreId];

  const [openModal, setOpenModal] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const cartCount: number = 0;
  const [settings, setSettings] =
    useState<NavbarSettings>({
      bgColor: "#ffffff",
      showSearch: true,
      showLogin: true,
      showOrders: true,
      showCart: true,
    });

  /* ================= TOGGLE ================= */

  const handleToggle = (
    key: keyof NavbarSettings
  ) => {

    setSettings((prev) => ({
      ...prev,
      [key]:
        !prev[key] as boolean,
    }));
  };

  /* ================= NAVIGATION ================= */

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToAccount = () => {
    navigate("account");
  };

  const goToOrders = () => {
    navigate("account/my-orders");
  };

  const goToLogin = () => {
    navigate("login");
  };

  /* ================= UI ================= */

  return (

    <>

      <div
        className="navbar"
        style={{
          "--store-primary-color": storeData?.primaryColor || "var(--primary-color)"
        } as React.CSSProperties}
      >

        <div className="navbar-container">

          {/* LEFT */}
          <div className="navbar-left">

            {/* LOGO */}
            <img
              className="logo-img"
              src={
                logoUrl ||
                defaultLogo
              }
              alt={
                storeName ||
                "logo"
              }
              onClick={goToHome}
            />

            {/* SEARCH */}
            {settings.showSearch && (

              <div className="search-box">

                <CiSearch
                  className="search-icon"
                />

                <input
                  type="text"
                  placeholder="Search products"
                />

              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="navbar-right">

            {/* LOGIN */}
            {settings.showLogin && !isLoggedIn && (

              <div
                className="nav-item-user"
                onClick={goToLogin}
              >

                <FaRegCircleUser
                  className="nav-item-icon"
                />

                <span className="icon-text">
                  Login
                </span>

              </div>
            )}

            {/* ORDERS */}
            {settings.showOrders && (

              <div
                className="nav-item"
                onClick={goToOrders}
              >

                <MdOutlineShoppingBag
                  className="nav-item-icon"
                />

                <span className="icon-text">
                  Orders
                </span>

              </div>
            )}

            {/* CART */}
            {settings.showCart && (

              <div
                className="nav-item"
                onClick={goToCart}
              >

                <div className="nav-cart-inline">

                  <BsCart3
                    className="nav-item-icon"
                  />

                  {cartCount >= 1 && (
                    <span
                      className="nav-item-count"
                      style={{
                        backgroundColor:
                          storeData?.primaryColor || "var(--primary-color)"
                      }}
                    >
                      {cartCount}
                    </span>
                  )}

                </div>

                <span className="icon-text">
                  Cart
                </span>

              </div>
            )}

            {/* MORE */}
            <div
              className="nav-item"
              onClick={goToAccount}
            >

              <IoMdMore
                className="nav-item-icon"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ================= POPUP ================= */}

      {openModal && (

        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>
                Edit Navbar
              </h3>

              <button
                onClick={() => setOpenModal(false)}
              >
                ✕
              </button>

            </div>

            <div className="modal-body">

              {/* Background Color */}
              <label>

                Navbar Background Color

                <input
                  type="color"
                  value={
                    settings.bgColor
                  }
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      bgColor:
                        e.target.value,
                    }))
                  }
                />

              </label>

              {/* TOGGLES */}

              <label>
                <input
                  type="checkbox"
                  checked={
                    settings.showSearch
                  }
                  onChange={() =>
                    handleToggle(
                      "showSearch"
                    )
                  }
                />
                Show Search
              </label>

              <label>

                <input
                  type="checkbox"
                  checked={
                    settings.showLogin
                  }
                  onChange={() =>
                    handleToggle(
                      "showLogin"
                    )
                  }
                />
                Show Login
              </label>

              <label>

                <input
                  type="checkbox"
                  checked={settings.showOrders}
                  onChange={() => handleToggle("showOrders")}
                />
                Show Orders
              </label>

              <label>

                <input
                  type="checkbox"
                  checked={settings.showCart}
                  onChange={() => handleToggle("showCart")}
                />
                Show Cart
              </label>

            </div>

            <div className="modal-footer">

              <button
                className="model-close-btn"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>

              <button
                className="model-save-btn"
                onClick={() => setOpenModal(false)}
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;