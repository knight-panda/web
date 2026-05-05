import { useState } from "react";
import type { LoginUserRequest } from "../../models/user/auth/request/LoginUserRequest";
import type { VerifyUserResponse } from "../../models/user/auth/response/VerifyUserResponse";
import { loginUser } from "../../api/user/authUserApi";

export const useUserLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<VerifyUserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getStoreTokens = () => {
    try {
      return JSON.parse(localStorage.getItem("storeTokens") || "{}");
    } catch {
      return {};
    }
  };

  const login = async (
    payload: LoginUserRequest
  ): Promise<VerifyUserResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginUser(payload);

      if (!res.success) {
        setError(res.message);
        throw new Error(res.message);
      }

      // ✅ Safe token storage
      if (res.data?.storeId && res.data?.token) {
        const storeTokens = getStoreTokens();

        storeTokens[res.data.storeId] = res.data.token;

        localStorage.setItem("storeTokens", JSON.stringify(storeTokens));
        localStorage.setItem("activeStoreId", res.data.storeId);
      }

      setData(res);
      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, data, error };
};