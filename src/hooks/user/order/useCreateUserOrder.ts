import { useState } from "react";

import { createUserOrders } from "../../../api/user/orderUserApi";
import type { UserOrderRequest } from "../../../models/user/order/request/UserOrderRequest";
import type { CreateUserOrdersResponse } from "../../../models/user/order/response/CreateUserOrdersResponse";

export const useCreateUserOrder = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<CreateUserOrdersResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    const clearError = () => {
        setError(null);
    };

    const createOrder = async (
        payload: UserOrderRequest
    ): Promise<CreateUserOrdersResponse> => {

        try {

            setLoading(true);

            setError(null);

            const res =
                await createUserOrders(payload);

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
                "Failed to create order";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        createOrder,
        loading,
        data,
        error,
        clearError
    };
};