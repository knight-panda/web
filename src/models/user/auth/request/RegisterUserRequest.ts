// models/User.ts

export interface RegisterUserRequest {
  storeId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}