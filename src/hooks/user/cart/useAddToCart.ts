import { useState } from "react";
import type { AddToCartResponse } from "../../../models/user/cart/response/AddToCartResponse";
import type { AddToCartRequest } from "../../../models/user/cart/request/AddToCartRequest";
import { addToCart } from "../../../api/user/cartApi";

export const useAddToCart = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<AddToCartResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // ✅ clear error
    const clearError = () => {
        setError(null);
    };

    const addProductToCart = async (
        payload: AddToCartRequest
    ): Promise<AddToCartResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await addToCart(payload);

            // API validation
            if (!res.success) {

                setError(res.message);

                throw new Error(res.message);
            }

            setData(res);

            return res;

        } catch (err: any) {

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to add product to cart";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        addProductToCart,
        loading,
        data,
        error,
        clearError,
    };
};