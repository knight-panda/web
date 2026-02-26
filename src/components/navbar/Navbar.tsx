import { useState } from "react"
import "./Navbar.css"
import logo from "../../assets/Knight Panda Logo.png" // put your logo image here
import { useNavigate } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

interface NavbarSettings {
  logo: string
  bgColor: string
  showSearch: boolean
  showLogin: boolean
  showOrders: boolean
  showCart: boolean
}

const Navbar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate();
  const cartCount: number = 3

  const [settings, setSettings] = useState<NavbarSettings>({
    logo: logo,
    bgColor: "#ffffff",
    showSearch: true,
    showLogin: true,
    showOrders: true,
    showCart: true,
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSettings(prev => ({ ...prev, logo: imageUrl }))
    }
  }

  const handleToggle = (key: keyof NavbarSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key] as boolean,
    }))
  }

  const goToCart = () => {
    navigate("/my-store/cart");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToAccount = () => {
    navigate("account");
  };

  const goToLogin = () => {
    navigate("login");
  };

  return (
    <>
      <div className="navbar"
        style={{ backgroundColor: settings.bgColor }}
        onClick={() => setOpenModal(true)}>

        <div className="navbar-container">
          {/* LEFT */}
          <div className="navbar-left">
             <img className="logo-img" src={settings.logo} alt="logo" onClick={() =>{goToHome()}}/>

            {settings.showSearch && (
              <div className="search-box">
                <CiSearch />
                <input type="text" placeholder="Search products" />
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="navbar-right">
            {settings.showLogin && (
              <div className="nav-item-user">
                <FaRegCircleUser className="nav-item-icon" />
                <span className="icon-text">Login</span>
              </div>

            )}

            {settings.showOrders && (
              <div className="nav-item">
                <MdOutlineShoppingBag className="nav-item-icon" />
                <span className="icon-text">Order</span>
              </div>
            )}

            {settings.showCart && (
              <div className="nav-item">
                <div className="nav-cart-inline" >
                  <BsCart3 className="nav-item-icon" />
                  <span className="nav-item-count">{cartCount}</span>
                </div>
                <span className="icon-text">Cart</span>
              </div>
            )}

            <div className="nav-item" onClick={goToAccount}>
              <IoMdMore className="nav-item-icon" />
            </div>
          </div>

        </div>
      </div>

      {/* ================= POPUP DIALOG ================= */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Edit Navbar</h3>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              {/* Upload Logo */}
              <label>
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>

              {/* Background Color */}
              <label>
                Navbar Background Color
                <input
                  type="color"
                  value={settings.bgColor}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      bgColor: e.target.value,
                    }))
                  }
                />
              </label>

              {/* Toggles */}
              <label>
                <input
                  type="checkbox"
                  checked={settings.showSearch}
                  onChange={() => handleToggle("showSearch")}
                />
                Show Search
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={settings.showLogin}
                  onChange={() => handleToggle("showLogin")}
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
              <button className="model-close-btn" onClick={() => setOpenModal(false)}>Close</button>
              <button className="model-save-btn" onClick={() => setOpenModal(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default Navbar
