import type { AdminUpdateRequest } from "../../models/admin/auth/request/AdminUpdateRequest";
import type { AdminResponse } from "../../models/admin/auth/response/AdminResponse";
import adminApiClient from "../adminApiClient";

export const getAdminProfile =
    async (): Promise<AdminResponse> => {

        const response =
            await adminApiClient.get(
                "/admin/get-profile"
            );

        return response.data;
    };

export const updateProfile = async (
    request: AdminUpdateRequest
): Promise<AdminResponse> => {

    const response =
        await adminApiClient.put(
            "/admin/update-profile",
            request
        );

    return response.data;
};