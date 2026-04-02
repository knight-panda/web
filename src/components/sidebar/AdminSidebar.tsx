import React, { useState } from "react";
import {
    FaChartLine,
    FaBox,
    FaStore,
    FaFileMedical,
    FaGift,
    FaUserShield,
    FaSignOutAlt,
    FaUser,
    FaChevronDown,
    FaChevronRight,
    FaImages
} from "react-icons/fa";
import "./AdminSidebar.css";

interface MenuItem {
    id: string;
    label: string;
    icon: any;
    children?: { id: string; label: string }[];
}

interface AdminSidebarProps {
    onTagClick?: (tag: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onTagClick }) => {
    const [activeTag, setActiveTag] = useState("profile");
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const menuItems: MenuItem[] = [
        { id: "", label: "Dashboard", icon: FaChartLine },

        {
            id: "orders",
            label: "My Orders",
            icon: FaBox,
            children: [
                { id: "orders", label: "All Orders" },
                { id: "pending-orders", label: "Pending Orders" },
            ],
        },

        {
            id: "/edit-store",
            label: "Store",
            icon: FaStore,
        },

        {
            id: "/carousels",
            label: "Carousels",
            icon: FaImages,
        },

        {
            id: "products",
            label: "Products",
            icon: FaFileMedical,
            children: [
                { id: "all-products", label: "All Products" },
                { id: "add-product", label: "Add Product" },
            ],
        },

        { id: "giftcards", label: "E-Gift Cards", icon: FaGift },
        { id: "privacy", label: "Account Privacy", icon: FaUserShield },
        { id: "profile", label: "My Profile", icon: FaUser },
        { id: "logout", label: "Logout", icon: FaSignOutAlt },
    ];

    const handleClick = (id: string, hasChildren?: boolean) => {
        if (id === "logout") {
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = "/login";
            }
            return;
        }

        if (hasChildren) {
            setOpenMenu(openMenu === id ? null : id);
        } else {
            setActiveTag(id);
            if (onTagClick) {
                onTagClick(id);
            }
        }
    };

    return (
        <div className="account-sidebar">
            <ul>
                {menuItems.map(({ id, label, icon: Icon, children }) => (
                    <React.Fragment key={id}>
                        <li
                            className={`${activeTag === id ? "active" : ""
                                } ${id === "logout" ? "logout" : ""}`}
                            onClick={() => handleClick(id, !!children)}
                            style={{ cursor: "pointer" }}
                        >
                            <Icon />
                            <span>{label}</span>

                            {children &&
                                (openMenu === id ? (
                                    <FaChevronDown className="arrow" />
                                ) : (
                                    <FaChevronRight className="arrow" />
                                ))}
                        </li>

                        {/* Subitems */}
                        {children && openMenu === id && (
                            <div className="submenu">
                                {children.map((child) => (
                                    <li
                                        key={child.id}
                                        className={`submenu-item ${activeTag === child.id ? "active" : ""
                                            }`}
                                        onClick={() => handleClick(child.id)}
                                    >
                                        {child.label}
                                    </li>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default AdminSidebar;