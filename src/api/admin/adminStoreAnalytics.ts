import type { AdminStoreAnalyticsResponse } from "../../models/admin/storeAnalytics/response/AdminStoreAnalyticsResponse";
import adminApiClient from "../adminApiClient";

export const getAdminStoreAnalytics = async (
    days: number = 7
): Promise<AdminStoreAnalyticsResponse> => {

    const response = await adminApiClient.get(
        `/admin/store-analytics?days=${days}`
    );

    return response.data;
};