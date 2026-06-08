import { useState } from "react";

import { createStoreReel }
from "../../../api/admin/adminStoreReelsApi";

import type { AdminStoreReelRequest }
from "../../../models/admin/storeReels/request/AdminStoreReelRequest";

export const useAdminCreateStoreReel = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const createReel = async (
        request: AdminStoreReelRequest
    ) => {

        try {

            setLoading(true);

            setError("");

            return await createStoreReel(
                request
            );

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to create reel"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createReel
    };
};