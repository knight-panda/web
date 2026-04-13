import { useState } from "react";
import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import { getSinglePublicStore } from "../../api/user/publicStoreApi";

/* ================= GET STORE HOOK ================= */
export const usePublicStore = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SingleStoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = async (
    storeSlug: string
  ): Promise<SingleStoreResponse> => {
    try {
      setLoading(true);
      setError(null);

      // pass slug
      const res: SingleStoreResponse =
        await getSinglePublicStore(storeSlug);

      // handle API-level failure
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