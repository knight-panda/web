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
    primaryColor?: string;
};

const CartItems = ({
    items,
    loading,
    fetchCart,
    setCartData,
    primaryColor,

}: Props) => {

    const {
        addProductToCart
    } = useAddToCart();

    // ================= LOCAL STATE =================

    const [
        localItems,
        setLocalItems
    ] = useState<CartItem[]>(items);

    // ================= SYNC =================

    useEffect(() => {

        setLocalItems(items);

    }, [items]);

    // ================= LOADING =================

    if (loading) {

        return (
            <div className="cart-left">
                Loading cart...
            </div>
        );
    }

    // ================= EMPTY =================

    if (
        !localItems ||
        localItems.length === 0
    ) {

        return (
            <div className="cart-left">
                Your cart is empty
            </div>
        );
    }

    // ================= INCREASE =================

    const handleIncrease = async (
        item: CartItem
    ) => {

        try {

            // stock validation
            if (
                item.quantity + 1 >
                item.productStock
            ) {

                alert(
                    `Only ${item.productStock} items available`
                );

                return;
            }

            // max order validation
            if (
                item.productMaxOrderStock > 0 &&
                item.quantity + 1 >
                item.productMaxOrderStock
            ) {

                alert(
                    `Maximum ${item.productMaxOrderStock} items allowed`
                );

                return;
            }

            // optimistic update
            setLocalItems(prev =>
                prev.map(cartItem =>
                    cartItem.cartId === item.cartId
                        ? {
                            ...cartItem,
                            quantity:
                                cartItem.quantity + 1,

                            totalPrice:
                                (
                                    cartItem.discountPrice ||
                                    cartItem.productPrice
                                ) *
                                (
                                    cartItem.quantity + 1
                                )
                        }
                        : cartItem
                )
            );

            // API CALL
            await addProductToCart({

                productId:
                    item.productId,

                variantId:
                    item.variantId,

                quantity:
                    item.quantity + 1,
            });

            await fetchCart();

        } catch (err) {

            console.error(err);
        }
    };

    // ================= DECREASE =================

    const handleDecrease = async (
        item: CartItem
    ) => {

        try {

            // REMOVE ITEM
            if (item.quantity <= 1) {

                // optimistic remove
                setLocalItems(prev =>
                    prev.filter(
                        cartItem =>
                            cartItem.cartId !==
                            item.cartId
                    )
                );

                // update parent
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

                // API CALL
                await addProductToCart({

                    productId:
                        item.productId,

                    variantId:
                        item.variantId,

                    quantity: 0,
                });

                await fetchCart();

                return;
            }

            // optimistic decrease
            setLocalItems(prev =>
                prev.map(cartItem =>
                    cartItem.cartId === item.cartId
                        ? {
                            ...cartItem,
                            quantity:
                                cartItem.quantity - 1,

                            totalPrice:
                                (
                                    cartItem.discountPrice ||
                                    cartItem.productPrice
                                ) *
                                (
                                    cartItem.quantity - 1
                                )
                        }
                        : cartItem
                )
            );

            // API CALL
            await addProductToCart({

                productId:
                    item.productId,

                variantId:
                    item.variantId,

                quantity:
                    item.quantity - 1,
            });

            await fetchCart();

        } catch (err) {

            console.error(err);
        }
    };

    return (
        <div
            className="cart-left"
            style={{
                "--store-primary-color": primaryColor || "var(--primary-color)"
            } as React.CSSProperties}>

            {/* FREE DELIVERY */}
            <div className="free-banner">
                FREE DELIVERY applied on this order
            </div>

            <div className="cart-card">

                {/* ITEM COUNT */}
                <div className="ci-item-count">
                    🛒 {localItems.length} Items
                </div>

                {/* ITEMS */}
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

                            {/* PRODUCT NAME */}
                            <div className="name">
                                {item.productName}
                            </div>

                            {/* VARIANT */}
                            <div className="ci-variant">

                                {item.variantName}

                                {item.unitValue &&
                                    item.unitType
                                    ? ` • ${item.unitValue}${item.unitType}`
                                    : ""}

                            </div>

                            {/* OPTIONAL */}
                            {(item.size ||
                                item.color) && (

                                    <div className="ci-extra">

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