import type { LoginUserRequest } from "../../models/user/auth/request/LoginUserRequest";
import type { RegisterUserRequest } from "../../models/user/auth/request/RegisterUserRequest";
import type { VerifyUserRequest } from "../../models/user/auth/request/VerifyUserRequest";
import type { RegisterUserResponse } from "../../models/user/auth/response/RegisterUserResponse";
import type { VerifyUserResponse } from "../../models/user/auth/response/VerifyUserResponse";
import apiClient from "../apiClient";

// ✅ API call
export const registerUser = async (
  payload: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  const response = await apiClient.post("/auth/user/register", payload);
  return response.data;
};

export const loginUser = async (
  payload: LoginUserRequest
): Promise<VerifyUserResponse> => {
  const response = await apiClient.post("/auth/user/login", payload);
  return response.data;
};

export const verifyUser = async (
  payload: VerifyUserRequest
): Promise<VerifyUserResponse> => {
  const response = await apiClient.post("/auth/user/verify", payload);
  return response.data;
};