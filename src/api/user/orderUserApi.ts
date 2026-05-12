import type { GetUserOrderDetailsResponse } from "../../models/user/order/response/GetUserOrderDetailsResponse";
import type { GetUserOrdersResponse } from "../../models/user/order/response/GetUserOrdersResponse";
import userApiClient from "../userApiClient";

// Add To Cart API
export const getUserOrders = async (): Promise<GetUserOrdersResponse> => {

    const response = await userApiClient.get(
        "/user/orders"
    );

    return response.data;
};

export const getUserOrderDetails = async (
    orderId: string
): Promise<GetUserOrderDetailsResponse> => {

    const response = await userApiClient.get(
        `/user/orders/${orderId}`
    );

    return response.data;
};