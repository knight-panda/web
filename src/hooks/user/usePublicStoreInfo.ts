import { useState } from "react";
import type { AdminStoreInformationResponse } from "../../models/admin/storeInformation/response/AdminStoreInformationResponse";
import { getPublicStoreInfo } from "../../api/user/publicStoreApi";

export const usePublicStoreInfo = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AdminStoreInformationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchCarousel = async (storeId: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await getPublicStoreInfo(storeId);

            if (!res.success) {
                throw new Error(res.message);
            }

            setData(res);
            return res;
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch carousel";

            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchCarousel, loading, data, error };
};