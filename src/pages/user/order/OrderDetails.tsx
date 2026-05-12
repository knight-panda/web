import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./OrderDetails.css";

import { MdOutlineArrowBack } from "react-icons/md";

import OrderSummaryDetails from "../../../components/order/OrderSummaryDetails";
import OrderItemsDetails from "../../../components/order/OrderItemsDetails";

import { useGetUserOrderDetails } from "../../../hooks/user/order/useGetUserOrderDetails";
import type { UserOrderDetailsModel } from "../../../models/user/order/response/UserOrderDetailsModel";
import type { OrderStatus } from "../../../components/order/OrderStatusDialog";

const OrderDetails = () => {

  const navigate = useNavigate();

  const { orderId } =
    useParams<{ orderId: string }>();

  const {
    fetchOrderDetails,
    loading,
  } = useGetUserOrderDetails();

  const [order, setOrder] =
    useState<UserOrderDetailsModel | null>(null);

  const [orderStatus, setOrderStatus] =
    useState<OrderStatus>("PENDING");

  // FETCH ORDER DETAILS
  useEffect(() => {

    if (!orderId) return;

    const loadOrderDetails = async () => {

      try {

        const res =
          await fetchOrderDetails(orderId);

        setOrder(res.data);

        setOrderStatus(
          res.data.orderStatus as OrderStatus
        );

      } catch (error) {

        console.error(error);

      }
    };

    loadOrderDetails();

  }, [orderId]);

  // FORMAT DATE
  const formatDate = (
    date?: string | null
  ) => {

    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // LOADING
  if (loading) {

    return (
      <div className="uo-details-container">
        Loading order details...
      </div>
    );
  }

  // EMPTY
  if (!order) {

    return (
      <div className="uo-details-container">
        Order not found
      </div>
    );
  }

  return (
    <div className="uo-details-container">

      {/* HEADER */}
      <div className="od-header">

        <div
          className="od-back-btn"
          onClick={() => navigate(-1)}
        >
          <MdOutlineArrowBack />
          Orders
        </div>

        <div className="od-title-row">

          <div className="order-id">
            Order details #{order.orderNumber}
          </div>

          <div
            className={`od-status-badge ${orderStatus}`}
          >

            {orderStatus}

          </div>

        </div>

        <div className="order-date">
          Date: {formatDate(order.orderedAt)}
        </div>

      </div>

      {/* TIMELINE */}
      <div className="order-stepper">

        <div className="step completed">

          <div className="step-icon">
            ✓
          </div>

          <div className="step-label">
            ORDER CONFIRMED
          </div>

          <div className="step-time">
            {formatDate(order.orderedAt)}
          </div>

        </div>

        {/* PACKED */}
        {
          order.packedAt && (
            <div className="step completed">

              <div className="step-icon">
                ✓
              </div>

              <div className="step-label">
                PACKED
              </div>

              <div className="step-time">
                {formatDate(order.packedAt)}
              </div>

            </div>
          )
        }

        {/* SHIPPED */}
        {
          order.shippedAt && (
            <div className="step active">

              <div className="step-number">
                2
              </div>

              <div className="step-label">
                SHIPPED
              </div>

              <div className="step-time">
                Shipped with {order.courierName}
              </div>

            </div>
          )
        }

        {/* DELIVERED */}
        {
          order.deliveredAt ? (
            <div className="step completed">

              <div className="step-icon">
                ✓
              </div>

              <div className="step-label">
                DELIVERED
              </div>

              <div className="step-time">
                {formatDate(order.deliveredAt)}
              </div>

            </div>
          ) : (
            <div className="step pending">

              <div className="step-number">
                3
              </div>

              <div className="step-label">
                TO DELIVER
              </div>

              <div className="step-time">
                Waiting for delivery
              </div>

            </div>
          )
        }

      </div>

      {/* TRACKING */}
      <div className="od-tracking-info">

        <div className="od-input-group-row">

          <div className="od-input-field">

            <label>
              Courier name
            </label>

            <input
              type="text"
              value={order.courierName || ""}
              readOnly
            />

          </div>

          <div className="od-input-field">

            <label>
              Tracking number
            </label>

            <input
              type="text"
              value={order.trackingNumber || ""}
              readOnly
            />

          </div>

        </div>

        <div className="od-input-field full-width">

          <label>
            Shipment tracking URL
          </label>

          <input
            type="text"
            value={order.trackingUrl || ""}
            readOnly
          />

        </div>

      </div>

      {/* ITEMS */}
      <h3>
        Item ordered
      </h3>

      <div className="items-section">

        {/* ORDER ITEMS */}
        <div className="od-items">

          <OrderItemsDetails
            items={order.items}
          />

        </div>

        {/* SUMMARY */}
        <div className="od-summary">

          <OrderSummaryDetails
            order={order}
          />

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;