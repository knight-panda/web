import { useState } from "react";
import type { AdminStoreDomainRequest } from "../../../models/admin/storeDomain/request/AdminStoreDomainRequest";
import type { AdminStoreDomainResponse } from "../../../models/admin/storeDomain/response/AdminStoreDomainResponse";
import { getAdminStoreDomain, updateAdminStoreDomain } from "../../../api/admin/adminStoreDomainApi";

export const useAdminStoreDomain = () => {

    const [loading, setLoading] =
        useState<boolean>(false);

    const [data, setData] =
        useState<AdminStoreDomainResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    // CLEAR ERROR
    const clearError = () => {
        setError(null);
    };

    // GET STORE DOMAIN
    const fetchStoreDomain = async (
    ): Promise<AdminStoreDomainResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res =
                await getAdminStoreDomain();

            // API VALIDATION
            if (!res.success) {

                setError(res.message);

                throw new Error(
                    res.message
                );
            }

            setData(res);

            return res;

        } catch (err: any) {

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch store domain";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    // UPDATE STORE DOMAIN
    const updateStoreDomain = async (
        request: AdminStoreDomainRequest
    ): Promise<AdminStoreDomainResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res =
                await updateAdminStoreDomain(
                    request
                );

            // API VALIDATION
            if (!res.success) {

                setError(res.message);

                throw new Error(
                    res.message
                );
            }

            setData(res);

            return res;

        } catch (err: any) {

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update store domain";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    return {
        fetchStoreDomain,
        updateStoreDomain,
        loading,
        data,
        error,
        clearError,
    };
};