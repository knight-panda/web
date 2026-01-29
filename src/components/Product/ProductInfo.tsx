import { useState } from "react"
import "./ProductDetails.css";

import { BsPlus, BsDash } from "react-icons/bs"

const ProductInfo = () => {
      const [qty, setQty] = useState(0)
    
      const increase = () => setQty(qty + 1)
      const decrease = () => {
        if (qty > 0) setQty(qty - 1)
      }
    

    return (
        <div className="product-info">
            <h1>Traditional Thekua</h1>

            <div className="price-row">
                <span className="old-price">₹599</span>
                <span className="new-price">₹299</span>
                <span className="badge">Sale</span>
            </div>

            <p className="shipping">Shipping calculated at checkout</p>

            {qty === 0 ? (
                <div className="pd-add-btn" onClick={increase}>
                    out of stock
                </div>
            ) : (
                <div className="pd-qty-controller">
                    <button onClick={decrease}>
                        <BsDash />
                    </button>

                    <span>{qty}</span>

                    <button onClick={increase}>
                        <BsPlus />
                    </button>
                </div>
            )}

            <button className="add-to-cart">Add to cart</button>
            <button className="buy-now">Buy now</button>

            <p className="note">🔥 Fresh batch selling fast, limited stock</p>

            <div className="description">
                <p>
                    Traditional Thekua is a cherished snack from Bihar & Jharkhand.
                    Made with jaggery and wheat flour, fried to perfection.
                </p>

                <ul>
                    <li>✔ Shelf Life: 45 days</li>
                    <li>✔ No preservatives</li>
                    <li>✔ Free delivery across India</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductInfo;
