import React from 'react';
import './AdminHome.css';

import CrazoWebHomeImage from "../../../assets/CrazoWeb_Home_Page.png";
import AhBgImg from "../../../assets/ah_bg_img.png";

interface AdminNavbarProps {
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHome: React.FC<AdminNavbarProps> = ({ setOpenLogin }) => {

    return (
        <section className="ah-main">

            {/* Background Shape */}
            <img
                className="ah-bg-img"
                src={AhBgImg}
                alt=""
            />

            <div className="ah-container">

                {/* Left Content */}
                <div className="ah-left-side">

                    <div className="ah-intro-title">
                        Build Your Online Store.
                        <span> Grow Your Business.</span>
                    </div>

                    <div className="ah-intro-desc">
                        Create your eCommerce website and mobile app,
                        manage products, orders, and customers, and grow
                        your business — all from one powerful platform.
                    </div>

                    <button
                        className="ah-intro-btn"
                        onClick={() => setOpenLogin(true)}
                    >
                        Create Your Store →
                    </button>

                </div>

                {/* Right Dashboard */}
                <div className="ah-right-side">

                    <img
                        className="ah-intro-img"
                        src={CrazoWebHomeImage}
                        alt="CrazoWeb eCommerce Dashboard"
                    />

                </div>

            </div>

        </section>
    );
};

export default AdminHome;