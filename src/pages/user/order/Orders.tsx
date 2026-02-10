import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import type { OrderModel } from "../../../models/OrderModel";

import productImage from "../../../assets/product_2.png"
import { IoFilter } from "react-icons/io5";

const Orders = () => {
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

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="uo-panel">
      <div className="uo-title-box">
        <div className="uo-title">Orders</div>
        {/* <IoFilter className="orders-filter"/> */}

        <div className="uo-filter-container" onClick={(e) => e.stopPropagation()}>
          <span>Filter</span>
          <IoFilter
            className="uo-filter"
            onClick={() => setFilterOpen(!filterOpen)}
          />

          {filterOpen && (
            <div className="uo-filter-dropdown">
              <select
                className="uo-filter-select"
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

      {
        orders.map((order) => (
          <div key={order.orderId}
            className="uo-card"
            onClick={() => navigate(`/account/my-orders/${order.orderId}`)}>
            <div className="uo-header">
              <div className="uo-status">
                <span className="uo-check">
                  <FaAngleDown />
                </span>

                <div>
                  <div>Arrived in {order.deliveryTime}</div>
                  <div>
                    ₹{order.totalAmount} · {order.date}
                  </div>
                </div>
              </div>

              <span className="uo-arrow">→</span>
            </div>

            <div className="uo-items">
              {order.items.map((item) => (
                <img key={item.id} src={productImage} alt={item.name} />
              ))}
            </div>
          </div>
        ))
      }
    </div >
  );
};

export default Orders;