import React, { useEffect, useState } from "react";

import "./OrderStatusDialog.css";

export type OrderStatus =
    | "PENDING"
    | "PACKED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";

export interface OrderTrackingData {
    orderStatus: OrderStatus;
    paymentStatus?: string;
    courierName?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    note?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: OrderTrackingData) => void;
    saveLoading?: boolean;
    orderStatus: OrderStatus;
    paymentStatus?: string;
    courierName?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    note?: string;
}

const OrderStatusDialog: React.FC<Props> = ({
    isOpen,
    onClose,
    onSave,
    saveLoading = false,
    orderStatus,
    paymentStatus,
    courierName,
    trackingNumber,
    trackingUrl,
    note,
}) => {

    const [status, setStatus] =
        useState<OrderStatus>("PENDING");

    const [courier, setCourier] =
        useState("");

    const [trackingId, setTrackingId] =
        useState("");

    const [trackingLink, setTrackingLink] =
        useState("");

    const [selectedPaymentStatus, setSelectedPaymentStatus] =
        useState("PENDING");

    const [orderNote, setOrderNote] =
        useState("");

    // RESET
    useEffect(() => {

        if (isOpen) {

            setStatus(orderStatus);

            setSelectedPaymentStatus(
                paymentStatus || "PENDING"
            );

            setCourier(courierName || "");

            setTrackingId(trackingNumber || "");

            setTrackingLink(trackingUrl || "");

            setOrderNote(note || "");
        }

    }, [
        isOpen,
        orderStatus,
        paymentStatus,
        courierName,
        trackingNumber,
        trackingUrl,
        note,
    ]);

    if (!isOpen) return null;

    // SHOW TRACKING FIELDS
    const showTrackingFields =
        status === "SHIPPED" ||
        status === "DELIVERED";

    // SAVE
    const handleSave = () => {

        onSave({
            orderStatus: status,
            paymentStatus: selectedPaymentStatus,
            courierName: courier,
            trackingNumber: trackingId,
            trackingUrl: trackingLink,
            note: orderNote,
        });

        onClose();
    };

    return (
        <div
            className="dialog-overlay"
            onClick={onClose}
        >

            <div
                className="dialog-box"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>
                    Update Order Status
                </h2>

                <div className="dialog-form">

                    {/* ORDER STATUS */}
                    <label>
                        Order Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value as OrderStatus
                            )
                        }
                    >

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="PACKED">
                            Packed
                        </option>

                        <option value="SHIPPED">
                            Shipped
                        </option>

                        <option value="DELIVERED">
                            Delivered
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>

                        <option value="RETURNED">
                            Returned
                        </option>

                        <option value="REFUNDED">
                            Refunded
                        </option>

                    </select>

                    {/* PAYMENT STATUS */}
                    <label>
                        Payment Status
                    </label>

                    <select
                        value={paymentStatus}
                        onChange={(e) =>
                            setSelectedPaymentStatus(e.target.value)
                        }
                    >

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="PAID">
                            Paid
                        </option>

                        <option value="FAILED">
                            Failed
                        </option>

                        <option value="REFUNDED">
                            Refunded
                        </option>

                    </select>

                    {/* TRACKING */}
                    {
                        showTrackingFields && (
                            <>

                                <label>
                                    Courier Name
                                </label>

                                <input
                                    value={courier}
                                    onChange={(e) =>
                                        setCourier(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Delhivery / BlueDart"
                                />

                                <label>
                                    Tracking Number
                                </label>

                                <input
                                    value={trackingId}
                                    onChange={(e) =>
                                        setTrackingId(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter tracking number"
                                />

                                <label>
                                    Tracking URL
                                </label>

                                <input
                                    value={trackingLink}
                                    onChange={(e) =>
                                        setTrackingLink(
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://tracking-link.com"
                                />

                            </>
                        )
                    }

                    {/* NOTE */}
                    <label>
                        Order Note
                    </label>

                    <textarea
                        value={orderNote}
                        onChange={(e) =>
                            setOrderNote(e.target.value)
                        }
                        placeholder="Add note"
                        rows={4}
                    />

                </div>

                {/* ACTIONS */}
                <div className="dialog-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={saveLoading}
                    >

                        {
                            saveLoading
                                ? "Updating..."
                                : "Save Changes"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
};

export default OrderStatusDialog;