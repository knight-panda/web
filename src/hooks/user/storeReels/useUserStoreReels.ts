import { useState } from "react";
import type { StoreReelData } from "../../../models/admin/storeReels/response/StoreReelData";
import { getUserStoreReels } from "../../../api/user/userStoreReelsApi";

export const useUserStoreReels = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [reels, setReels] =
        useState<StoreReelData[]>([]);

    const fetchReels = async (
        storeId: string
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getUserStoreReels(
                    storeId
                );

            if (response.success) {

                setReels(
                    response.data
                );

            } else {

                setError(
                    response.message
                );
            }

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to fetch blogs"
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