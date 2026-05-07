import { useAddToCart } from "../../hooks/user/cart/useAddToCart";
import type { CartItem } from "../../models/user/cart/response/CartItem";
import "./Cart.css";

type Props = {
  items: CartItem[];
  loading?: boolean;
  fetchCart: () => void;
};

const CartItems = ({
    items,
    loading,
    fetchCart
}: Props) => {
    const { addProductToCart } = useAddToCart();

    // loading
    if (loading) {
        return (
            <div className="cart-left">
                Loading cart...
            </div>
        );
    }

    // empty cart
    if (items.length === 0) {
        return (
            <div className="cart-left">
                Your cart is empty
            </div>
        );
    }

    const handleIncrease = async (
        item: CartItem
    ) => {

        try {

            await addProductToCart({
                productId: item.productId,
                quantity: item.quantity + 1,
            });

            fetchCart();

        } catch (err) {

            console.error(err);
        }
    };

    const handleDecrease = async (
        item: CartItem
    ) => {

        // prevent negative qty
        if (item.quantity <= 1) return;

        try {

            await addProductToCart({
                productId: item.productId,
                quantity: item.quantity - 1,
            });

            fetchCart();

        } catch (err) {

            console.error(err);
        }
    };

    return (
        <div className="cart-left">

            {/* FREE DELIVERY */}
            <div className="free-banner">
                FREE DELIVERY applied on this order
            </div>

            <div className="cart-card">

                {/* ITEM COUNT */}
                <div>
                    🛒 {items.length} Items
                </div>

                {/* CART ITEMS */}
                {items.map((item) => (

                    <div
                        className="cart-item"
                        key={item.cartId}
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
                                Qty × {item.quantity}
                            </div>

                        </div>

                        {/* PRICE */}
                        <div className="price">
                            ₹{item.totalPrice}
                        </div>

                        {/* QTY CONTROLLER */}
                        <div className="qty-controller">

                            {/* MINUS */}
                            <button
                                type="button"
                                onClick={() =>
                                    handleDecrease(item)
                                }
                            >
                                −
                            </button>

                            {/* QTY */}
                            <span>
                                {item.quantity}
                            </span>

                            {/* PLUS */}
                            <button
                                type="button"
                                onClick={() =>
                                    handleIncrease(item)
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default CartItems;