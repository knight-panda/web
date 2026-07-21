import type { StoreBlogsData } from "./StoreBlogsData";

export interface AdminStoreBlogIdResponse {
    success: boolean;
    message: string;
    data: StoreBlogsData;
}