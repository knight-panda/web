import { useState } from "react";
import { getUserProduct } from "../../../api/user/userProductsApi";
import type { UserProductsResponse } from "../../../models/user/products/response/UserProductsResponse";

export const useUserProducts = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<UserProductsResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // ✅ clear error
    const clearError = () => {
        setError(null);
    };

    // ✅ fetch products
    const fetchProducts = async (): Promise<UserProductsResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await getUserProduct();

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
                "Failed to fetch products";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        fetchProducts,
        loading,
        data,
        error,
        clearError,
    };
};