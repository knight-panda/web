import { useEffect, useState } from "react";
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
  maxOrderStock: number;
  cartQuantity?: number;
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
  maxOrderStock,
  cartQuantity = 0,
  image,
  onProductClick,
}) => {

  // ✅ sync cart quantity
  const [qty, setQty] =
    useState(cartQuantity);

  useEffect(() => {
    setQty(cartQuantity);
  }, [cartQuantity]);

  const {
    addProductToCart,
    loading,
  } = useAddToCart();

  const [cartLoading, setCartLoading] =
    useState(false);

  // ✅ logged in user
  const storeTokens = JSON.parse(
    localStorage.getItem("storeTokens") || "{}"
  );

  const activeStoreId =
    localStorage.getItem("activeStoreId");

  const userToken =
    storeTokens[activeStoreId || ""];

  // ✅ increase qty
  const increase = async (
    e?: React.MouseEvent
  ) => {

    e?.preventDefault();
    e?.stopPropagation();

    // login validation
    if (!userToken) {

      alert("Please login first");

      return;
    }

    // prevent multiple clicks
    if (cartLoading) return;

    try {

      setCartLoading(true);

      const newQty = qty + 1;

      // max order validation
      if (newQty > maxOrderStock) {

        alert(
          `Maximum ${maxOrderStock} items allowed`
        );

        return;
      }

      // stock validation
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

    e?.preventDefault();
    e?.stopPropagation();

    if (!userToken) return;

    if (cartLoading) return;

    if (qty <= 0) return;

    try {

      setCartLoading(true);

      const newQty = qty - 1;

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

  // product details
  const handleClick = () => {
    onProductClick?.(id);
  };

  // discount %
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
              disabled={loading || cartLoading}
            >
              {loading || cartLoading
                ? "..."
                : "ADD"}
            </button>

          ) : (

            <div className="qty-controller">

              {/* MINUS */}
              <button
                type="button"
                onClick={(e) => decrease(e)}
                disabled={loading || cartLoading}
              >
                <BsDash />
              </button>

              {/* QTY */}
              <span>{qty}</span>

              {/* PLUS */}
              <button
                type="button"
                onClick={(e) => increase(e)}
                disabled={loading || cartLoading}
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