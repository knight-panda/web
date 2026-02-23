import React from 'react'
import "./AdminNavbar.css"
import CrazoWeb from "../../assets/crazoweb_logo.png" // put your logo image here
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
        <div className="admin-navbar">

            <div className="admin-navbar-container">
                {/* LEFT */}
                <div className="admin-navbar-left">
                    <img className="admin-logo-img" src={CrazoWeb} alt="logo" onClick={goToHome} />


                    <div className="admin-search-box">
                        <CiSearch className="admin-search-icon" />
                        <input
                            type="text"
                            placeholder="Search for products"
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="admin-navbar-right">
                    <div className="admin-nav-item-user" onClick={goToLogin}>
                        <FaStoreAlt className="admin-nav-item-icon" />
                        <span className="admin-icon-text">Create Store</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminNavbar