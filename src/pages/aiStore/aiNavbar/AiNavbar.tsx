import React from 'react'
import './AiNavbar.css'
import navbarConfig from "./navbar.json";
import defaultLogo from "../../../assets/Knight Panda Logo.png";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";

const AiNavbar = () => {
    const styles = navbarConfig.styles;
    const layout = styles.layout;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileItems = [
        ...layout.left,
        ...layout.center,
        ...layout.right
    ].filter(item => item !== "logo" && item !== "cart");

    const navbarComponents = {
        logo: (
            <img
                className="logo-img"
                src={defaultLogo}
                alt="Logo"
            />
        ),

        search: (
            <div className="search-box">
                <CiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search products"
                />
            </div>
        ),

        user: (
            <div className="nav-item-user">
                <FaRegCircleUser className="nav-item-icon" />
                <span className="icon-text">Login</span>
            </div>
        ),

        orders: (
            <div className="nav-item">
                <MdOutlineShoppingBag className="nav-item-icon" />
                <span className="icon-text">Orders</span>
            </div>
        ),

        cart: (
            <div className="nav-item">
                <div className="nav-cart-inline">
                    <BsCart3 className="nav-item-icon" />
                    <span className="nav-item-count">3</span>
                </div>
                <span className="icon-text">Cart</span>
            </div>
        ),

        more: (
            <div className="nav-item">
                <IoMdMore className="nav-item-icon" />
            </div>
        )
    };

    const renderSection = (items: string[] = []) =>
        items.map((item) => (
            <React.Fragment key={item}>
                {
                    navbarComponents[
                    item as keyof typeof navbarComponents
                    ]
                }
            </React.Fragment>
        ));

    return (
        <div
            className="navbar"
            style={{
                "--navbar-bg": styles.backgroundColor,
                "--store-primary-color": styles.primaryColor,
                "--navbar-height": styles.height,
                "--navbar-padding-x": styles.paddingX,
                "--navbar-radius": styles.borderRadius,
                "--search-height": styles.searchHeight,
                "--search-width": styles.searchWidth,
                "--logo-height": styles.logoHeight,
                "--items-icon-size": styles.itemsIconSize,
                "--items-text-size": styles.itemsTextSize,
                "--items-color": styles.itemsColor,
                "--items-gap": styles.itemsGap,
                "--items-cart-count-text-size": styles.itemsCartCountTextSize,
                "--items-cart-count-size": styles.itemsCartCountSize,
                "--border-color": styles.borderColor
            } as React.CSSProperties}
        >

            {/* Desktop Navbar */}
            <div className="navbar-container desktop-navbar">

                <div className="navbar-left">
                    {renderSection(layout.left)}
                </div>

                <div className="navbar-center">
                    {renderSection(layout.center)}
                </div>

                <div className="navbar-right">
                    {renderSection(layout.right)}
                </div>

            </div>

            {/* Mobile & Tablet Navbar */}
            <div className="mobile-navbar">

                <HiOutlineMenu
                    className="mobile-menu-icon"
                    onClick={() => setIsMenuOpen(true)}
                />

                <img
                    className="logo-img"
                    src={defaultLogo}
                    alt="Logo"
                />

                <div className="nav-item">
                    <div className="nav-cart-inline">
                        <BsCart3 className="nav-item-icon" />
                        <span className="nav-item-count">3</span>
                    </div>
                </div>

            </div>

            {/* Sidebar */}
            <>
                <div
                    className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                <div
                    className={`mobile-sidebar ${isMenuOpen ? "open" : ""}`}
                >
                    <div className="mobile-sidebar-header">

                        <img
                            className="logo-img"
                            src={defaultLogo}
                            alt="Logo"
                        />

                        <button
                            className="mobile-close-btn"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ✕
                        </button>

                    </div>

                    {mobileItems.map((item) => (
                        <div
                            key={item}
                            className="mobile-sidebar-item"
                        >
                            {
                                navbarComponents[
                                item as keyof typeof navbarComponents
                                ]
                            }
                        </div>
                    ))}
                </div>
            </>

        </div>
    )
}

export default AiNavbar