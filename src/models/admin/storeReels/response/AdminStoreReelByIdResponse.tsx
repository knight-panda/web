import type { StoreReelData } from "./StoreReelData";

export interface AdminStoreReelByIdResponse {
    success: boolean;
    message: string;
    data: StoreReelData;
}