import type { UserOrderItemModel } from "../../models/user/order/response/UserOrderItemModel";
import "./OrderItemsDetails.css";

type Props = {
    items: UserOrderItemModel[];
};

const OrderItemsDetails = ({
    items,
}: Props) => {

    // TOTAL SAVED
    const totalSaved = items.reduce((total, item) => {

        const original =
            item.productPrice || 0;

        const discounted =
            item.discountPrice || 0;

        const saved =
            (original - discounted) * item.quantity;

        return total + saved;

    }, 0);

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

                <div>
                    🛒 {items.length} Items
                </div>

                {
                    items.map((item) => (

                        <div
                            key={item.productId}
                            className="cart-item"
                        >

                            {/* IMAGE */}
                            <img
                                src={item.productImage}
                                alt={item.productName}
                            />

                            {/* INFO */}
                            <div className="item-info">

                                <div className="name">
                                    {item.productName}
                                </div>

                                <div className="ci-qantity">

                                    Qty: {item.quantity}

                                    {
                                        item.size &&
                                        ` · Size: ${item.size}`
                                    }

                                    {
                                        item.color &&
                                        ` · Color: ${item.color}`
                                    }

                                </div>

                            </div>

                            {/* PRICE */}
                            <div className="price">

                                ₹{item.totalPrice}

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
};

export default OrderItemsDetails;