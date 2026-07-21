import { useState } from "react";
import type { GetUserOrderDetailsResponse } from "../../../models/user/order/response/GetUserOrderDetailsResponse";
import { getAdminOrderDetails } from "../../../api/admin/orderAdminApi";

export const useGetAdminOrderDetails = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<GetUserOrderDetailsResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // CLEAR ERROR
    const clearError = () => {
        setError(null);
    };

    // FETCH ORDER DETAILS
    const fetchOrderDetails = async (
        orderId: string
    ): Promise<GetUserOrderDetailsResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await getAdminOrderDetails(orderId);

            // API VALIDATION
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
                "Failed to fetch order details";

            setError(message);

            throw new Error(message);

        } finally {
            setLoading(false);
        }
    };

    return {
        fetchOrderDetails,
        loading,
        data,
        error,
        clearError,
    };
};