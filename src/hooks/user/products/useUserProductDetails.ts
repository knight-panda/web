import { useState } from "react";

import { getUserProductDetails }
    from "../../../api/user/userProductsApi";

import type {
    UserProductDetailsResponse
} from "../../../models/user/products/response/UserProductDetailsResponse";

export const useUserProductDetails = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<UserProductDetailsResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // clear error
    const clearError = () => {
        setError(null);
    };

    // fetch product details
    const fetchProductDetails = async (
        productId: string
    ): Promise<UserProductDetailsResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res =
                await getUserProductDetails(
                    productId
                );

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
                "Failed to fetch product";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        fetchProductDetails,
        loading,
        data,
        error,
        clearError,
    };
};