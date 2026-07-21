// models/User.ts

export interface LoginUserRequest {
  storeId: string;
  phone: string;
  password: string;
}