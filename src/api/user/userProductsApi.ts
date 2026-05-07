import type { UserProductsResponse } from "../../models/user/products/response/UserProductsResponse";
import userApiClient from "../userApiClient";

// GET Store Product API
export const getUserProduct = async (): Promise<UserProductsResponse> => {
    const response = await userApiClient.get(`/user/products`);
    return response.data;
};