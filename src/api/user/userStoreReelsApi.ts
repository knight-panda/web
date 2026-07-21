import type { AdminStoreReelsResponse } from "../../models/admin/storeReels/response/AdminStoreReelsResponse";
import userApiClient from "../userApiClient";

// Get Blogs
export const getUserStoreReels = async (storeId: string): Promise<AdminStoreReelsResponse> => {

    const response = await userApiClient.get(
        `/user/store-reels/${storeId}`
    );

    return response.data;
};