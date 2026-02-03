import React, { useState, useEffect } from "react";
import "./OrderStatusDialog.css";

/* ================= TYPES ================= */

export type OrderStatus =
    | "CONFIRMED"
    | "SHIPPING"
    | "DELIVERED"
    | "CANCELLED";

export interface OrderTrackingData {
    status: OrderStatus;
    courier: string;
    trackingId: string;
    trackingUrl: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: OrderTrackingData) => void;
    order?: Partial<OrderTrackingData>;
}

/* ================= COMPONENT ================= */

const OrderStatusDialog: React.FC<Props> = ({
    isOpen,
    onClose,
    onSave
}) => {
    const [status, setStatus] = useState<OrderStatus>("CONFIRMED");
    const [courier, setCourier] = useState("");
    const [trackingId, setTrackingId] = useState("");
    const [trackingUrl, setTrackingUrl] = useState("");

    if (!isOpen) return null;

    const showTrackingFields =
        status === "SHIPPING" || status === "DELIVERED";

    const handleSave = () => {
        onSave({
            status,
            courier,
            trackingId,
            trackingUrl,
        });
        onClose();
    };

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div
                className="dialog-box"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Update Order Status</h2>

                <div className="dialog-form">

                    {/* STATUS */}
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as OrderStatus)
                        }
                    >
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPING">Shipping</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    {/* TRACKING FIELDS */}
                    {showTrackingFields && (
                        <>
                            <label>Courier Name</label>
                            <input
                                value={courier}
                                onChange={(e) => setCourier(e.target.value)}
                                placeholder="FedEx / Delhivery / BlueDart"
                            />

                            <label>Tracking Number</label>
                            <input
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                placeholder="Enter tracking number"
                            />

                            <label>Tracking URL</label>
                            <input
                                value={trackingUrl}
                                onChange={(e) => setTrackingUrl(e.target.value)}
                                placeholder="https://tracking-link.com"
                            />
                        </>
                    )}
                </div>

                <div className="dialog-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="save-btn" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusDialog;
