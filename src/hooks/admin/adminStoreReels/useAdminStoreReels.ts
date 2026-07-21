import { useState } from "react";
import { getStoreReels } from "../../../api/admin/adminStoreReelsApi";
import type { StoreReelData } from "../../../models/admin/storeReels/response/StoreReelData";

export const useAdminStoreReels = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [reels, setReels] = useState<StoreReelData[]>([]);

    const fetchReels = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getStoreReels();

            if (response.success) {

                setReels(response.data);

            } else {

                setError(response.message);
            }

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to fetch reels"
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        reels,
        fetchReels
    };
};