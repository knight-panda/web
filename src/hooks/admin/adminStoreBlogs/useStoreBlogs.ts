import { useState } from "react";
import type { StoreBlogsData } from "../../../models/admin/storeBlogs/response/StoreBlogsData";
import { getStoreBlogs } from "../../../api/admin/adminStoreBlogsApi";

export const useStoreBlogs = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [blogs, setBlogs] =
        useState<StoreBlogsData[]>([]);

    const fetchBlogs = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getStoreBlogs();

            if (response.success) {

                setBlogs(response.data);

            } else {

                setError(response.message);
            }

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to fetch blogs"
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        blogs,
        fetchBlogs
    };
};