import { useState } from "react";
import type { VerifyUserResponse } from "../../models/user/auth/response/VerifyUserResponse";
import type { VerifyUserRequest } from "../../models/user/auth/request/VerifyUserRequest";
import { verifyUser } from "../../api/user/authUserApi";

export const useUserVerify = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<VerifyUserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verify = async (
    payload: VerifyUserRequest
  ): Promise<VerifyUserResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await verifyUser(payload);

      if (!res.success) {
        setError(res.message);
        throw new Error(res.message);
      }

      setData(res);
      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, data, error };
};