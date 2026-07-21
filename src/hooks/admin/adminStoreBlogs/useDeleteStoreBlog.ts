import { useState } from "react";
import { deleteStoreBlog } from "../../../api/admin/adminStoreBlogsApi";

export const useDeleteStoreBlog = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const removeBlog = async (
        blogId: string
    ) => {

        try {

            setLoading(true);

            setError("");

            await deleteStoreBlog(blogId);

            return true;

        } catch (error: any) {

            const message =
                error?.response?.data?.message ||
                "Failed to delete blog";

            setError(message);

            return false;

        } finally {

            setLoading(false);
        }
    };

    return {
        loading,
        error,
        removeBlog
    };
};