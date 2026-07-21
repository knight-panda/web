import { useState } from "react";
import type { GetUserOrderDetailsResponse }
from "../../../models/user/order/response/GetUserOrderDetailsResponse";
import type { UpdateOrderStatusRequest }
from "../../../models/admin/order/request/UpdateOrderStatusRequest";
import { updateAdminOrderStatus }
from "../../../api/admin/orderAdminApi";

export const useUpdateAdminOrderStatus = () => {

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

    // UPDATE ORDER STATUS
    const updateOrderStatus = async (
        orderId: string,
        request: UpdateOrderStatusRequest
    ): Promise<GetUserOrderDetailsResponse> => {

        try {

            setLoading(true);

            setError(null);

            const res =
                await updateAdminOrderStatus(
                    orderId,
                    request
                );

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
                "Failed to update order status";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        updateOrderStatus,
        loading,
        data,
        error,
        clearError,
    };
};