import React from 'react'
import "./AdminNavbar.css"
import logo from "../../assets/Knight Panda Logo.png" // put your logo image here
import { useNavigate } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { FaStoreAlt } from "react-icons/fa";


const AdminNavbar = () => {
    const navigate = useNavigate();
    const cartCount = 3

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
                    <div className="nav-item-user" onClick={goToLogin}>
                        <FaStoreAlt className="nav-item-icon" />
                        <span className="icon-text">Create Store</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminNavbar