import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetailsAdmin.css";

import { MdOutlineArrowBack } from "react-icons/md";
import productImage from "../../../assets/product_2.png"

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

  return (
    <div className="order-details-container">
      {/* Header Section */}
      <div className="od-header">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <MdOutlineArrowBack />
          Orders
        </div>
        <div className="od-title-row">
          <div className="order-id">Order details #{orderId || "N/A"}</div>
          <div className="status-badge shipping">SHIPPING</div>
        </div>
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
      <div className="tracking-info">
        <div className="input-group-row">
          <div className="input-field">
            <label>Courier name</label>
            <input type="text" value="Adora Express" readOnly />
          </div>
          <div className="input-field">
            <label>Tracking number</label>
            <input type="text" value="SSA4569AEF4592" readOnly />
          </div>
        </div>
        <div className="input-field full-width">
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
        <div className="items-card">
          {items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={productImage} alt={item.name} />
              <div className="order-item-info">
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-quantity">{item.qty} x {item.qtyCount}</div>

              </div>
              <div className="order-item-price">₹ {item.price.toFixed(2)}</div>
            </div>
          ))}

        </div>

        {/* Pricing Summary */}
        <div className="order-summary">
          <div className="summary-line">
            <span>Product Total</span>
            <span>$900.00</span>
          </div>
          <div className="summary-line">
            <span>Shipping cost</span>
            <span className="free-text">FREE</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>$900.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsAdmin;