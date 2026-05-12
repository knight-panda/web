import { useState } from "react";
import type { GetUserOrdersResponse } from "../../../models/user/order/response/GetUserOrdersResponse";
import { getAdminOrders } from "../../../api/admin/orderAdminApi";

export const useGetAdminOrders = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<GetUserOrdersResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // clear error
    const clearError = () => {
        setError(null);
    };

    // fetch order
    const fetchOrders = async (): Promise<GetUserOrdersResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await getAdminOrders();

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
        fetchOrders,
        loading,
        data,
        error,
        clearError,
    };
};