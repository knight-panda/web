import { useState } from "react";
import { getCart } from "../../../api/user/cartApi";
import type { GetCartResponse } from "../../../models/user/cart/response/GetCartResponse";

export const useGetCart = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<GetCartResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // clear error
    const clearError = () => {
        setError(null);
    };

    // fetch cart
    const fetchCart = async (): Promise<GetCartResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await getCart();

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
                "Failed to fetch cart";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        fetchCart,
        loading,
        data,
        error,
        clearError,
    };
};