import { useState } from "react";
import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import { getSingleStore } from "../../api/store/storeApi";

/* ================= GET STORE HOOK ================= */
export const useStore = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SingleStoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = async (): Promise<SingleStoreResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: SingleStoreResponse = await getSingleStore();

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
        "Failed to fetch store";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchStore,
    loading,
    data,
    error,
  };
};