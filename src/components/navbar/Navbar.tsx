import "./Navbar.css"
import logo from "../../assets/Knight Panda Logo.png" // put your logo image here

import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

const Navbar = () => {
    const cartCount = 3

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <img className="logo-img" src={logo} alt="logo" />


        <div className="search-box">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="nav-item-user">
          <FaRegCircleUser className="nav-item-icon" />
          <span className="icon-text">Login</span>
        </div>

        <div className="nav-item">
          <MdOutlineShoppingBag className="nav-item-icon" />
          <span className="icon-text">Order</span>
        </div>

        <div className="nav-item">
          <div className="nav-cart-inline">
            <BsCart3 className="nav-item-icon" />
            <span className="nav-item-count">{cartCount}</span>
          </div>
          <span className="icon-text">Cart</span>
        </div>

        <div className="nav-item">
          <IoMdMore className="nav-item-icon" />
        </div>
      </div>

    </div>
  )
}

export default Navbar
