import type { UserAddressData } from "../../models/user/address/response/UserAddressResponse ";
import "./Cart.css";

import { FaAngleDown } from "react-icons/fa6";

type CartSummaryProps = {
    addEditAddress: () => void;
    addressData?: UserAddressData;
    itemTotal: number;
    totalDiscount: number;
    packagingFee: number;
    deliveryFee: number;
    platformFee: number;
    codFee: number;
    gstAmount: number;
    grandTotal: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({
    addEditAddress,
    addressData,
    itemTotal,
    totalDiscount,
    packagingFee,
    deliveryFee,
    platformFee,
    codFee,
    gstAmount,
    grandTotal,
}) => {

    return (

        <div className="cart-right">

            {/* ADDRESS */}
            <div className="summary-card">

                <div className="sc-address-title">

                    <div>
                        📍 Delivery Address
                    </div>

                    <div
                        className="sc-add-edit-btn"
                        onClick={addEditAddress}
                    >
                        Add or Edit Address
                    </div>

                </div>

                {/* TEMP ADDRESS */}
                <div className="sc-address">

                    <div>
                        Name - {addressData?.name || "N/A"}
                    </div>

                    <div>
                        Number - {addressData?.phone || "N/A"}
                    </div>

                    <div>
                        Address -
                        {
                            `${addressData?.houseNo || ""}
       ${addressData?.area || ""}
       ${addressData?.city || ""}
       ${addressData?.state || ""}
       ${addressData?.pincode || ""}`
                        }
                    </div>

                </div>

            </div>

            {/* COUPON */}
            <div className="summary-card clickable">

                <div className="sc-apply-coupon-title">
                    Apply Coupon
                </div>

                <div className="sc-apply-coupon">

                    <div>
                        Save more with coupons
                    </div>

                    <FaAngleDown />

                </div>

            </div>

            {/* BILL */}
            <div className="summary-card bill">

                <div className="sc-bill-title">
                    Bill Details
                </div>

                {/* ITEM TOTAL */}
                <div className="row">

                    <span>Item Total</span>

                    <span>
                        ₹{itemTotal.toFixed(2)}
                    </span>

                </div>

                {/* DISCOUNT */}
                {totalDiscount > 0 && (

                    <div className="row">

                        <span>Discount</span>

                        <span className="free">
                            -₹{totalDiscount.toFixed(2)}
                        </span>

                    </div>
                )}

                {/* PACKAGING */}
                {packagingFee > 0 && (

                    <div className="row">

                        <span>Packaging Fee</span>

                        <span>
                            ₹{packagingFee.toFixed(2)}
                        </span>

                    </div>
                )}

                {/* DELIVERY */}
                <div className="row">

                    <span>Delivery Fee</span>

                    {deliveryFee <= 0 ? (

                        <span className="free">
                            FREE
                        </span>

                    ) : (

                        <span>
                            ₹{deliveryFee.toFixed(2)}
                        </span>
                    )}

                </div>

                {/* PLATFORM */}
                {platformFee > 0 && (

                    <div className="row">

                        <span>Platform Fee</span>

                        <span>
                            ₹{platformFee.toFixed(2)}
                        </span>

                    </div>
                )}

                {/* COD */}
                {codFee > 0 && (

                    <div className="row">

                        <span>COD Fee</span>

                        <span>
                            ₹{codFee.toFixed(2)}
                        </span>

                    </div>
                )}

                {/* GST */}
                {gstAmount > 0 && (

                    <div className="row">

                        <span>GST</span>

                        <span>
                            ₹{gstAmount.toFixed(2)}
                        </span>

                    </div>
                )}

                <hr />

                {/* FINAL */}
                <div className="row total">

                    <span>To Pay</span>

                    <span>
                        ₹{grandTotal.toFixed(2)}
                    </span>

                </div>

            </div>

            {/* PAY */}
            <button className="pay-btn">

                Pay ₹{grandTotal.toFixed(2)}

            </button>

        </div>
    );
};

export default CartSummary;