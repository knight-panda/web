import "./Navbar.css"
import logo from "../../assets/Knight Panda Logo.png" // put your logo image here
import { useNavigate } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const cartCount = 3

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToAccount = () => {
    navigate("/account");
  };

  return (
    <div className="navbar">

      <div className="navbar-container">
        {/* LEFT */}
        <div className="navbar-left">
          <img className="logo-img" src={logo} alt="logo" onClick={goToHome} />


          <div className="search-box">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for products"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          <div className="nav-item-user">
            <FaRegCircleUser className="nav-item-icon" />
            <span className="icon-text">Login</span>
          </div>

          <div className="nav-item" onClick={goToAccount}>
            <MdOutlineShoppingBag className="nav-item-icon" />
            <span className="icon-text">Order</span>
          </div>

          <div className="nav-item" onClick={goToCart}>
            <div className="nav-cart-inline" >
              <BsCart3 className="nav-item-icon" />
              <span className="nav-item-count">{cartCount}</span>
            </div>
            <span className="icon-text">Cart</span>
          </div>

          <div className="nav-item" onClick={goToAccount}>
            <IoMdMore className="nav-item-icon" />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Navbar
