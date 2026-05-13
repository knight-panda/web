import { useState } from "react";

import { createRazorpayOrder } from "../../../api/user/orderUserApi";
import type { CreateRazorpayOrderRequest } from "../../../models/user/order/request/CreateRazorpayOrderRequest";
import type { CreateRazorpayOrderResponse } from "../../../models/user/order/response/CreateRazorpayOrderResponse";


export const useCreateRazorpayOrder = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<CreateRazorpayOrderResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    const clearError = () => {
        setError(null);
    };

    const createOrder = async (
        payload: CreateRazorpayOrderRequest
    ): Promise<CreateRazorpayOrderResponse> => {

        try {

            setLoading(true);

            setError(null);

            const res =
                await createRazorpayOrder(payload);

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
                "Failed to create razorpay order";

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