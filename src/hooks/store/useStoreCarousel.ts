import { useState } from "react";
import type { StoreCarouselResponse } from "../../models/store/carousel/response/StoreCarouselResponse";
import { getStoreCarousel } from "../../api/store/storeCarouselApi";

/* ================= GET STORE HOOK ================= */
export const useGetStoreCarousel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreCarouselResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStoreCarousel = async (): Promise<StoreCarouselResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: StoreCarouselResponse = await getStoreCarousel();

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
    fetchStoreCarousel,
    loading,
    data,
    error,
  };
};
