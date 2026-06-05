import { useState } from "react";
import type { StoreBlogsData } from "../../../models/admin/storeBlogs/response/StoreBlogsData";
import { getStoreBlogById } from "../../../api/admin/adminStoreBlogsApi";

export const useStoreBlogById = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [blog, setBlog] =
        useState<StoreBlogsData | null>(null);

    const fetchBlog = async (
        blogId: string
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getStoreBlogById(blogId);

            if (response.success) {

                setBlog(response.data);

            } else {

                setError(response.message);
            }

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to fetch blog"
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        blog,
        fetchBlog
    };
};