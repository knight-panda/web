// models/User.ts

export interface VerifyUserRequest {
  storeId: string;
  phone: string;
  otp: string;
}