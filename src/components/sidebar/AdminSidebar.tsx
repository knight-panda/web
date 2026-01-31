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

const AdminSidebar = () => {
    return (
        <div className="account-sidebar">
            <ul>
                <li><FaMapMarkerAlt /> My Addresses</li>
                <li className="active"><FaBox /> My Orders</li>
                <li><FaFileMedical /> My Prescriptions</li> 
                <li><FaGift /> E-Gift Cards</li>
                <li><FaUserShield /> Account privacy</li>
                <li><FaUser /> My Profile</li>
                <li className="logout"><FaSignOutAlt /> Logout</li>
            </ul>
        </div>
    );
};

export default AdminSidebar