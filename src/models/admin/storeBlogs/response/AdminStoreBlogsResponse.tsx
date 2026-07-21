import type { StoreBlogsData } from "./StoreBlogsData";

export interface AdminStoreBlogsResponse {
    success: boolean;
    message: string;
    data: StoreBlogsData[];
}