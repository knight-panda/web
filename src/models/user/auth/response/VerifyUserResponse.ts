// models/RegisterResponse.ts

export interface VerifyUserResponse {
  success: boolean;
  message: string;
  data: VerifyUserData;
}

export interface VerifyUserData {
  id: string;
  storeId: string;
  name: string;
  email: string;
  phone: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}