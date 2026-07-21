import { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";
import "./ProductCardAdmin.css";
import { IoMdArrowDropdown } from "react-icons/io";

type Variant = {
  variantId: string;

  variantName: string;

  price: number;

  discountPrice?: number;

  quantity: number;

  unitValue?: number;

  unitType?: string;
};

type Props = {
  title: string;

  description?: string;

  image: string;

  variants: Variant[];
};

const ProductCardAdmin: React.FC<Props> = ({
  title,
  description,
  image,
  variants,
}) => {

  const [qty, setQty] = useState(0);

  const [selectedVariantIndex, setSelectedVariantIndex] =
    useState(0);

  const selectedVariant =
    variants[selectedVariantIndex];

  const price =
    selectedVariant?.discountPrice ||
    selectedVariant?.price ||
    0;

  const mrp =
    selectedVariant?.price || 0;

  const stock =
    selectedVariant?.quantity || 0;

  // increase
  const increase = () => {

    if (qty < stock) {

      setQty((prev) => prev + 1);
    }
  };

  // decrease
  const decrease = () => {

    if (qty > 0) {

      setQty((prev) => prev - 1);
    }
  };

  // discount %
  const discount =
    mrp > price
      ? Math.round(
          ((mrp - price) / mrp) * 100
        )
      : 0;

  return (
    <div className="admin-product-card-modern">

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
        />

        <div className="product-add-to-cart">

          {qty === 0 ? (

            <div
              className="add-btn"
              onClick={increase}
            >
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
          {title}
        </div>

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

        {/* STOCK */}
        <div className="product-stock">

          {stock > 0
            ? `${stock} in stock`
            : "Out of stock"}
        </div>

        {/* VARIANT SELECT */}
        <div className="product-quantity-box">

          <select
            value={selectedVariantIndex}
            onChange={(e) => {

              setSelectedVariantIndex(
                Number(e.target.value)
              );

              setQty(0);
            }}
          >

            {variants.map(
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

          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;