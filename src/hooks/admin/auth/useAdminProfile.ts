import { useState } from "react";

import type { AdminUpdateRequest } from "../../../models/admin/auth/request/AdminUpdateRequest";
import type { AdminResponse } from "../../../models/admin/auth/response/AdminResponse";
import { getAdminProfile, updateProfile } from "../../../api/admin/adminProfileApi";

export const useAdminProfile = () => {

    const [adminProfileloading, setadminProfileLoading] =
        useState(false);

    const [data, setData] =
        useState<AdminResponse | null>(
            null
        );

    const [error, setError] =
        useState<string | null>(null);

    // get profile
    const fetchAdminProfile =
        async () => {

            try {

                setadminProfileLoading(true);
                setError(null);

                const res =
                    await getAdminProfile();

                setData(res);

                return res;

            } catch (err: any) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch profile";

                setError(message);

                throw new Error(message);

            } finally {

                setadminProfileLoading(false);
            }
        };

    // update profile
    const updateAdminProfile =
        async (
            request: AdminUpdateRequest
        ) => {

            try {

                setadminProfileLoading(true);
                setError(null);

                const res =
                    await updateProfile(
                        request
                    );

                setData(res);

                return res;

            } catch (err: any) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to update profile";

                setError(message);

                throw new Error(message);

            } finally {

                setadminProfileLoading(false);
            }
        };

    return {
        fetchAdminProfile,
        updateAdminProfile,
        adminProfileloading,
        data,
        error,
    };
};