import type { StoreReelData } from "./StoreReelData";

export interface AdminStoreReelsResponse {
    success: boolean;
    message: string;
    data: StoreReelData[];
}