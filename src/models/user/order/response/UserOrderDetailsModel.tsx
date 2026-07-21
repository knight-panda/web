import type { UserOrderItemModel } from "./UserOrderItemModel";

export interface UserOrderDetailsModel {

  // ORDER
  orderId: string;
  orderNumber: string;
  orderStatus: string;

  // PRICE DETAILS
  itemTotal: number;
  totalDiscount: number;
  packagingFee: number;
  deliveryFee: number;
  platformFee: number;
  codFee: number;
  gstAmount: number;
  grandTotal: number;

  // PAYMENT
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string | null;

  // CUSTOMER
  customerName: string;
  customerPhone: string;
  customerEmail: string;

  // ADDRESS
  deliveryAddress: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  // SHIPMENT
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;

  // EXTRA
  totalItems: number;
  note: string;

  // TIMELINE
  orderedAt: string;
  packedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  returnedAt: string | null;
  refundedAt: string | null;

  // ITEMS
  items: UserOrderItemModel[];
}