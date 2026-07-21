
export interface GetUserCoursesResponse {
    success: boolean;
    message: string;
    data: UserCourse[];
}

export interface UserCourse {
    courseId: string;
    storeId: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    price: number;
    discountedPrice: number;
    isFree: boolean;
    status: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}