import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetailsAdmin.css";

import { MdOutlineArrowBack } from "react-icons/md";
import productImage from "../../../assets/product_2.png"
import CartSummary from "../../../components/cart/CartSummary";
import CartSummaryAdmin from "../../../components/order/OrderSummaryDetails";
import CartItems from "../../../components/cart/CartItems";
import CartItemsAdmin from "../../../components/order/OrderItemsDetails";
import OrderSummaryDetails from "../../../components/order/OrderSummaryDetails";
import OrderItemsDetails from "../../../components/order/OrderItemsDetails";
import { MdOutlineArrowDropDown } from "react-icons/md";
import OrderStatusDialog from "../../../components/order/OrderStatusDialog";

// Define the shape of our order items for type safety
interface OrderItem {
  id: string;
  name: string;
  qty: string;
  qtyCount: number;
  price: number;
  image: string;
}

const OrderDetailsAdmin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch this data using the orderId
  const items: OrderItem[] = [
    {
      id: "1",
      name: "Dior Tribales Earrings Front view Beige Multicolor Mizza",
      qty: "1 ltr",
      qtyCount: 1,
      price: 450.0,
      image: "https://via.placeholder.com/60",
    },
    {
      id: "2",
      name: "Mizza Slingback Ballerina Flat Multicolor Shiny",
      qty: "1 kg",
      qtyCount: 1,
      price: 450.0,
      image: "https://via.placeholder.com/60",
    },
  ];

  const handleSave = () => {
    console.log("Updated:", "data");

    // 🔥 call your API here
    // await updateOrder(orderId, data)
  };

  return (
    <div className="order-details-container">
      {/* Header Section */}
      <div className="od-header">
        <div className="od-back-btn" onClick={() => navigate(-1)}>
          <MdOutlineArrowBack />
          Orders
        </div>
        <div className="od-title-row" >
          <div className="order-id">Order details #{orderId || "N/A"}</div>
          <div className="od-status-badge shipping" onClick={() => setOpen(true)}>SHIPPING <MdOutlineArrowDropDown className="od-status-dropdown" /></div>
        </div>

        <OrderStatusDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onSave={handleSave}
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
  );
};

export default OrderDetailsAdmin;