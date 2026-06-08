import { useState } from "react";

import { getStoreReelById } from "../../../api/admin/adminStoreReelsApi";
import type { StoreReelData } from "../../../models/admin/storeReels/response/StoreReelData";

export const useAdminStoreReelById = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [reel, setReel] =
        useState<StoreReelData | null>(null);

    const fetchReel = async (
        reelId: string
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getStoreReelById(
                    reelId
                );

            if (response.success) {

                setReel(
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
                "Failed to fetch reel"
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        reel,
        fetchReel
    };
};