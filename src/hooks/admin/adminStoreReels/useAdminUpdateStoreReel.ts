import { useState } from "react";
import { updateStoreReel } from "../../../api/admin/adminStoreReelsApi";
import type { AdminStoreReelRequest } from "../../../models/admin/storeReels/request/AdminStoreReelRequest";

export const useAdminUpdateStoreReel = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updateReel = async (
        reelId: string,
        request: AdminStoreReelRequest
    ) => {

        try {

            setLoading(true);

            setError("");

            return await updateStoreReel(
                reelId,
                request
            );

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to update reel"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        updateReel
    };
};