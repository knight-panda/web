import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./OrderDetailsAdmin.css";

import { MdOutlineArrowBack } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";

import OrderSummaryDetails from "../../../components/order/OrderSummaryDetails";
import OrderItemsDetails from "../../../components/order/OrderItemsDetails";
import OrderStatusDialog, {
  type OrderStatus,
} from "../../../components/order/OrderStatusDialog";

import { useGetAdminOrderDetails } from "../../../hooks/admin/order/useGetAdminOrderDetails";
import type { UserOrderDetailsModel } from "../../../models/user/order/response/UserOrderDetailsModel";
import { useUpdateAdminOrderStatus } from "../../../hooks/admin/order/useUpdateAdminOrderStatus";

const OrderDetailsAdmin: React.FC = () => {

  const navigate = useNavigate();

  const { orderId } =
    useParams<{ orderId: string }>();

  const {
    fetchOrderDetails,
    loading,
  } = useGetAdminOrderDetails();

  const { updateOrderStatus, loading: updateLoading } = useUpdateAdminOrderStatus();

  const [open, setOpen] =
    useState(false);

  const [order, setOrder] =
    useState<UserOrderDetailsModel | null>(null);

  const [orderStatus, setOrderStatus] =
    useState<OrderStatus>("CONFIRMED");

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

  // UPDATE STATUS
  const handleSave = async (
    updatedOrder: UserOrderDetailsModel
  ) => {

    try {

      if (!orderId) return;

      // API CALL
      const res =
        await updateOrderStatus(
          orderId,
          {
            orderStatus:
              updatedOrder.orderStatus as OrderStatus,

            paymentStatus:
              updatedOrder.paymentStatus,

            courierName:
              updatedOrder.courierName,

            trackingNumber:
              updatedOrder.trackingNumber,

            trackingUrl:
              updatedOrder.trackingUrl,

            note:
              updatedOrder.note,
          }
        );

      // UPDATE LOCAL STATE
      setOrder(res.data);

      setOrderStatus(
        res.data.orderStatus as OrderStatus
      );

      setOpen(false);

    } catch (error) {

      console.error(
        "Failed to update status:",
        error
      );
    }
  };

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
      <div className="order-details-container">
        Loading order details...
      </div>
    );
  }

  // EMPTY
  if (!order) {

    return (
      <div className="order-details-container">
        Order not found
      </div>
    );
  }

  return (
    <div className="order-details-container">

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

            Order details #
            {order.orderNumber}

          </div>

          <div
            className={`od-status-badge ${orderStatus}`}
            onClick={() => setOpen(true)}
          >

            {orderStatus}

            <MdOutlineArrowDropDown
              className="od-status-dropdown"
            />

          </div>

        </div>

        {/* DIALOG */}
        <OrderStatusDialog
          isOpen={open}
          onClose={() => setOpen(false)}

          onSave={(trackingData) => {

            if (!order) return;

            const updatedOrder: UserOrderDetailsModel = {

              ...order,

              orderStatus:
                trackingData.orderStatus,

              paymentStatus:
                trackingData.paymentStatus ||
                order.paymentStatus,

              courierName:
                trackingData.courierName ||
                order.courierName,

              trackingNumber:
                trackingData.trackingNumber ||
                order.trackingNumber,

              trackingUrl:
                trackingData.trackingUrl ||
                order.trackingUrl,

              note:
                trackingData.note ||
                order.note,
            };

            handleSave(updatedOrder);
          }}
          saveLoading={updateLoading}
          orderStatus={orderStatus}
          paymentStatus={
            order.paymentStatus
          }
          courierName={
            order.courierName
          }
          trackingNumber={
            order.trackingNumber
          }
          trackingUrl={
            order.trackingUrl
          }
          note={
            order.note
          }
        />

        <div className="order-date">

          Date:
          {" "}
          {formatDate(order.orderedAt)}

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

        <div className="od-items">

          <OrderItemsDetails
            items={order.items}
          />

        </div>

        <div className="od-summary">

          <OrderSummaryDetails
            order={order}
          />

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsAdmin;