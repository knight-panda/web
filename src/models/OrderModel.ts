// Order status types
export type OrderStatus =
  "CONFIRMED"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED";


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

export interface OrderTrackingData {
  status: OrderStatus;
  courier: string;
  trackingId: string;
  trackingUrl: string;
}
