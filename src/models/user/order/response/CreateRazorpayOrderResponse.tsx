export interface CreateRazorpayOrderResponse {
  success: boolean;
  message: string;
  data: {
    razorpayOrderId: string;
    amount: number;
    currency: string;
    key: string;
  };
}