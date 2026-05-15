import { useEffect, useState } from "react";
import { useAddToCart } from "../../hooks/user/cart/useAddToCart";
import type { CartItem } from "../../models/user/cart/response/CartItem";
import type { GetCartResponse } from "../../models/user/cart/response/GetCartResponse";
import "./Cart.css";

type Props = {
    items: CartItem[];
    loading?: boolean;
    fetchCart: () => Promise<GetCartResponse>;
    setCartData: React.Dispatch<any>;
};

const CartItems = ({
    items,
    loading,
    fetchCart,
    setCartData
}: Props) => {

    const { addProductToCart } =
        useAddToCart();

    // LOCAL STATE
    const [localItems, setLocalItems] =
        useState<CartItem[]>(items);

    // SYNC PROPS TO STATE
    useEffect(() => {

        setLocalItems(items);

    }, [items]);

    // LOADING
    if (loading) {

        return (
            <div className="cart-left">
                Loading cart...
            </div>
        );
    }

    // EMPTY CART
    if (!localItems ||
        localItems.length === 0
    ) {

        return (
            <div className="cart-left">
                Your cart is empty
            </div>
        );
    }

    // INCREASE
    const handleIncrease = async (
        item: CartItem
    ) => {

        try {

            // OPTIMISTIC REMOVE
            setLocalItems(prev =>
                prev.filter(
                    cartItem =>
                        cartItem.cartId !==
                        item.cartId
                )
            );

            // UPDATE PARENT CART
            setCartData((prev: any) => ({
                ...prev,
                items: [],
                itemTotal: 0,
                totalDiscount: 0,
                packagingFee: 0,
                deliveryFee: 0,
                platformFee: 0,
                codFee: 0,
                gstAmount: 0,
                grandTotal: 0,
                codEnabled: false,
                onlinePaymentEnabled: false,
            }));

            await addProductToCart({
                productId: item.productId,
                quantity: item.quantity + 1,
            });

            await fetchCart();

        } catch (err) {

            console.error(err);
        }
    };

    // DECREASE
    const handleDecrease = async (
        item: CartItem
    ) => {

        try {

            // REMOVE ITEM
            if (item.quantity <= 1) {

                // OPTIMISTIC REMOVE
                setLocalItems(prev =>
                    prev.filter(
                        cartItem =>
                            cartItem.cartId !==
                            item.cartId
                    )
                );

                // UPDATE PARENT CART
                setCartData((prev: any) => ({
                    ...prev,
                    items: [],
                    itemTotal: 0,
                    totalDiscount: 0,
                    packagingFee: 0,
                    deliveryFee: 0,
                    platformFee: 0,
                    codFee: 0,
                    gstAmount: 0,
                    grandTotal: 0,
                    codEnabled: false,
                    onlinePaymentEnabled: false,
                }));

                await addProductToCart({
                    productId: item.productId,
                    quantity: 0,
                });

                await fetchCart();

                return;
            }

            // OPTIMISTIC DECREASE
            setLocalItems(prev =>
                prev.map(cartItem =>
                    cartItem.cartId === item.cartId
                        ? {
                            ...cartItem,
                            quantity:
                                cartItem.quantity - 1
                        }
                        : cartItem
                )
            );

            // API CALL
            await addProductToCart({
                productId: item.productId,
                quantity: item.quantity - 1,
            });

            await fetchCart();

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
                <div className="ci-item-count">
                    🛒 {localItems.length} Items
                </div>

                {/* CART ITEMS */}
                {localItems.map((item) => (

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
                        <div className="ci-price">
                            ₹{item.totalPrice}
                        </div>

                        {/* QTY CONTROLLER */}
                        <div className="ci-qty-controller">

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