import type { UserProductDetailsResponse } from "../../models/user/products/response/UserProductDetailsResponse";
import type { UserProductsResponse } from "../../models/user/products/response/UserProductsResponse";
import userApiClient from "../userApiClient";

// GET Store Product API
export const getUserProduct = async (): Promise<UserProductsResponse> => {
    const response = await userApiClient.get(`/user/products`);
    return response.data;
};

// GET Store Product Details API
export const getUserProductDetails = async (
    productId: string
): Promise<UserProductDetailsResponse> => {
    const response = await userApiClient.get(`/user/products/${productId}`);
    return response.data;
};