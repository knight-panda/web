import type { UserOrderDetailsModel } from "../../models/user/order/response/UserOrderDetailsModel";
import "./OrderItemsDetails.css";

import { FaAngleDown } from "react-icons/fa6";

type Props = {
    order: UserOrderDetailsModel;
};

const OrderSummaryDetails = ({
    order,
}: Props) => {

    return (
        <div className="od-right">

            {/* ADDRESS */}
            <div className="summary-card">

                <div className="sc-address-title">

                    <div>
                        📍 Delivery Address
                    </div>

                </div>

                <div className="sc-address">

                    <div>
                        Name - {order.customerName}
                    </div>

                    <div>
                        Number - {order.customerPhone}
                    </div>

                    <div>
                        Address - {order.deliveryAddress}
                        {
                            order.city &&
                            `, ${order.city}`
                        }
                        {
                            order.state &&
                            `, ${order.state}`
                        }
                        {
                            order.pincode &&
                            ` - ${order.pincode}`
                        }
                    </div>

                </div>

            </div>

            {/* BILL DETAILS */}
            <div className="summary-card bill">

                <div className="sc-bill-title">
                    Bill Details
                </div>

                {/* ITEM TOTAL */}
                <div className="row">

                    <span>
                        Item Total
                    </span>

                    <span>
                        ₹{order.itemTotal}
                    </span>

                </div>

                {/* DISCOUNT */}
                <div className="row">

                    <span>
                        Discount
                    </span>

                    <span className="free">
                        - ₹{order.totalDiscount}
                    </span>

                </div>

                {/* PACKAGING */}
                <div className="row">

                    <span>
                        Packaging Fee
                    </span>

                    <span>
                        ₹{order.packagingFee}
                    </span>

                </div>

                {/* PLATFORM */}
                <div className="row">

                    <span>
                        Platform Fee
                    </span>

                    <span>
                        ₹{order.platformFee}
                    </span>

                </div>

                {/* DELIVERY */}
                <div className="row">

                    <span>
                        Delivery Fee
                    </span>

                    <span>
                        {
                            order.deliveryFee === 0
                                ? "FREE"
                                : `₹${order.deliveryFee}`
                        }
                    </span>

                </div>

                {/* COD */}
                <div className="row">

                    <span>
                        COD Fee
                    </span>

                    <span>
                        ₹{order.codFee}
                    </span>

                </div>

                {/* GST */}
                <div className="row">

                    <span>
                        GST
                    </span>

                    <span>
                        ₹{order.gstAmount}
                    </span>

                </div>

                <hr />

                {/* GRAND TOTAL */}
                <div className="row total">

                    <span>
                        To Pay
                    </span>

                    <span>
                        ₹{order.grandTotal}
                    </span>

                </div>

            </div>

            {/* Payment Status */}
            <div className="summary-card clickable">

                <div className="sc-apply-coupon-title">
                    Payment Status
                </div>

                <div className="sc-apply-coupon">

                    <div
                        className={`order-payment-status ${order.paymentStatus?.toLowerCase()}`}
                    >

                        {
                            order.paymentStatus === "SUCCESS"
                                ? "Payment Completed"
                                : order.paymentStatus === "PENDING"
                                    ? "Cash On Delivery"
                                    : order.paymentStatus === "FAILED"
                                        ? "Payment Failed"
                                        : order.paymentStatus === "REFUNDED"
                                            ? "Payment Refunded"
                                            : order.paymentStatus
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderSummaryDetails;