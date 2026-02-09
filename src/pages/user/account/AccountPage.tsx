import Orders from "../order/Orders";
import { Outlet, useNavigate } from 'react-router-dom';
import AccountSidebar from "../../../components/sidebar/AccountSidebar";
import "./account.css";

const AccountPage = () => {
  return (
    <div className="account-page">
      <div className="account-container">
        <AccountSidebar />
        <Outlet />
        <Orders />
      </div>
    </div>
  );
};

export default AccountPage;
