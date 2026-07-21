import { useState } from "react";
import type { AdminStoreBlogsRequest } from "../../../models/admin/storeBlogs/request/AdminStoreBlogsRequest";
import { updateStoreBlog } from "../../../api/admin/adminStoreBlogsApi";

export const useUpdateStoreBlog = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const updateBlog = async (
        blogId: string,
        request: AdminStoreBlogsRequest
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await updateStoreBlog(
                    blogId,
                    request
                );

            return response;

        } catch (error: any) {

            const message =
                error?.response?.data?.message ||
                "Failed to update blog";

            setError(message);

            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        updateBlog
    };
};