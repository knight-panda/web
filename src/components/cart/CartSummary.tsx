import "./Cart.css";

import { FaAngleDown } from "react-icons/fa6";

type CartSummaryProps = {
    addEditAddress: () => void;
    grandTotal: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({
    addEditAddress,
    grandTotal,
}) => {

    // ✅ charges
    const handlingFee = 9.8;

    const gst = Number(
        (grandTotal * 0.02).toFixed(2)
    );

    const finalTotal = Number(
        (grandTotal + handlingFee + gst).toFixed(2)
    );

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
                        Name - Debasish Sahoo
                    </div>

                    <div>
                        Number - 9437706875
                    </div>

                    <div>
                        Address - Bajapura near tarini mandira,
                        Bajapura mahanga cuttack - 754023
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
                        ₹{grandTotal.toFixed(2)}
                    </span>

                </div>

                {/* HANDLING */}
                <div className="row">

                    <span>Handling Fee</span>

                    <span>
                        ₹{handlingFee.toFixed(2)}
                    </span>

                </div>

                {/* DELIVERY */}
                <div className="row">

                    <span>Delivery Fee</span>

                    <span className="free">
                        FREE
                    </span>

                </div>

                {/* GST */}
                <div className="row">

                    <span>GST</span>

                    <span>
                        ₹{gst.toFixed(2)}
                    </span>

                </div>

                <hr />

                {/* FINAL */}
                <div className="row total">

                    <span>To Pay</span>

                    <span>
                        ₹{finalTotal.toFixed(2)}
                    </span>

                </div>

            </div>

            {/* PAY */}
            <button className="pay-btn">

                Pay ₹{finalTotal.toFixed(2)}

            </button>

        </div>
    );
};

export default CartSummary;