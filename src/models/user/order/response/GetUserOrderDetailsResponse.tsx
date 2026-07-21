import type { UserOrderDetailsModel } from "./UserOrderDetailsModel";

export interface GetUserOrderDetailsResponse {
  success: boolean;
  message: string;
  data: UserOrderDetailsModel;
}