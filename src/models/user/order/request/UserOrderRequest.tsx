export interface UserOrderRequest {
    paymentMethod: string;
    note?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
}