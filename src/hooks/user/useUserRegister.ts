import { useState } from "react";

import type { RegisterUserRequest } from "../../models/user/auth/request/RegisterUserRequest";
import type { RegisterUserResponse } from "../../models/user/auth/response/RegisterUserResponse";

import { registerUser } from "../../api/user/authUserApi";

export const useUserRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] =
    useState<RegisterUserResponse | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  // ✅ Clear API error manually
  const clearError = () => {
    setError(null);
  };

  const register = async (
    payload: RegisterUserRequest
  ): Promise<RegisterUserResponse> => {
    try {
      setLoading(true);

      // ✅ Clear old errors
      setError(null);

      const res = await registerUser(payload);

      // ✅ API-level validation
      if (!res.success) {
        setError(res.message);

        throw new Error(res.message);
      }

      // ✅ Save response
      setData(res);

      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "User registration failed";

      setError(message);

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    data,
    error,
    clearError,
  };
};