// models/RegisterResponse.ts

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  data: RegisterUserData;
}

export interface RegisterUserData {
  id: string;
  storeId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}