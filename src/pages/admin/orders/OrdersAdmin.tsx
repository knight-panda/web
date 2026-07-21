import "./OrdersAdmin.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { useGetAdminOrders } from "../../../hooks/admin/order/useGetAdminOrders";
import type { UserOrderModel } from "../../../models/user/order/response/UserOrderModel";

const OrdersAdmin = () => {

  const navigate = useNavigate();

  const {
    fetchOrders,
    loading,
  } = useGetAdminOrders();

  const [orders, setOrders] =
    useState<UserOrderModel[]>([]);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  const filterOptions = [
    { value: "all", label: "All Orders" },
    { value: "CONFIRMED", label: "Confirmed" },
    { value: "PACKED", label: "Packed" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "RETURNED", label: "Returned" },
    { value: "REFUNDED", label: "Refunded" },
  ];

  // FETCH ORDERS
  useEffect(() => {

    const loadOrders = async () => {

      try {

        const res =
          await fetchOrders();

        setOrders(res.data);

      } catch (error) {

        console.error(error);

      }
    };

    loadOrders();

  }, []);

  // CLOSE FILTER
  useEffect(() => {

    const close = () =>
      setFilterOpen(false);

    window.addEventListener(
      "click",
      close
    );

    return () =>
      window.removeEventListener(
        "click",
        close
      );

  }, []);

  // FILTER ORDERS
  const filteredOrders = useMemo(() => {

    if (selectedFilter === "all") {
      return orders;
    }

    return orders.filter(
      (order) =>
        order.orderStatus === selectedFilter
    );

  }, [orders, selectedFilter]);

  // FORMAT DATE
  const formatDate = (
    date: string
  ) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // LOADING
  if (loading) {

    return (
      <div className="admin-orders-panel">

        {
          Array.from({ length: 6 }).map((_, index) => (

            <div
              key={index}
              className="order-card au-shimmer-card"
            >

              {/* HEADER */}
              <div className="order-header">

                <div className="status">

                  <div className="au-shimmer-circle" />

                  <div className="au-shimmer-content">

                    <div className="au-shimmer-line short" />

                    <div className="au-shimmer-line long" />

                  </div>

                </div>

                <div className="au-shimmer-status" />

              </div>

              {/* ITEMS */}
              <div className="order-items">

                {
                  Array.from({ length: 3 }).map((_, imgIndex) => (

                    <div
                      key={imgIndex}
                      className="au-shimmer-image"
                    />

                  ))
                }

              </div>

            </div>

          ))
        }

      </div>
    );
  }

  return (
    <div className="admin-orders-panel">

      {/* HEADER */}
      <div className="orders-title-box">

        <div className="orders-title">
          Orders
        </div>

        {/* FILTER */}
        <div
          className="filter-container"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <span>
            Filter
          </span>

          <IoFilter
            className="orders-filter"
            onClick={() =>
              setFilterOpen(!filterOpen)
            }
          />

          {
            filterOpen && (
              <div className="filter-dropdown">

                <select
                  className="filter-select"
                  value={selectedFilter}
                  onChange={(e) => {

                    setSelectedFilter(
                      e.target.value
                    );

                    setFilterOpen(false);
                  }}
                >

                  {
                    filterOptions.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      )
                    )
                  }

                </select>

              </div>
            )
          }

        </div>

      </div>

      {/* EMPTY */}
      {
        !loading &&
        filteredOrders.length === 0 && (
          <div className="orders-empty">
            No orders found
          </div>
        )
      }

      {/* ORDERS */}
      {
        filteredOrders.map((order) => (

          <div
            key={order.orderId}
            className="order-card"
            onClick={() =>
              navigate(
                `/admin-dashboard/orders/${order.orderId}`
              )
            }
          >

            {/* HEADER */}
            <div className="order-header">

              <div className="status">

                <span className="check">
                  <FaAngleDown />
                </span>

                <div className="order-arrived-box">

                  <div className="order-arrived-in">
                    {order.orderStatus}
                  </div>

                  <div className="order-total-amount">

                    ₹{order.grandTotal}

                    {" · "}

                    {formatDate(order.orderedAt)}

                  </div>

                </div>

              </div>

              {/* STATUS */}
              <div
                className={`order-status ${order.orderStatus}`}
              >

                {order.orderStatus}

                <MdKeyboardDoubleArrowRight />

              </div>

            </div>

            {/* ITEMS */}
            <div className="order-items">

              {
                order.items.map((item) => (

                  <img
                    key={item.productId}
                    src={item.productImage}
                    alt={item.productName}
                  />

                ))
              }

            </div>

          </div>

        ))
      }

    </div>
  );
};

export default OrdersAdmin;