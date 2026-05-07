import { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

import "./ProductCard.css";
import { useAddToCart } from "../../hooks/user/cart/useAddToCart";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string;
  price: number;
  mrp: number;
  stock: number;
  maxOrderQuantity: number;
  image: string;
  onProductClick?: (productId: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  mrp,
  stock,
  maxOrderQuantity,
  image,
  onProductClick,
}) => {

  const [qty, setQty] = useState(0);

  const {
    addProductToCart,
    loading,
  } = useAddToCart();
  const [cartLoading, setCartLoading] = useState(false);

  // ✅ increase qty
  const increase = async (
    e?: React.MouseEvent
  ) => {

    e?.preventDefault();
    e?.stopPropagation();

    // prevent multiple clicks
    if (cartLoading) return;

    try {

      setCartLoading(true);

      const newQty = qty + 1;

      // ✅ user limit
      if (newQty > maxOrderQuantity) {

        alert(
          `Maximum ${maxOrderQuantity} items allowed`
        );

        return;
      }

      // ✅ actual stock validation
      if (newQty > stock) {

        alert(
          `Only ${stock} items available`
        );

        return;
      }

      // optimistic update
      setQty(newQty);

      await addProductToCart({
        productId: id,
        quantity: newQty,
      });

    } catch (err) {

      console.error(err);

      // rollback
      setQty(qty);

    } finally {

      setCartLoading(false);
    }
  };

  // ✅ decrease qty
  const decrease = async (
    e?: React.MouseEvent
  ) => {

    e?.stopPropagation();

    if (qty <= 0) return;

    try {

      const newQty = qty - 1;

      // optimistic update
      setQty(newQty);

      // ✅ API call
      await addProductToCart({
        productId: id,
        quantity: newQty,
      });

    } catch (err) {

      console.error("REMOVE CART ERROR:", err);

      // rollback
      setQty(qty);
    }
  };

  // ✅ product click
  const handleClick = () => {
    onProductClick?.(id);
  };

  // ✅ discount %
  const discount = Math.round(
    ((mrp - price) / mrp) * 100
  );

  return (
    <div className="product-card-modern">

      {/* IMAGE */}
      <div className="product-img">

        {mrp > price && (
          <div className="product-discount">
            {discount}% Off
          </div>
        )}

        <img
          src={image}
          alt={title}
          onClick={handleClick}
        />

        {/* ADD TO CART */}
        <div className="product-add-to-cart">

          {qty === 0 ? (

            <button
              type="button"
              className="add-btn"
              onClick={(e) => increase(e)}
              disabled={loading}
            >
              {loading ? "..." : "ADD"}
            </button>

          ) : (

            <div className="qty-controller">

              {/* MINUS */}
              <button
                onClick={() => decrease()}
                disabled={loading}
              >
                <BsDash />
              </button>

              {/* QTY */}
              <span>{qty}</span>

              {/* PLUS */}
              <button
                onClick={() => increase()}
                disabled={loading}
              >
                <BsPlus />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* INFO */}
      <div
        className="product-details"
        onClick={handleClick}
      >

        {/* TITLE */}
        <div className="product-name">
          {title}
        </div>

        {/* DESCRIPTION */}
        {description && (
          <div className="product-desc">
            {description}
          </div>
        )}

        {/* PRICE */}
        <div className="product-price-row">

          <span className="price">
            ₹{price}
          </span>

          {mrp > price && (
            <span className="mrp">
              ₹{mrp}
            </span>
          )}

        </div>

        {/* PACKAGE */}
        <div className="product-quantity-box">

          <div className="product-quantity">
            1 Package
          </div>

          <IoMdArrowDropdown />

        </div>

      </div>
    </div>
  );
};

export default ProductCard;