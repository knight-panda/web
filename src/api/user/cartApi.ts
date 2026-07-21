import userApiClient from "../userApiClient";

import type { AddToCartRequest } from "../../models/user/cart/request/AddToCartRequest";
import type { AddToCartResponse } from "../../models/user/cart/response/AddToCartResponse";
import type { GetCartResponse } from "../../models/user/cart/response/GetCartResponse";

// Add To Cart API
export const addToCart = async (
    payload: AddToCartRequest
): Promise<AddToCartResponse> => {

    const response = await userApiClient.post(
        "/cart",
        payload
    );

    return response.data;
};

// GET CART
export const getCart = async (): Promise<GetCartResponse> => {

    const response = await userApiClient.get(
        "/cart"
    );

    return response.data;
};