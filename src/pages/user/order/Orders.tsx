import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

import { useGetUserOrders } from "../../../hooks/user/order/useGetUserOrders";
import type { UserOrderModel } from "../../../models/user/order/response/UserOrderModel";

const Orders = () => {

  const navigate = useNavigate();

  const {
    fetchOrders,
    loading,
  } = useGetUserOrders();

  const [orders, setOrders] =
    useState<UserOrderModel[]>([]);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  const filterOptions = [
    { value: "all", label: "All Orders" },
    { value: "PENDING", label: "Pending" },
    { value: "PACKED", label: "Packed" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  // FETCH ORDERS
  useEffect(() => {

    const loadOrders = async () => {

      try {

        const res = await fetchOrders();

        setOrders(res.data);

      } catch (error) {

        console.error(error);

      }
    };

    loadOrders();

  }, []);

  // FILTERED ORDERS
  const filteredOrders = useMemo(() => {

    if (selectedFilter === "all") {
      return orders;
    }

    return orders.filter(
      (order) => order.orderStatus === selectedFilter
    );

  }, [orders, selectedFilter]);

  // FORMAT DATE
  const formatDate = (date: string) => {

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // SHIMMER LOADING
  if (loading) {
    return (
      <div className="uo-panel">

        <div className="uo-title-box">
          <div className="uo-title">Orders</div>
        </div>

        {
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="uo-card uo-shimmer-card"
            >

              {/* HEADER */}
              <div className="uo-header">

                <div className="uo-status">

                  <div className="uo-shimmer-circle"></div>

                  <div className="uo-shimmer-content">

                    <div className="uo-shimmer-line short"></div>

                    <div className="uo-shimmer-line long"></div>

                  </div>

                </div>

              </div>

              {/* IMAGES */}
              <div className="uo-items">

                {
                  Array.from({ length: 3 }).map((_, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="uo-shimmer-image"
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
    <div className="uo-panel">

      {/* HEADER */}
      <div className="uo-title-box">

        <div className="uo-title">
          Orders
        </div>

        {/* FILTER */}
        <div
          className="uo-filter-container"
          onClick={(e) => e.stopPropagation()}
        >

          <span>Filter</span>

          <IoFilter
            className="uo-filter"
            onClick={() => setFilterOpen(!filterOpen)}
          />

          {
            filterOpen && (
              <div className="uo-filter-dropdown">

                <select
                  className="uo-filter-select"
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    setFilterOpen(false);
                  }}
                >

                  {
                    filterOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))
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
          <div className="uo-empty">
            No orders found
          </div>
        )
      }

      {/* ORDERS */}
      {
        filteredOrders.map((order) => (

          <div
            key={order.orderId}
            className="uo-card"
            onClick={() =>
              navigate(`/account/my-orders/${order.orderId}`)
            }
          >

            {/* HEADER */}
            <div className="uo-header">

              <div className="uo-status">

                <span className="uo-check">
                  <FaAngleDown />
                </span>

                <div>

                  <div className="uo-order-status">
                    {order.orderStatus}
                  </div>

                  <div className="uo-order-meta">
                    ₹{order.grandTotal} · {formatDate(order.orderedAt)}
                  </div>

                </div>

              </div>

              <span className="uo-arrow">
                →
              </span>

            </div>

            {/* ITEMS */}
            <div className="uo-items">

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

export default Orders;