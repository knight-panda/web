import {
  FaMapMarkerAlt,
  FaBox,
  FaFileMedical,
  FaGift,
  FaUserShield,
  FaSignOutAlt,
  FaUser ,
} from "react-icons/fa";
import "./AccountSidebar.css";

const AccountSidebar = () => {
  return (
    <div className="account-sidebar">
      <div className="phone">+91 9437706875</div>

      <ul>
        <li><FaUser /> My Profile</li>
        <li><FaMapMarkerAlt /> My Addresses</li>
        <li className="active"><FaBox /> My Orders</li>
        <li><FaFileMedical /> My Prescriptions</li>
        <li><FaGift /> E-Gift Cards</li>
        <li><FaUserShield /> Account privacy</li>
        <li className="logout"><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default AccountSidebar;