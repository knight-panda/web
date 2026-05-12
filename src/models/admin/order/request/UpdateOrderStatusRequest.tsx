import type { OrderStatus } from "../../../../components/order/OrderStatusDialog";

export interface UpdateOrderStatusRequest {
    orderStatus: OrderStatus;
    paymentStatus: string;
    courierName: string;
    trackingNumber: string;
    trackingUrl: string;
    note: string;
}