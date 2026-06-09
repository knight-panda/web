import { useState, useEffect } from "react";
import { useCreateRazorpayOrder } from "../../hooks/user/order/useCreateRazorpayOrder";
import { useCreateUserOrder } from "../../hooks/user/order/useCreateUserOrder";
import type { UserAddressData } from "../../models/user/address/response/UserAddressResponse ";
import { loadRazorpayScript } from "../../utils/razorpay";
import { useNavigate } from "react-router-dom";
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
    codEnabled: boolean;
    onlinePaymentEnabled: boolean;
    primaryColor?: string;
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
    codEnabled,
    onlinePaymentEnabled,
    primaryColor,
}) => {

    const navigate = useNavigate();
    const isCartEmpty = itemTotal <= 0;
    const getDefaultPaymentMethod = (): "COD" | "ONLINE" => {

        if (onlinePaymentEnabled) {
            return "ONLINE";
        }

        if (codEnabled) {
            return "COD";
        }

        return "ONLINE";
    };
    console.log(isCartEmpty)

    const [paymentMethod, setPaymentMethod] =
        useState<"COD" | "ONLINE">(
            getDefaultPaymentMethod()
        );
    const finalPayableAmount = paymentMethod === "ONLINE"
        ? grandTotal - codFee
        : grandTotal;

    const {
        createOrder: createRazorpayOrderApi
    } = useCreateRazorpayOrder();

    const {
        createOrder: createUserOrderApi
    } = useCreateUserOrder();

    useEffect(() => {

        if (
            !onlinePaymentEnabled &&
            paymentMethod === "ONLINE"
        ) {

            if (codEnabled) {
                setPaymentMethod("COD");
            }

            return;
        }

        if (
            !codEnabled &&
            paymentMethod === "COD"
        ) {

            if (onlinePaymentEnabled) {
                setPaymentMethod("ONLINE");
            }
        }

    }, [
        codEnabled,
        onlinePaymentEnabled,
        paymentMethod
    ]);

    const handlePayment = async () => {

        // ADDRESS VALIDATION
        if (
            !addressData ||
            !addressData.name ||
            !addressData.phone ||
            !addressData.houseNo ||
            !addressData.area ||
            !addressData.city ||
            !addressData.state ||
            !addressData.pincode
        ) {

            alert(
                "Please add delivery address"
            );

            return;
        }

        if (
            !codEnabled &&
            !onlinePaymentEnabled
        ) {

            alert(
                "No payment method available"
            );

            return;
        }

        // COD FLOW
        if (paymentMethod === "COD") {

            try {

                const orderResponse =
                    await createUserOrderApi({

                        paymentMethod: "COD"
                    });

                if (orderResponse.success) {

                    alert(orderResponse.message);

                    navigate("/account/my-orders");
                }

                console.log(orderResponse);

            } catch (error) {

                console.log(error);

                alert("Failed to place order");
            }

            return;
        }

        // ONLINE FLOW
        try {

            // LOAD SDK
            const loaded =
                await loadRazorpayScript();

            if (!loaded) {

                alert("Razorpay SDK failed");

                return;
            }

            // CREATE RAZORPAY ORDER
            const razorpayResponse =
                await createRazorpayOrderApi({
                    paymentMethod: "ONLINE"
                });

            const razorpayOrder =
                razorpayResponse.data;

            // OPTIONS
            const options = {

                key: razorpayOrder.key,

                amount: razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                name: "My Store",

                description:
                    "Order Payment",

                order_id:
                    razorpayOrder
                        .razorpayOrderId,

                prefill: {

                    name:
                        addressData?.name || "",

                    contact:
                        addressData?.phone || ""
                },

                theme: {
                    color: "#3399cc"
                },

                modal: {

                    ondismiss: function () {

                        console.log(
                            "Payment popup closed"
                        );
                    }
                },

                handler: async function (
                    paymentResponse: any
                ) {

                    try {

                        const orderResponse =
                            await createUserOrderApi({

                                paymentMethod:
                                    "ONLINE",

                                razorpayOrderId:
                                    paymentResponse
                                        .razorpay_order_id,

                                razorpayPaymentId:
                                    paymentResponse
                                        .razorpay_payment_id,

                                razorpaySignature:
                                    paymentResponse
                                        .razorpay_signature
                            });

                        if (orderResponse.success) {

                            alert(orderResponse.message);

                            navigate("/account/my-orders");
                        }

                        console.log(
                            orderResponse
                        );

                    } catch (error) {

                        console.log(error);

                        alert(
                            "Failed to create order"
                        );
                    }
                }
            };

            const paymentObject =
                new (window as any)
                    .Razorpay(options);

            paymentObject.open();

        } catch (error) {

            console.log(error);

            alert("Payment failed");
        }
    };

    return (

        <div
            className="cart-right"
            style={{
                "--store-primary-color": primaryColor || "var(--primary-color)"
            } as React.CSSProperties}>

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
                {paymentMethod === "COD" && codFee > 0 && (

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
                        ₹{finalPayableAmount.toFixed(2)}
                    </span>

                </div>

            </div>

            {/* PAYMENT METHOD */}
            <div className="summary-card">

                <div className="sc-bill-title">
                    Payment Method
                </div>

                <div className="sc-payment-methods">

                    {
                        onlinePaymentEnabled === true && (
                            <label className="sc-payment-option">

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={
                                        paymentMethod === "ONLINE"
                                    }
                                    onChange={() =>
                                        setPaymentMethod("ONLINE")
                                    }
                                />

                                <span>
                                    Online Payment
                                </span>

                            </label>
                        )
                    }

                    {
                        codEnabled === true && (
                            <label className="sc-payment-option">

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={() =>
                                        setPaymentMethod("COD")
                                    }
                                />

                                <span>
                                    Cash On Delivery
                                </span>

                            </label>
                        )
                    }

                    {
                        !codEnabled &&
                        !onlinePaymentEnabled && (

                            <div className="no-payment-method">
                                No payment methods available
                            </div>
                        )
                    }

                </div>

            </div>

            {/* PAY */}
            <button
                className="pay-btn"
                onClick={handlePayment}
                disabled={
                    isCartEmpty ||
                    (
                        !codEnabled &&
                        !onlinePaymentEnabled
                    )
                }
            >
                {
                    isCartEmpty
                        ? "Cart is Empty"
                        : paymentMethod === "COD"
                            ? `Place Order ₹${finalPayableAmount.toFixed(2)}`
                            : `Pay ₹${finalPayableAmount.toFixed(2)}`
                }
            </button>

        </div >
    );
};

export default CartSummary;