import type { UserOrderItemModel } from "./UserOrderItemModel";

export interface UserOrderModel {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
  grandTotal: number;
  totalItems: number;
  orderedAt: string;
  items: UserOrderItemModel[];
}