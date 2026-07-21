import type { UpdateOrderStatusRequest } from "../../models/admin/order/request/UpdateOrderStatusRequest";
import type { GetUserOrderDetailsResponse } from "../../models/user/order/response/GetUserOrderDetailsResponse";
import type { GetUserOrdersResponse } from "../../models/user/order/response/GetUserOrdersResponse";
import adminApiClient from "../adminApiClient";

// Add To Cart API
export const getAdminOrders = async (): Promise<GetUserOrdersResponse> => {

    const response = await adminApiClient.get(
        "/admin/orders"
    );

    return response.data;
};

export const getAdminOrderDetails = async (
    orderId: string
): Promise<GetUserOrderDetailsResponse> => {

    const response = await adminApiClient.get(
        `/admin/orders/${orderId}`
    );

    return response.data;
};

// UPDATE ORDER STATUS
export const updateAdminOrderStatus = async (
    orderId: string,
    request: UpdateOrderStatusRequest
): Promise<GetUserOrderDetailsResponse> => {

    const response = await adminApiClient.put(
        `/admin/orders/${orderId}`,
        request
    );

    return response.data;
};