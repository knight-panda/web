import { useState } from "react";
import type { UserAddressResponse } from "../../../models/user/address/response/UserAddressResponse ";
import { getUserAddress, updateUserProfile } from "../../../api/user/userAddressApi";
import type { UserProfileRequest } from "../../../models/user/address/request/UserProfileRequest";

export const useUserUpdateProfile = () => {

    const [loading, setLoading] =
        useState(false);
    const [data, setData] =
        useState<UserAddressResponse | null>(
            null
        );

    const [error, setError] =
        useState<string | null>(null);

    const fetchUserData = async () => {

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

    const updateProfileData = async (
        request: UserProfileRequest
    ) => {

        try {
            setLoading(true);
            setError(null);

            const res = await updateUserProfile(request);
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
        fetchUserData,
        updateProfileData,
        loading,
        data,
        error,
    };
};