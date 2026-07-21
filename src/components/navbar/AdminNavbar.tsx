import React from 'react'
import "./AdminNavbar.css"
import CrazoWeb from "../../assets/crazoweb_logo.png"
import { CiSearch } from "react-icons/ci";
import { FaStoreAlt } from "react-icons/fa";

interface AdminNavbarProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ setOpenLogin }) => {

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-container">

        {/* LEFT */}
        <div className="admin-navbar-left">
          <img
            className="admin-logo-img"
            src={CrazoWeb}
            alt="logo"
          />

          <div className="admin-search-box">
            <CiSearch className="admin-search-icon" />
            <input type="text" placeholder="Search for products" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="admin-navbar-right">
          <div
            className="admin-nav-item-user"
            onClick={() => setOpenLogin(true)}
          >
            <FaStoreAlt className="admin-nav-item-icon" />
            <span className="admin-icon-text">Create Store</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminNavbar