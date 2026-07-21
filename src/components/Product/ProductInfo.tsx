import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./ProductDetails.css";

import {
    BsPlus,
    BsDash
} from "react-icons/bs";

import {
    useAddToCart
} from "../../hooks/user/cart/useAddToCart";

import type {
    Product
} from "../../models/user/products/response/UserProductDetailsResponse";
import type { Store } from "../../models/store/response/SingleStoreResponse";

type ProductInfoProps = {
    product: Product;
    storeData: Store
};

const ProductInfo = ({
    product, storeData
}: ProductInfoProps) => {

    const navigate =
        useNavigate();

    // ================= VARIANT =================

    const [
        selectedVariantIndex,
        setSelectedVariantIndex,
    ] = useState(0);

    const selectedVariant =
        product.variants?.[
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

    const increase = async () => {

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

            // max order validation
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

                productId: product.id,

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

    const decrease = async () => {

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

                productId: product.id,

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

    // ================= STOCK =================

    const isOutOfStock =
        stock <= 0;

    // ================= DISCOUNT =================

    const discount =
        mrp > price
            ? Math.round(
                ((mrp - price) / mrp) *
                100
            )
            : 0;

    return (
        <div
            className="product-info"
            style={{
                "--store-primary-color": storeData.primaryColor || "var(--primary-color)"
            } as React.CSSProperties}>

            <div className="pd-name">{product.name}</div>

            {/* VARIANT */}
            <div className="pd-variant-list">

                {product.variants?.map(
                    (variant, index) => {

                        const isSelected =
                            selectedVariantIndex === index;

                        return (

                            <div
                                key={variant.variantId}

                                className={`pd-variant-item ${isSelected
                                    ? "active"
                                    : ""
                                    }`}

                                onClick={() => {

                                    setSelectedVariantIndex(
                                        index
                                    );

                                    setQty(
                                        variant.cartQuantity || 0
                                    );
                                }}
                            >

                                <div className="pd-variant-left">

                                    <div className="pd-variant-name">
                                        {variant.variantName}
                                    </div>

                                    <div className="pd-variant-subtitle">

                                        {variant.unitValue &&
                                            variant.unitType
                                            ? `${variant.unitValue}${variant.unitType}`
                                            : "Package"}

                                    </div>
                                </div>

                                <div className="pd-variant-right">

                                    <div className="pd-variant-price">

                                        ₹
                                        {variant.discountPrice ||
                                            variant.price}
                                    </div>

                                    {variant.discountPrice &&
                                        variant.discountPrice <
                                        variant.price && (

                                            <div className="pd-variant-mrp">
                                                ₹{variant.price}
                                            </div>
                                        )}
                                </div>
                            </div>
                        );
                    }
                )}
            </div>

            {/* PRICE */}
            <div className="price-row">

                {mrp > price && (

                    <span className="old-price">
                        ₹{mrp}
                    </span>
                )}

                <span className="new-price">
                    ₹{price}
                </span>

                {discount > 0 && (

                    <span className="badge">
                        {discount}% OFF
                    </span>
                )}
            </div>

            <p className="shipping">
                Shipping calculated at checkout
            </p>

            {/* STOCK */}
            {isOutOfStock ? (

                <div className="pd-add-btn out-stock">
                    Out of stock
                </div>

            ) : (

                <div className="pd-qty-controller">

                    <button
                        onClick={decrease}
                        disabled={
                            loading ||
                            cartLoading
                        }
                    >
                        <BsDash />
                    </button>

                    <span>{qty}</span>

                    <button
                        onClick={increase}
                        disabled={
                            loading ||
                            cartLoading
                        }
                    >
                        <BsPlus />
                    </button>
                </div>
            )}

            {/* BUTTON */}
            <button
                className="add-to-cart"
                disabled={isOutOfStock}
                onClick={() => {

                    if (qty > 0) {

                        navigate("/cart");

                    } else {

                        increase();
                    }
                }}
            >

                {qty > 0
                    ? "Go to cart"
                    : "Add to cart"}
            </button>

            {/* DESCRIPTION */}
            <div className="description">

                <p>
                    {product.description}
                </p>

            </div>
        </div>
    );
};

export default ProductInfo;