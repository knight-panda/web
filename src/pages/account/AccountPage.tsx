import Orders from "../../components/order/Orders";
import AccountSidebar from "../../components/sidebar/AccountSidebar";
import "./account.css";

const AccountPage = () => {
  return (
    <div className="account-page">
      <div className="account-container">
        <AccountSidebar />
        <Orders />
      </div>
    </div>
  );
};

export default AccountPage;
