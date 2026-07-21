import type { UserOrderModel } from "./UserOrderModel";

export interface GetUserOrdersResponse {
  success: boolean;
  message: string;
  data: UserOrderModel[];
}