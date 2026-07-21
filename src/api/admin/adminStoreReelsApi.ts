import type { AdminStoreReelRequest } from "../../models/admin/storeReels/request/AdminStoreReelRequest";
import type { AdminDeleteStoreReelResponse } from "../../models/admin/storeReels/response/AdminDeleteStoreReelResponse";
import type { AdminStoreReelByIdResponse } from "../../models/admin/storeReels/response/AdminStoreReelByIdResponse";
import type { AdminStoreReelsResponse } from "../../models/admin/storeReels/response/AdminStoreReelsResponse";
import adminApiClient from "../adminApiClient";

// Create Reel
export const createStoreReel = async (
    request: AdminStoreReelRequest
): Promise<AdminStoreReelByIdResponse> => {

    const response = await adminApiClient.post(
        "/admin/store-reels",
        request
    );

    return response.data;
};

// Get Reels
export const getStoreReels = async (): Promise<AdminStoreReelsResponse> => {

    const response = await adminApiClient.get(
        "/admin/store-reels"
    );

    return response.data;
};

// Update Reel
export const updateStoreReel = async (
    reelId: string,
    request: AdminStoreReelRequest
): Promise<AdminStoreReelByIdResponse> => {

    const response = await adminApiClient.put(
        `/admin/store-reels/${reelId}`,
        request
    );

    return response.data;
};

// Delete Reel
export const deleteStoreReel = async (
    reelId: string
): Promise<AdminDeleteStoreReelResponse> => {

    const response = await adminApiClient.delete(
        `/admin/store-reels/${reelId}`
    );

    return response.data;
};

// Get Reel By Id
export const getStoreReelById = async (
    reelId: string
): Promise<AdminStoreReelByIdResponse> => {

    const response = await adminApiClient.get(
        `/admin/store-reels/${reelId}`
    );

    return response.data;
};