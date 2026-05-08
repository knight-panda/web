import type { CartItem } from "./CartItem";

export interface GetCartResponse {
    success: boolean;
    message: string;
    data: GetCartData;
}

export interface GetCartData {
    // cart items
    items: CartItem[];
    // totals
    itemTotal: number;
    totalDiscount: number;
    packagingFee: number;
    deliveryFee: number;
    platformFee: number;
    codFee: number;
    gstAmount: number;
    grandTotal: number;
}