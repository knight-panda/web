import { useState } from "react";
import { getPublicProductDetails } from "../../api/user/publicStoreApi";
import type { UserProductDetailsResponse } from "../../models/user/products/response/UserProductDetailsResponse";

export const usePublicProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserProductDetailsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = async (storeId: string, productId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getPublicProductDetails(storeId, productId);

      if (!res.success) {
        throw new Error(res.message);
      }

      setData(res);
      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch products";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchProductDetails, loading, data, error };
};