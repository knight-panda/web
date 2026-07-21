import { useState } from "react";
import type { GetUserCoursesResponse } from "../../../models/user/course/response/GetUserCoursesResponse";
import { getUserCourses } from "../../../api/user/userCourseApi";

export const useGetUserCourses = () => {

    const [loading, setLoading] = useState(false);

    const [data, setData] =
        useState<GetUserCoursesResponse | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    const clearError = () => setError(null);

    const fetchUserCourses = async (
        storeId: string
    ): Promise<GetUserCoursesResponse> => {

        try {

            setLoading(true);
            setError(null);

            const res = await getUserCourses(storeId);

            if (!res.success) {
                setError(res.message);
                throw new Error(res.message);
            }

            setData({
                ...res,
                data: [...(res.data || [])],
            });

            return res;

        } catch (err: any) {

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch courses";

            setError(message);

            throw new Error(message);

        } finally {

            setLoading(false);

        }
    };

    return {
        fetchUserCourses,
        loading,
        data,
        error,
        clearError,
    };
};