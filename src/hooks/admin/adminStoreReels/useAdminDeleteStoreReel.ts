import { useState } from "react";
import { deleteStoreReel } from "../../../api/admin/adminStoreReelsApi";

export const useAdminDeleteStoreReel = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const removeReel = async (
        reelId: string
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await deleteStoreReel(
                    reelId
                );

            return response.success;

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to delete reel"
            );

            return false;

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        removeReel
    };
};