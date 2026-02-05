import { useState } from "react"
import { BsPlus, BsDash } from "react-icons/bs"
import "./ProductCard.css"

import logo from "../../assets/product_2.png"
import { IoMdArrowDropdown } from "react-icons/io";

const ProductCardAdmin = () => {
  const [qty, setQty] = useState(0)

  const increase = () => setQty(qty + 1)
  const decrease = () => {
    if (qty > 0) setQty(qty - 1)
  }

  return (
    <div className="product-card-modern">
      {/* IMAGE */}
      <div className="product-img">
        <div className="product-discount">20% Off</div>
        <img
          src={logo}
        />

        <div className="product-add-to-cart">
          {qty === 0 ? (
            <div className="add-btn" onClick={increase}>
              ADD
            </div>
          ) : (
            <div className="qty-controller">
              <button onClick={decrease}>
                <BsDash />
              </button>

              <span>{qty}</span>

              <button onClick={increase}>
                <BsPlus />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* INFO */}
      <div className="product-details">
        <div className="product-name">
          Campus Running Shoes for Men
        </div>

        <div className="product-desc">
          Your navbar was sticking, but it was getting covered by other elements like banners, sliders, or sections below it
        </div>

        <div className="product-price-row">
          <span className="price">₹1,299</span>
          <span className="mrp">₹2,499</span>
        </div>

        {/* ACTION */}
        <div className="product-quantity-box">
          <div className="product-quantity">1 Package(200gm)</div>
          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  )
}

export default ProductCardAdmin