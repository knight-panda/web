import { useEffect, useState } from "react";

import {
  BsPlus,
  BsDash
} from "react-icons/bs";

import {
  IoMdArrowDropdown
} from "react-icons/io";

import "./ProductCard.css";

import {
  useAddToCart
} from "../../hooks/user/cart/useAddToCart";

type Variant = {

  variantId: string;

  variantName: string;

  size?: string;

  color?: string;

  unitValue?: number;

  unitType?: string;

  sku: string;

  price: number;

  discountPrice?: number;

  quantity: number;

  cartQuantity?: number;

  maxOrderQuantity: number;
};

type ProductCardProps = {

  id: string;

  title: string;

  description?: string;

  image: string;

  variants: Variant[];

  onProductClick?: (
    productId: string
  ) => void;
};

const ProductCard: React.FC<
  ProductCardProps
> = ({
  id,
  title,
  description,
  image,
  variants,
  onProductClick,
}) => {

    // ================= VARIANT =================

    const [
      selectedVariantIndex,
      setSelectedVariantIndex,
    ] = useState(0);

    const selectedVariant =
      variants?.[
      selectedVariantIndex
      ];

    const variantId =
      selectedVariant
        ?.variantId || "";

    const price =
      selectedVariant
        ?.discountPrice ||
      selectedVariant?.price ||
      0;

    const mrp =
      selectedVariant?.price || 0;

    const stock =
      selectedVariant?.quantity ||
      0;

    const maxOrderStock =
      selectedVariant
        ?.maxOrderQuantity || 0;

    // ================= QTY =================

    const [qty, setQty] =
      useState(
        selectedVariant
          ?.cartQuantity || 0
      );

    useEffect(() => {

      setQty(
        selectedVariant
          ?.cartQuantity || 0
      );

    }, [selectedVariant]);

    // ================= CART =================

    const {
      addProductToCart,
      loading,
    } = useAddToCart();

    const [
      cartLoading,
      setCartLoading
    ] = useState(false);

    // ================= LOGIN =================

    const storeTokens = JSON.parse(
      localStorage.getItem(
        "storeTokens"
      ) || "{}"
    );

    const activeStoreId =
      localStorage.getItem(
        "activeStoreId"
      );

    const userToken =
      storeTokens[
      activeStoreId || ""
      ];

    // ================= INCREASE =================

    const increase = async (
      e?: React.MouseEvent
    ) => {

      e?.preventDefault();

      e?.stopPropagation();

      if (!userToken) {

        alert(
          "Please login first"
        );

        return;
      }

      if (!variantId) {

        alert(
          "Variant not found"
        );

        return;
      }

      if (cartLoading) return;

      try {

        setCartLoading(true);

        const newQty = qty + 1;

        // MAX ORDER
        if (
          maxOrderStock > 0 &&
          newQty >
          maxOrderStock
        ) {

          alert(
            `Maximum ${maxOrderStock} items allowed`
          );

          return;
        }

        // STOCK
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

          variantId,

          quantity: newQty,
        });

      } catch (err) {

        console.error(err);

        setQty(
          selectedVariant
            ?.cartQuantity || 0
        );

      } finally {

        setCartLoading(false);
      }
    };

    // ================= DECREASE =================

    const decrease = async (
      e?: React.MouseEvent
    ) => {

      e?.preventDefault();

      e?.stopPropagation();

      if (!userToken) return;

      if (!variantId) return;

      if (cartLoading) return;

      if (qty <= 0) return;

      try {

        setCartLoading(true);

        const newQty = qty - 1;

        // optimistic update
        setQty(newQty);

        await addProductToCart({

          productId: id,

          variantId,

          quantity: newQty,
        });

      } catch (err) {

        console.error(err);

        setQty(
          selectedVariant
            ?.cartQuantity || 0
        );

      } finally {

        setCartLoading(false);
      }
    };

    // ================= NAVIGATE =================

    const handleClick = () => {
      onProductClick?.(id);
    };

    // ================= DISCOUNT =================

    const discount =
      mrp > price
        ? Math.round(
          ((mrp - price) / mrp) *
          100
        )
        : 0;

    return (
      <div className="product-card-modern">

        {/* IMAGE */}
        <div className="product-img">

          {discount > 0 && (

            <div className="product-discount">
              {discount}% Off
            </div>
          )}

          <img
            src={image}
            alt={title}
            onClick={handleClick}
          />

          {/* CART */}
          <div className="product-add-to-cart">

            {qty === 0 ? (

              <button
                type="button"
                className="add-btn"
                onClick={(e) =>
                  increase(e)
                }
                disabled={
                  loading ||
                  cartLoading
                }
              >

                {loading ||
                  cartLoading
                  ? "..."
                  : "ADD"}
              </button>

            ) : (

              <div className="qty-controller">

                <button
                  type="button"
                  onClick={(e) =>
                    decrease(e)
                  }
                  disabled={
                    loading ||
                    cartLoading
                  }
                >
                  <BsDash />
                </button>

                <span>{qty}</span>

                <button
                  type="button"
                  onClick={(e) =>
                    increase(e)
                  }
                  disabled={
                    loading ||
                    cartLoading
                  }
                >
                  <BsPlus />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DETAILS */}
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

          {/* VARIANT */}
          <div
            className="product-quantity-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <select
              value={selectedVariantIndex}
              onChange={(e) => {

                const index = Number(
                  e.target.value
                );

                setSelectedVariantIndex(
                  index
                );

                setQty(
                  variants[index]
                    ?.cartQuantity || 0
                );
              }}
            >

              {variants?.map(
                (variant, index) => (

                  <option
                    key={variant.variantId}
                    value={index}
                  >

                    {variant.variantName}

                    {variant.unitValue &&
                      variant.unitType
                      ? ` (${variant.unitValue}${variant.unitType})`
                      : ""}
                  </option>
                )
              )}
            </select>

            <IoMdArrowDropdown
              className="product-dropdown-icon"
            />
          </div>
        </div>
      </div>
    );
  };

export default ProductCard;