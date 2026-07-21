import type { UserOrderModel } from "./UserOrderModel";

export interface CreateUserOrdersResponse {
  success: boolean;
  message: string;
  data: UserOrderModel;
}