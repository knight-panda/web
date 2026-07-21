import { useState } from "react";
import type { UserAddressResponse } from "../../../models/user/address/response/UserAddressResponse ";
import { getUserAddress, updateUserAddress } from "../../../api/user/userAddressApi";
import type { UserAddressRequest } from "../../../models/user/address/request/UserAddressRequest";

export const useUserAddress = () => {

    const [loading, setLoading] =
        useState(false);
    const [data, setData] =
        useState<UserAddressResponse | null>(
            null
        );

    const [error, setError] =
        useState<string | null>(null);

    const fetchAddress = async () => {

        try {

            setLoading(true);
            setError(null);

            const res = await getUserAddress();
            setData(res);

            return res;
        } catch (err: any) {

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch address";
            setError(message);

            throw new Error(message);

        } finally {
            setLoading(false);
        }
    };

    const updateAddress = async (
        request: UserAddressRequest
    ) => {

        try {
            setLoading(true);
            setError(null);

            const res = await updateUserAddress(request);
            setData(res);

            return res;
        } catch (err: any) {

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update address";

            setError(message);
            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        fetchAddress,
        updateAddress,
        loading,
        data,
        error,
    };
};