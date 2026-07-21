import { useState } from "react";
import type { AdminStoreSettingsRequest } from "../../../models/admin/storeSettings/request/AdminStoreSettingsRequest";
import type { AdminStoreSettingsResponse } from "../../../models/admin/storeSettings/response/AdminStoreSettingsResponse";
import { getAdminStoreSettings, updateAdminStoreSettings } from "../../../api/admin/adminStoreSettingsApi";

export const useAdminStoreSettings = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<AdminStoreSettingsResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // CLEAR ERROR
    const clearError = () => {
        setError(null);
    };

    // GET STORE SETTINGS
    const fetchStoreSettings = async (): Promise<AdminStoreSettingsResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await getAdminStoreSettings();

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
                "Failed to fetch store settings";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    // UPDATE STORE SETTINGS
    const updateStoreSettings = async (
        request: AdminStoreSettingsRequest
    ): Promise<AdminStoreSettingsResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res =
                await updateAdminStoreSettings(request);

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
                "Failed to update store settings";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        fetchStoreSettings,
        updateStoreSettings,
        loading,
        data,
        error,
        clearError,
    };
};