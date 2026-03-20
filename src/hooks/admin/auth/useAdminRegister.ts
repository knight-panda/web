import { useState } from "react";
import type { RegisterAdminRequest } from "../../../models/admin/auth/request/RegisterAdminRequest";
import type { RegisterAdminResponse } from "../../../models/admin/auth/response/RegisterAdminResponse";
import type { VerifyAdminResponse } from "../../../models/admin/auth/response/VerifyAdminResponse";
import type { VerifyAdminRequest } from "../../../models/admin/auth/request/VerifyAdminRequest";

import {
  loginAdmin,
  registerAdmin,
  verifyRegisterAdmin,
  verifyLoginAdmin
} from "../../../api/admin/authAdminApi";
import type { LoginAdminRequest } from "../../../models/admin/auth/request/LoginAdminRequest";
import type { LoginAdminResponse } from "../../../models/admin/auth/response/LoginAdminResponse";

/* ================= REGISTER HOOK ================= */
export const useAdminRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RegisterAdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    payload: RegisterAdminRequest
  ): Promise<RegisterAdminResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: RegisterAdminResponse = await registerAdmin(payload);

      // ✅ handle API-level failure
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
        "Registration failed";

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
  };
};

/* ================= VERIFY OTP HOOK ================= */
export const useVerifyAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<VerifyAdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyAdmin = async (
    payload: VerifyAdminRequest
  ): Promise<VerifyAdminResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: VerifyAdminResponse = await verifyRegisterAdmin(payload);

      // ✅ handle API-level failure
      if (!res.success) {
        setError(res.message);
        throw new Error(res.message);
      }

      setData(res);

      // ✅ store token ONLY after verification (correct flow)
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("adminId", res.data.adminId);
      }

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

  return {
    verifyAdmin,
    loading,
    data,
    error,
  };
};

/* ================= LOGIN HOOK ================= */
export const useAdminLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoginAdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    payload: LoginAdminRequest
  ): Promise<LoginAdminResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: LoginAdminResponse = await loginAdmin(payload);

      // ✅ handle API-level failure
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
        "Registration failed";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    data,
    error,
  };
};

/* ================= VERIFY OTP HOOK ================= */
export const useVerifyLoginAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<VerifyAdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyLogin = async (
    payload: VerifyAdminRequest
  ): Promise<VerifyAdminResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: VerifyAdminResponse = await verifyLoginAdmin(payload);

      // ✅ handle API-level failure
      if (!res.success) {
        setError(res.message);
        throw new Error(res.message);
      }

      setData(res);

      // ✅ store token ONLY after verification (correct flow)
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("adminId", res.data.adminId);
      }

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

  return {
    verifyLogin,
    loading,
    data,
    error,
  };
};