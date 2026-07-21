import type { AdminStoreDomainRequest } from "../../models/admin/storeDomain/request/AdminStoreDomainRequest";
import type { AdminStoreDomainResponse } from "../../models/admin/storeDomain/response/AdminStoreDomainResponse";
import adminApiClient from "../adminApiClient";

// UPDATE STORE DOMAIN
export const updateAdminStoreDomain = async (
    request: AdminStoreDomainRequest
): Promise<AdminStoreDomainResponse> => {

    const response = await adminApiClient.put<
        AdminStoreDomainResponse
    >(
        "/admin/store-domain",
        request
    );

    return response.data;
};

// GET STORE DOMAIN
export const getAdminStoreDomain = async (
): Promise<AdminStoreDomainResponse> => {

    const response = await adminApiClient.get<
        AdminStoreDomainResponse
    >(
        "/admin/store-domain"
    );

    return response.data;
};