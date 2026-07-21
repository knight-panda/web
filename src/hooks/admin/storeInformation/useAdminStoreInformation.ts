import { useState } from "react";
import type { AdminStoreInformationRequest } from "../../../models/admin/storeInformation/request/AdminStoreInformationRequest";
import type { AdminStoreInformationResponse } from "../../../models/admin/storeInformation/response/AdminStoreInformationResponse";
import { getAdminStoreInformation, updateAdminStoreInformation } from "../../../api/admin/adminStoreInformationApi";

export const useAdminStoreInformation = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<AdminStoreInformationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // CLEAR ERROR
    const clearError = () => { setError(null); };

    // GET STORE INFORMATION
    const fetchStoreInformation = async (): Promise<AdminStoreInformationResponse> => {

        try {
            setLoading(true);
            setError(null);
            const res = await getAdminStoreInformation();

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
                "Failed to fetch store information";
            setError(message);
            throw new Error(message);

        } finally {
            setLoading(false);
        }
    };

    // UPDATE STORE INFORMATION
    const updateStoreInformation = async (
        request: AdminStoreInformationRequest
    ): Promise<AdminStoreInformationResponse> => {

        try {
            setLoading(true);
            setError(null);
            const res =
                await updateAdminStoreInformation(
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
                "Failed to update store information";
            setError(message);
            throw new Error(message);

        } finally {
            setLoading(false);
        }
    };

    return {
        fetchStoreInformation,
        updateStoreInformation,
        loading,
        data,
        error,
        clearError,
    };
};