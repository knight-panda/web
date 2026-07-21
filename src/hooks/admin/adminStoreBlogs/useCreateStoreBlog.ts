import { useState } from "react";
import type { AdminStoreBlogsRequest } from "../../../models/admin/storeBlogs/request/AdminStoreBlogsRequest";
import { createStoreBlog } from "../../../api/admin/adminStoreBlogsApi";

export const useCreateStoreBlog = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const createBlog = async (
        request: AdminStoreBlogsRequest
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await createStoreBlog(request);

            return response;

        } catch (error: any) {

            const message =
                error?.response?.data?.message ||
                "Failed to create blog";

            setError(message);

            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createBlog
    };
};