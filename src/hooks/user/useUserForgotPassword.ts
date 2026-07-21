import { useState } from "react";

import type { RegisterUserResponse } from "../../models/user/auth/response/RegisterUserResponse";
import { forgotPasswordUser } from "../../api/user/authUserApi";
import type { ForgotPasswordUserRequest } from "../../models/user/auth/request/ForgotPasswordUserRequest";

export const useUserForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] =
    useState<RegisterUserResponse | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  // ✅ Clear API error manually
  const clearError = () => {
    setError(null);
  };

  const forgotPassword = async (
    payload: ForgotPasswordUserRequest
  ): Promise<RegisterUserResponse> => {
    try {
      setLoading(true);

      // ✅ Clear old errors
      setError(null);

      const res = await forgotPasswordUser(payload);

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
    forgotPassword,
    loading,
    data,
    error,
    clearError,
  };
};