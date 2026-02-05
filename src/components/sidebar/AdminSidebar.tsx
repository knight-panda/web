import React, { useState } from "react"; // 1. Added useState import
import {
    FaMapMarkerAlt,
    FaBox,
    FaFileMedical,
    FaGift,
    FaUserShield,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";
import "./AdminSidebar.css";

interface AdminSidebarProps {
    onTagClick?: (tag: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onTagClick }) => {
    const [activeTag, setActiveTag] = useState("profile");

    const menuItems = [
        { id: "addresses", label: "My Addresses", icon: FaMapMarkerAlt },
        { id: "orders", label: "My Orders", icon: FaBox },
        { id: "products", label: "Products", icon: FaFileMedical },
        { id: "giftcards", label: "E-Gift Cards", icon: FaGift },
        { id: "privacy", label: "Account privacy", icon: FaUserShield },
        { id: "profile", label: "My Profile", icon: FaUser },
        { id: "logout", label: "Logout", icon: FaSignOutAlt },
    ];

    const handleClick = (id: string) => {
        if (id === "logout") {
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = "/login";
            }
        } else {
            setActiveTag(id); // Now works because setActiveTag is defined
            if (onTagClick) {
                onTagClick(id);
            }
        }
    };

    return (
        <div className="account-sidebar">
            <ul>
                {menuItems.map(({ id, label, icon: Icon }) => (
                    <li
                        key={id}
                        className={`${activeTag === id ? "active" : ""} ${id === "logout" ? "logout" : ""}`}
                        onClick={() => handleClick(id)}
                        style={{ cursor: "pointer" }}
                    >
                        <Icon /> {label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSidebar;