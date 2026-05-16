import type { AdminStoreInformationRequest } from "../../models/admin/storeInformation/request/AdminStoreInformationRequest";
import type { AdminStoreInformationResponse } from "../../models/admin/storeInformation/response/AdminStoreInformationResponse";
import adminApiClient from "../adminApiClient";

// Update Store Information
export const updateAdminStoreInformation = async (
    request: AdminStoreInformationRequest
): Promise<AdminStoreInformationResponse> => {

    const response = await adminApiClient.put(
        "/admin/store-information",
        request
    );

    return response.data;
};

export const getAdminStoreInformation = async (): Promise<AdminStoreInformationResponse> => {

    const response = await adminApiClient.get(
        `/admin/store-information`
    );

    return response.data;
};