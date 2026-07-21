import type { AdminStoreSettingsRequest } from "../../models/admin/storeSettings/request/AdminStoreSettingsRequest";
import type { AdminStoreSettingsResponse } from "../../models/admin/storeSettings/response/AdminStoreSettingsResponse";
import adminApiClient from "../adminApiClient";

// Update Store Settings
export const updateAdminStoreSettings = async (
    request: AdminStoreSettingsRequest
): Promise<AdminStoreSettingsResponse> => {

    const response = await adminApiClient.put(
        "/admin/store-settings",
        request
    );

    return response.data;
};

export const getAdminStoreSettings = async (): Promise<AdminStoreSettingsResponse> => {

    const response = await adminApiClient.get(
        `/admin/store-settings`
    );

    return response.data;
};