import "./OrderItemsDetails.css";

import { FaAngleDown } from "react-icons/fa6";

const OrderSummaryDetails = () => {
    return (
        <div className="od-right">
            <div className="summary-card">
                <div className="sc-address-title">
                    <div>📍 Delivery Address</div>
                    <div className="sc-add-edit-btn"
                    >Add or Edit Address</div>
                </div>

                <div className="sc-address">
                    <div>Name - Debasish Sahoo</div>
                    <div>Number - 9437706875</div>
                    <div>Address - Bajapura near tarini mandira, Bajapura mahanga cuttack - 754023</div>
                </div>
            </div>

            <div className="summary-card clickable">
                <div className="sc-apply-coupon-title">Apply Coupon</div>
                <div className="sc-apply-coupon">
                    <div>Save more with coupons</div>
                    <FaAngleDown />
                </div>

            </div>

            <div className="summary-card bill">
                <div className="sc-bill-title">Bill Details</div>

                <div className="row">
                    <span>Item Total</span>
                    <span>₹803</span>
                </div>

                <div className="row">
                    <span>Handling Fee</span>
                    <span>₹9.80</span>
                </div>

                <div className="row">
                    <span>Delivery Fee</span>
                    <span className="free">FREE</span>
                </div>

                <div className="row">
                    <span>GST</span>
                    <span>₹1.76</span>
                </div>

                <hr />

                <div className="row total">
                    <span>To Pay</span>
                    <span>₹815</span>
                </div>
            </div>

        </div>
    );
};

export default OrderSummaryDetails;
