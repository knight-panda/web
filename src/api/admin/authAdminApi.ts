import type { LoginAdminRequest } from "../../models/admin/auth/request/LoginAdminRequest";
import type { RegisterAdminRequest } from "../../models/admin/auth/request/RegisterAdminRequest";
import type { VerifyAdminRequest } from "../../models/admin/auth/request/VerifyAdminRequest";
import type { LoginAdminResponse } from "../../models/admin/auth/response/LoginAdminResponse";
import type { RegisterAdminResponse } from "../../models/admin/auth/response/RegisterAdminResponse";
import type { VerifyAdminResponse } from "../../models/admin/auth/response/VerifyAdminResponse";
import apiClient from "../apiClient";

// ✅ API call
export const registerAdmin = async (
  payload: RegisterAdminRequest
): Promise<RegisterAdminResponse> => {
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
};

export const verifyRegisterAdmin = async (
  payload: VerifyAdminRequest
): Promise<VerifyAdminResponse> => {
  const response = await apiClient.post("/auth/verify-register-otp", payload);
  return response.data;
};

export const loginAdmin = async (
  payload: LoginAdminRequest
): Promise<LoginAdminResponse> => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};

export const verifyLoginAdmin = async (
  payload: VerifyAdminRequest
): Promise<VerifyAdminResponse> => {
  const response = await apiClient.post("/auth/verify-login-otp", payload);
  return response.data;
};