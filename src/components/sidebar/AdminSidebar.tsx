import React, { useEffect, useState } from "react";
import {
    FaChartLine,
    FaBox,
    FaFileMedical,
    FaSignOutAlt,
    FaUser,
    FaChevronDown,
    FaChevronRight,
    FaImages,
    FaStore
} from "react-icons/fa";

import { useLocation } from "react-router-dom";

import "./AdminSidebar.css";

interface ChildItem {
    id: string;
    label: string;
}

interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
    children?: ChildItem[];
}

interface AdminSidebarProps {
    onTagClick?: (tag: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onTagClick }) => {

    const location = useLocation();

    const [activeTag, setActiveTag] = useState<string>("");
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    // ⭐ handle refresh + active menu
    useEffect(() => {

        const currentPath =
            location.pathname === "/admin-dashboard"
                ? ""
                : location.pathname.split("/").pop() || "";

        setActiveTag(currentPath);

        // auto open store menu
        if (
            currentPath === "store-settings" ||
            currentPath === "store-information"
        ) {
            setOpenMenu("store");
        }

    }, [location.pathname]);

    const menuItems: MenuItem[] = [
        {
            id: "",
            label: "Dashboard",
            icon: FaChartLine,
        },

        {
            id: "orders",
            label: "My Orders",
            icon: FaBox,
        },

        {
            id: "store",
            label: "Store",
            icon: FaStore,
            children: [
                {
                    id: "store-settings",
                    label: "Store Settings",
                },
                {
                    id: "store-information",
                    label: "Store Information",
                },
            ],
        },

        {
            id: "carousels",
            label: "Carousels",
            icon: FaImages,
        },

        {
            id: "products",
            label: "Products",
            icon: FaFileMedical,
        },

        {
            id: "profile",
            label: "My Profile",
            icon: FaUser,
        },

        {
            id: "logout",
            label: "Logout",
            icon: FaSignOutAlt,
        },
    ];

    const handleClick = (id: string, hasChildren?: boolean) => {

        if (id === "logout") {

            const isConfirm = window.confirm(
                "Are you sure you want to logout?"
            );

            if (isConfirm) {

                // ⭐ clear token
                localStorage.removeItem("token");

                // optional
                localStorage.removeItem("refreshToken");

                // or clear all storage
                // localStorage.clear();

                window.location.href = "/";
            }

            return;
        }

        if (hasChildren) {

            setOpenMenu((prev) =>
                prev === id ? null : id
            );

        } else {

            setActiveTag(id);

            onTagClick?.(id);
        }
    };

    return (
        <div className="account-sidebar">

            <ul>

                {menuItems.map(({ id, label, icon: Icon, children }) => {

                    const isParentActive =
                        children?.some(
                            (child) => child.id === activeTag
                        );

                    return (
                        <React.Fragment key={id}>

                            <li
                                className={`
                                    ${activeTag === id || isParentActive ? "active" : ""}
                                    ${id === "logout" ? "logout" : ""}
                                `}
                                onClick={() =>
                                    handleClick(id, !!children)
                                }
                            >
                                <Icon />

                                <span>{label}</span>

                                {children && (
                                    openMenu === id ? (
                                        <FaChevronDown className="arrow" />
                                    ) : (
                                        <FaChevronRight className="arrow" />
                                    )
                                )}
                            </li>

                            {/* submenu */}
                            {children && openMenu === id && (

                                <div className="submenu">

                                    {children.map((child) => (

                                        <li
                                            key={child.id}
                                            className={`
                                                submenu-item
                                                ${activeTag === child.id ? "active" : ""}
                                            `}
                                            onClick={() =>
                                                handleClick(child.id)
                                            }
                                        >
                                            {child.label}
                                        </li>
                                    ))}

                                </div>
                            )}

                        </React.Fragment>
                    );
                })}

            </ul>

        </div>
    );
};

export default AdminSidebar;