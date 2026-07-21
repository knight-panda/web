import type { CreateRazorpayOrderRequest } from "../../models/user/order/request/CreateRazorpayOrderRequest";
import type { UserOrderRequest } from "../../models/user/order/request/UserOrderRequest";
import type { CreateRazorpayOrderResponse } from "../../models/user/order/response/CreateRazorpayOrderResponse";
import type { CreateUserOrdersResponse } from "../../models/user/order/response/CreateUserOrdersResponse";
import type { GetUserOrderDetailsResponse } from "../../models/user/order/response/GetUserOrderDetailsResponse";
import type { GetUserOrdersResponse } from "../../models/user/order/response/GetUserOrdersResponse";
import userApiClient from "../userApiClient";

// Create To Order API
export const createRazorpayOrder = async (
    payload: CreateRazorpayOrderRequest
): Promise<CreateRazorpayOrderResponse> => {
    const response = await userApiClient.post(
        "/user/orders/create-razorpay-order",
        payload
    );
    return response.data;
};

// Create To Order API
export const createUserOrders = async (
    payload: UserOrderRequest
): Promise<CreateUserOrdersResponse> => {
    const response = await userApiClient.post(
        "/user/orders",
        payload
    );
    return response.data;
};

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