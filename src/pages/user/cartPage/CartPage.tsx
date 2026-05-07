import { useEffect, useState } from "react";

import CartItems from "../../../components/cart/CartItems";
import CartSummary from "../../../components/cart/CartSummary";
import AddressDialog from "../../../components/address/AddressDialog";

import "./CartPage.css";
import { useGetCart } from "../../../hooks/user/cart/useGetCart";

const CartPage = () => {

  const [openAddress, setOpenAddress] =
    useState(false);

  // ✅ cart hook
  const {
    fetchCart,
    loading,
    data,
    error,
  } = useGetCart();

  // ✅ fetch cart
  useEffect(() => {

    fetchCart();

  }, []);

  const handleAddEditAddress = () => {
    setOpenAddress(true);
  };

  const closeAddressDialog = () => {
    setOpenAddress(false);
  };

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* LEFT */}
        <CartItems
          items={data?.data.items || []}
          loading={loading}
          fetchCart={fetchCart}
        />

        {/* RIGHT */}
        <CartSummary
          addEditAddress={handleAddEditAddress}
          grandTotal={data?.data.grandTotal || 0}
        />

      </div>

      {/* ERROR */}
      {error && (
        <div className="cart-error">
          {error}
        </div>
      )}

      {/* ADDRESS DIALOG */}
      {openAddress && (
        <AddressDialog
          onClose={closeAddressDialog}
        />
      )}

    </div>
  );
};

export default CartPage;