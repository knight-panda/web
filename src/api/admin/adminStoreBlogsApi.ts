import type { AdminStoreBlogsRequest } from "../../models/admin/storeBlogs/request/AdminStoreBlogsRequest";
import type { AdminStoreBlogIdResponse } from "../../models/admin/storeBlogs/response/AdminStoreBlogIdResponse";
import type { AdminStoreBlogsResponse } from "../../models/admin/storeBlogs/response/AdminStoreBlogsResponse";
import adminApiClient from "../adminApiClient";

// Create Blog
export const createStoreBlog = async (
    request: AdminStoreBlogsRequest
): Promise<AdminStoreBlogIdResponse> => {

    const response = await adminApiClient.post(
        "/admin/store-blogs",
        request
    );

    return response.data;
};

// Get Blogs
export const getStoreBlogs = async (): Promise<AdminStoreBlogsResponse> => {

    const response = await adminApiClient.get(
        "/admin/store-blogs"
    );

    return response.data;
};

// Update Blog
export const updateStoreBlog = async (
    blogId: string,
    request: AdminStoreBlogsRequest
): Promise<AdminStoreBlogIdResponse> => {

    const response = await adminApiClient.put(
        `/admin/store-blogs/${blogId}`,
        request
    );

    return response.data;
};

// Delete Blog
export const deleteStoreBlog = async (
    blogId: string
): Promise<void> => {

    await adminApiClient.delete(
        `/admin/store-blogs/${blogId}`
    );
};

// Get Blog
export const getStoreBlogById = async (
    blogId: string
): Promise<AdminStoreBlogIdResponse> => {

    const response = await adminApiClient.get(
        `/admin/store-blogs/${blogId}`
    );

    return response.data;
};