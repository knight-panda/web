import type { UserOrderItemModel } from "../../models/user/order/response/UserOrderItemModel";

import "./OrderItemsDetails.css";

type Props = {
  items: UserOrderItemModel[];
};

const OrderItemsDetails = ({
  items,
}: Props) => {

  // ================= TOTAL SAVED =================

  const totalSaved =
    items.reduce(
      (total, item) => {

        const original =
          item.productPrice || 0;

        const discounted =
          item.discountPrice ||
          item.productPrice ||
          0;

        const saved =
          (
            original -
            discounted
          ) * item.quantity;

        return total + saved;

      },
      0
    );

  return (
    <div className="od-left">

      {/* SAVED BANNER */}
      <div className="od-free-banner">

        ₹{totalSaved} saved!

        <span>
          FREE DELIVERY
        </span>

        applied on this order

      </div>

      {/* CARD */}
      <div className="od-card">

        <div className="od-item-count">
          🛒 {items.length} Items
        </div>

        {items.map((item, index) => (

          <div
            key={`${item.productId}-${item.variantId}-${index}`}
            className="cart-item"
          >

            {/* IMAGE */}
            <img
              src={item.productImage}
              alt={item.productName}
            />

            {/* INFO */}
            <div className="item-info">

              {/* PRODUCT NAME */}
              <div className="name">
                {item.productName}
              </div>

              {/* VARIANT */}
              <div className="od-variant">

                {item.variantName}

                {item.unitValue &&
                item.unitType
                  ? ` • ${item.unitValue}${item.unitType}`
                  : ""}

              </div>

              {/* EXTRA */}
              {(item.size ||
                item.color) && (

                <div className="od-extra">

                  {item.size &&
                    `Size: ${item.size}`}

                  {item.size &&
                    item.color &&
                    " • "}

                  {item.color &&
                    `Color: ${item.color}`}

                </div>
              )}

              {/* QTY */}
              <div className="ci-qantity">
                Qty × {item.quantity}
              </div>

            </div>

            {/* PRICE */}
            <div className="price-box">

              {/* CURRENT PRICE */}
              <div className="price">
                ₹{item.totalPrice}
              </div>

              {/* ORIGINAL */}
              {item.discountPrice &&
                item.discountPrice <
                item.productPrice && (

                  <div className="old-price">

                    ₹
                    {item.productPrice *
                      item.quantity}

                  </div>
                )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default OrderItemsDetails;