import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  FaBox,
  FaUserShield,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import "./AccountSidebar.css";

import { useUserUpdateProfile } from "../../hooks/user/address/useUserUpdateProfile";

interface AccountSidebarProps {
  onTagClick?: (tag: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  onTagClick
}) => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    fetchUserData,
    data,
  } = useUserUpdateProfile();

  const [activeTag, setActiveTag] =
    useState("my-profile");

  // ⭐ fetch user profile
  useEffect(() => {

    fetchUserData();

  }, []);

  // ⭐ sync active tab with route
  useEffect(() => {

    if (
      location.pathname === "/privacy-policy"
    ) {

      setActiveTag("/privacy-policy");

      return;
    }

    const savedTag =
      localStorage.getItem("activeTag");

    if (savedTag) {

      setActiveTag(savedTag);
    }

  }, [location.pathname]);

  const menuItems = [
    {
      id: "my-profile",
      label: "My Profile",
      icon: FaUser,
    },

    {
      id: "my-orders",
      label: "My Orders",
      icon: FaBox,
    },

    {
      id: "/privacy-policy",
      label: "Account Privacy",
      icon: FaUserShield,
    },

    {
      id: "logout",
      label: "Logout",
      icon: FaSignOutAlt,
    },
  ];

  const handleClick = (
    id: string
  ) => {

    if (id === "logout") {

      const isConfirm =
        window.confirm(
          "Are you sure you want to logout?"
        );

      if (isConfirm) {

        localStorage.clear();

        navigate("/login");
      }

      return;
    }

    // privacy page
    if (id === "/privacy-policy") {

      setActiveTag(id);

      navigate("/privacy-policy");

      return;
    }

    localStorage.setItem(
      "activeTag",
      id
    );

    setActiveTag(id);

    onTagClick?.(id);
  };

  return (
    <div className="account-sidebar">

      {/* profile */}
      <div className="as-profile">

        <img
          src={
            data?.data.profile ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="as-profile-icon"
          onError={(e) => {
            e.currentTarget.src =
              "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }}
        />

        <div className="as-user-info">

          <div className="as-user-name">
            {
              data?.data.name ||
              "User"
            }
          </div>

          <div className="as-user-phone">
            {
              data?.data.phone
            }
          </div>

        </div>

      </div>

      {/* menu */}
      <div className="as-menu-items">

        {menuItems.map(({
          id,
          label,
          icon: Icon
        }) => (

          <li
            key={id}
            className={`
                            ${activeTag === id ? "active" : ""}
                            ${id === "logout" ? "logout" : ""}
                        `}
            onClick={() =>
              handleClick(id)
            }
          >

            <Icon />

            <span>{label}</span>

          </li>
        ))}

      </div>

    </div>
  );
};

export default AccountSidebar;