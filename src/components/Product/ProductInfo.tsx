import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { BsPlus, BsDash } from "react-icons/bs";
import { useAddToCart } from "../../hooks/user/cart/useAddToCart";
import type { Product } from "../../models/user/products/response/UserProductDetailsResponse";

type ProductInfoProps = {
    product: Product;
};

const ProductInfo = ({
    product,
}: ProductInfoProps) => {

    const navigate = useNavigate();

    const [qty, setQty] = useState(
        product.cartQuantity || 0
    );

    const {
        addProductToCart,
        loading,
    } = useAddToCart();

    const [cartLoading, setCartLoading] =
        useState(false);

    // logged in user
    const storeTokens = JSON.parse(
        localStorage.getItem("storeTokens") || "{}"
    );

    const activeStoreId =
        localStorage.getItem("activeStoreId");

    const userToken =
        storeTokens[activeStoreId || ""];

    useEffect(() => {
        setQty(product.cartQuantity || 0);
    }, [product]);

    // increase qty
    const increase = async () => {

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
            if (
                newQty >
                product.maxOrderStock
            ) {

                alert(
                    `Maximum ${product.maxOrderStock} items allowed`
                );

                return;
            }

            // stock validation
            if (newQty > product.stock) {

                alert(
                    `Only ${product.stock} items available`
                );

                return;
            }

            // optimistic update
            setQty(newQty);

            await addProductToCart({
                productId: product.id,
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

    // decrease qty
    const decrease = async () => {

        if (!userToken) return;

        if (cartLoading) return;

        if (qty <= 0) return;

        try {

            setCartLoading(true);

            const newQty = qty - 1;

            // optimistic update
            setQty(newQty);

            await addProductToCart({
                productId: product.id,
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

    const isOutOfStock =
        product.stock <= 0;

    return (
        <div className="product-info">

            <h1>{product.name}</h1>

            <div className="price-row">

                {product.discountPrice > 0 && (
                    <span className="old-price">
                        ₹{product.price}
                    </span>
                )}

                <span className="new-price">
                    ₹
                    {product.discountPrice > 0
                        ? product.discountPrice
                        : product.price}
                </span>

                {product.discountPrice > 0 && (
                    <span className="badge">
                        Sale
                    </span>
                )}

            </div>

            <p className="shipping">
                Shipping calculated at checkout
            </p>

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

            <div className="description">

                <p>
                    {product.description}
                </p>

            </div>

        </div>
    );
};

export default ProductInfo;