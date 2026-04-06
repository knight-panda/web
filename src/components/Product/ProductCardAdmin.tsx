import { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";
import "./ProductCardAdmin.css";
import { IoMdArrowDropdown } from "react-icons/io";

type Props = {
  title: string;
  description?: string;
  price: number;
  mrp: number;
  stock: number;
  image: string;
};

const ProductCardAdmin: React.FC<Props> = ({
  title,
  description,
  price,
  mrp,
  stock,
  image,
}) => {
  const [qty, setQty] = useState(0);

  const increase = () => {
    if (qty < stock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 0) setQty(qty - 1);
  };

  // calculate discount %
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="admin-product-card-modern">
      {/* IMAGE */}
      <div className="product-img">
        {mrp > price && (
          <div className="product-discount">{discount}% Off</div>
        )}

        <img src={image} alt={title} />

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
        <div className="product-name">{title}</div>

        {description && (
          <div className="product-desc">{description}</div>
        )}

        <div className="product-price-row">
          <span className="price">₹{price}</span>
          {mrp > price && <span className="mrp">₹{mrp}</span>}
        </div>

        {/* STOCK */}
        <div className="product-stock">
          Stock: {stock > 0 ? stock : "Out of stock"}
        </div>

        {/* ACTION */}
        <div className="product-quantity-box">
          <div className="product-quantity">1 Package</div>
          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;