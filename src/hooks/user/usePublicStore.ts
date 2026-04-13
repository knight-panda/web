import { useState } from "react";
import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import { getSinglePublicStore } from "../../api/user/publicStoreApi";
import type { PublicCarouselsResponse } from "../../models/user/public/response/PublicCarouselsResponse";
import { getPublicCarousel } from "../../api/user/publicStoreApi";
import type { PublicProductsResponse } from "../../models/user/public/response/PublicProductsResponse";
import { getPublicProduct } from "../../api/user/publicStoreApi";

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

export const usePublicCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PublicCarouselsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCarousel = async (storeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getPublicCarousel(storeId);

      if (!res.success) {
        throw new Error(res.message);
      }

      setData(res);
      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch carousel";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchCarousel, loading, data, error };
};

export const usePublicProducts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PublicProductsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (storeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getPublicProduct(storeId);

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

  return { fetchProducts, loading, data, error };
};