import "./Orders.css";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import type { OrderModel } from "../../models/OrderModel";

import productImage from "../../assets/product_2.png"

const Orders = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="orders-panel">
      {orders.map((order) => (
        <div key={order.orderId} className="order-card">
          <div className="order-header">
            <div className="status">
              <span className="check">
                <FaAngleDown />
              </span>

              <div>
                <div>Arrived in {order.deliveryTime}</div>
                <div>
                  ₹{order.totalAmount} · {order.date}
                </div>
              </div>
            </div>

            <span className="arrow">→</span>
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

export default Orders;