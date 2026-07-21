import type { AdminStoreBlogsResponse } from "../../models/admin/storeBlogs/response/AdminStoreBlogsResponse";
import userApiClient from "../userApiClient";

// Get Blogs
export const getUserStoreBlogs = async (storeId: string): Promise<AdminStoreBlogsResponse> => {

    const response = await userApiClient.get(
        `/user/store-blogs/${storeId}`
    );

    return response.data;
};