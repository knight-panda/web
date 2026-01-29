import "./Cart.css";

import productImage from "../../assets/product_2.png"

const CartItems = () => {
    return (
        <div className="cart-left">
            <div className="free-banner">
                ₹245 saved! <span>FREE DELIVERY</span> applied on this order
            </div>

            <div className="cart-card">
                <div>🛒 3 Items</div>

                <div className="cart-item">
                    <img src={productImage} />
                    <div className="item-info">
                        <div className="name">Sunpure Refined Sunflower Oil</div>
                        <div className="ci-qantity">1 ltr × 3</div>
                    </div>
                    <div className="qty">− 1 +</div>
                    <div className="price">₹466</div>
                </div>

                <div className="cart-item">
                    <img src={productImage} />
                    <div className="item-info">
                        <div className="name">Sunpure Refined Sunflower Oil</div>
                        <div className="ci-qantity">1 ltr × 3</div>
                    </div>
                    <div className="qty">− 1 +</div>
                    <div className="price">₹162</div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;