import type { GetUserCoursesResponse } from "../../models/user/course/response/GetUserCoursesResponse";
import userApiClient from "../userApiClient";

export const getUserCourses = async (
    storeId: string
): Promise<GetUserCoursesResponse> => {

    const response = await userApiClient.get(
        `/public/store-courses/${storeId}`
    );

    return response.data;
};