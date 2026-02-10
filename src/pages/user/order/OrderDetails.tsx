import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetails.css"

import { MdOutlineArrowBack } from "react-icons/md";
import OrderSummaryDetails from "../../../components/order/OrderSummaryDetails";
import OrderItemsDetails from "../../../components/order/OrderItemsDetails";
import { MdOutlineArrowDropDown } from "react-icons/md";
import OrderStatusDialog from "../../../components/order/OrderStatusDialog";
import type { OrderTrackingData } from "../../../models/OrderModel";

const OrderDetails = () => {
  const [open, setOpen] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();
  const [orderStatus, setOrderStatus] = useState("CONFIRMED");
  const navigate = useNavigate();

  const handleSave = async (trackingData: OrderTrackingData) => {
    try {
      // Update order status via API
      // await updateOrderStatus(orderId, trackingData);
      setOrderStatus(trackingData.status)

      setOpen(false);
      // Optionally refresh order data or refetch
      // refetchOrderDetails();
    } catch (error) {
      console.error("Failed to update status:", error);
      // toast.error("Failed to update status");
    }
  };


  return (
    <div className="uo-details-container">
      {/* Header Section */}
      <div className="od-header">
        <div className="od-back-btn" onClick={() => navigate(-1)}>
          <MdOutlineArrowBack />
          Orders
        </div>
        <div className="od-title-row" >
          <div className="order-id">Order details #{orderId || "N/A"}</div>
          <div className={`od-status-badge ${orderStatus || 'PENDING'}`}
            onClick={() => setOpen(true)}>{orderStatus} <MdOutlineArrowDropDown className="od-status-dropdown" /></div>
        </div>

        <OrderStatusDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onSave={handleSave}
          orderStatus="SHIPPING"
        />
        <div className="order-date">Date: 08/02/2023</div>
      </div>

      {/* Stepper / Progress Timeline */}
      <div className="order-stepper">
        <div className="step completed">
          <div className="step-icon">✓</div>
          <div className="step-label">ORDER CONFIRMED</div>
          <div className="step-time">8:00 AM, Feb 8, 2023</div>
        </div>
        <div className="step active">
          <div className="step-number">2</div>
          <div className="step-label">SHIPPING</div>
          <div className="step-time">Shipped with FedEx</div>
        </div>
        <div className="step pending">
          <div className="step-number">3</div>
          <div className="step-label">TO DELIVER</div>
          <div className="step-time">Estimated date: Feb 15, 2023</div>
        </div>
      </div>

      {/* Tracking Form Section */}
      <div className="od-tracking-info">
        <div className="od-input-group-row">
          <div className="od-input-field">
            <label>Courier name</label>
            <input type="text" value="Adora Express" readOnly />
          </div>
          <div className="od-input-field">
            <label>Tracking number</label>
            <input type="text" value="SSA4569AEF4592" readOnly />
          </div>
        </div>
        <div className="od-input-field full-width">
          <label>Shipment tracking URL</label>
          <input
            type="text"
            value="https://www.shipmentlink.com/servlet/TDB1_CargoTracking.do"
            readOnly
          />
        </div>
      </div>

      {/* Items List Section */}
      <h3>Item ordered</h3>
      <div className="items-section">
        <div className="od-items">
          <OrderItemsDetails />
        </div>

        {/* Pricing Summary */}
        <div className="od-summary">
          <OrderSummaryDetails />
        </div>
      </div>
    </div>
  )
}

export default OrderDetails