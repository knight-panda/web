import Orders from "../order/Orders";
import { Outlet, useNavigate } from 'react-router-dom';
import AccountSidebar from "../../../components/sidebar/AccountSidebar";
import "./account.css";

const AccountPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(id);
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <AccountSidebar onTagClick={handleNavigation}/>
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPage;
