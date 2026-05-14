import { useEffect, useState } from "react";

import CartItems from "../../../components/cart/CartItems";
import CartSummary from "../../../components/cart/CartSummary";
import AddressDialog from "../../../components/address/AddressDialog";

import "./CartPage.css";
import { useGetCart } from "../../../hooks/user/cart/useGetCart";
import { useUserAddress } from "../../../hooks/user/address/useUserAddress";

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

  const {
    fetchAddress,
    data: addressData,
  } = useUserAddress();

  // ✅ fetch cart
  useEffect(() => {

    fetchCart();
    fetchAddress();

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
          addressData={
            addressData?.data
          }
          // totals
          itemTotal={data?.data.itemTotal || 0}
          totalDiscount={data?.data.totalDiscount || 0}
          packagingFee={data?.data.packagingFee || 0}
          deliveryFee={data?.data.deliveryFee || 0}
          platformFee={data?.data.platformFee || 0}
          codFee={data?.data.codFee || 0}
          gstAmount={data?.data.gstAmount || 0}
          grandTotal={data?.data.grandTotal || 0}
          codEnabled={data?.data.codEnabled || false}
          onlinePaymentEnabled={data?.data.onlinePaymentEnabled || false}
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
          addressData={addressData?.data}
          fetchAddress={fetchAddress}
        />
      )}

    </div>
  );
};

export default CartPage;