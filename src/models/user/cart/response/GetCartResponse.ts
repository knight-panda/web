import type { CartItem } from "./CartItem";

export interface GetCartResponse {
    success: boolean;
    message: string;
    data: GetCartData;
}

export interface GetCartData {
    items: CartItem[];
    grandTotal: number;
}