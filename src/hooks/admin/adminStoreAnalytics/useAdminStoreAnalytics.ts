import { useState } from "react";

import { getAdminStoreAnalytics }
from "../../../api/admin/adminStoreAnalytics";
import type { DailyStoreAnalyticsModel } from "../../../models/admin/storeAnalytics/response/AdminStoreAnalyticsResponse";

export const useStoreAnalytics = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [analytics, setAnalytics] =
        useState<DailyStoreAnalyticsModel[]>([]);

    const fetchAnalytics = async (
        days: number = 7
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getAdminStoreAnalytics(days);

            if (response.success) {

                setAnalytics(response.data);

            } else {

                setError(response.message);
            }

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to fetch analytics"
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        analytics,
        fetchAnalytics
    };
};