// Order status types
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "arrived"
  | "cancelled";


// Product inside order
export interface OrderItemModel {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}


// Main order
export interface OrderModel {
  orderId: string;
  totalAmount: number;
  date: string;
  deliveryTime: string;
  status: OrderStatus;
  items: OrderItemModel[];
}
