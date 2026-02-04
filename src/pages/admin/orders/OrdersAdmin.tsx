import "./OrdersAdmin.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import type { OrderModel } from "../../../models/OrderModel";

import productImage from "../../../assets/product_2.png"
import { IoFilter } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const OrdersAdmin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    fetch("/mock/orders.json") // from public folder
      .then((res) => res.json())
      .then((data: OrderModel[]) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const close = () => setFilterOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="admin-orders-panel">
      <div className="orders-title-box">
        <div className="orders-title">Orders</div>
        {/* <IoFilter className="orders-filter"/> */}

        <div className="filter-container" onClick={(e) => e.stopPropagation()}>
          <span>Filter</span>
          <IoFilter
            className="orders-filter"
            onClick={() => setFilterOpen(!filterOpen)}
          />

          {filterOpen && (
            <div className="filter-dropdown">
              <select
                className="filter-select"
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  setFilterOpen(false);
                }}
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>


      </div>
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="order-card"
          onClick={() => navigate(`/admin-dashboard/orders/${order.orderId}`)}>
          <div className="order-header">
            <div className="status">
              <span className="check">
                <FaAngleDown />
              </span>

              <div className="order-arrived-box">
                <div className="order-arrived-in">Arrived in {order.deliveryTime}</div>
                <div className="order-total-amount">
                  ₹{order.totalAmount} · {order.date}
                </div>
              </div>
            </div>

            <div className="order-status">
              PENDING <MdKeyboardDoubleArrowRight />
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item) => (
              <img key={item.id} src={productImage} alt={item.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersAdmin;