import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaBox,
  FaFileMedical,
  FaGift,
  FaUserShield,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import "./AccountSidebar.css";

interface AccountSidebarProps {
  onTagClick?: (tag: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ onTagClick }) => {
  const [activeTag, setActiveTag] = useState("my-profile");

  const menuItems = [
    { id: "my-profile", label: "My Profile", icon: FaUser },
    { id: "my-orders", label: "My Orders", icon: FaBox },
    { id: "addresses", label: "My Addresses", icon: FaMapMarkerAlt },
    { id: "giftcards", label: "E-Gift Cards", icon: FaGift },
    { id: "privacy", label: "Account privacy", icon: FaUserShield },
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
      <div className="as-profile">
        <FaUserCircle className="as-profile-icon" />

        <div className="as-user-info">
          <div className="as-user-name">Debasish Sahoo</div>
          <div className="as-user-phone">+91 9437706875</div>
        </div>

      </div>

      <div className="as-menu-items">
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
      </div>
    </div>
  );
};

export default AccountSidebar;