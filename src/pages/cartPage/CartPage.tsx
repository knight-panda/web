import { useState } from "react";
import CartItems from "../../components/cart/CartItems";
import CartSummary from "../../components/cart/CartSummary";
import AddressDialog from "../../components/address/AddressDialog";
import "./CartPage.css";

const CartPage = () => {
  const [openAddress, setOpenAddress] = useState(false);

  const handleAddEditAddress = () => {
    setOpenAddress(true);
  };

  const closeAddressDialog = () => {
    setOpenAddress(false);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <CartItems />
        <CartSummary addEditAddress={handleAddEditAddress} />
      </div>

      {openAddress && (
        <AddressDialog onClose={closeAddressDialog} />
      )}
    </div>
  );
};

export default CartPage;