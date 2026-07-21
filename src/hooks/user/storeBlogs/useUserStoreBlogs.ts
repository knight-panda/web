import { useState } from "react";
import type { StoreBlogsData } from "../../../models/admin/storeBlogs/response/StoreBlogsData";
import { getUserStoreBlogs } from "../../../api/user/userStoreBlogsApi";

export const useUserStoreBlogs = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [blogs, setBlogs] =
        useState<StoreBlogsData[]>([]);

    const fetchBlogs = async (
        storeId: string
    ) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getUserStoreBlogs(
                    storeId
                );

            if (response.success) {

                setBlogs(
                    response.data
                );

            } else {

                setError(
                    response.message
                );
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