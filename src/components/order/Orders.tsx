import "./Orders.css";

import product from "../../assets/product_2.png"
import { FaAngleDown } from "react-icons/fa6";

const Orders = () => {
    return (
        <div className="orders-panel">
            <div className="order-card">
                <div className="order-header">
                    <div className="status">
                        <span className="check"><FaAngleDown /></span>
                        <div>
                            <div>Arrived in 12 minutes</div>
                            <div>₹300 · 20 Jan, 7:41 pm</div>
                        </div>
                    </div>
                    <span className="arrow">→</span>
                </div>

                <div className="order-items">
                    <img src={product} />
                    <img src={product} />
                    <img src={product} />
                </div>
            </div>
        </div>
    );
};

export default Orders;
