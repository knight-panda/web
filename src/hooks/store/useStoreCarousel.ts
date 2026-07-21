import { useState } from "react";
import type { StoreCarouselResponse } from "../../models/store/carousel/response/StoreCarouselResponse";
import { addStoreCarousel, getStoreCarousel } from "../../api/store/storeCarouselApi";
import type { StoreCarouselRequest } from "../../models/store/carousel/request/StoreCarouselRequest";
import { updateStoreCarousel } from "../../api/store/storeCarouselApi";
import { deleteStoreCarousel } from "../../api/store/storeCarouselApi";
import type { StoreCarouselDelResponse } from "../../models/store/carousel/response/StoreCarouselDelResponse";

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

export const useAddStoreCarousel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreCarouselResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createStoreCarousel = async (
    payload: StoreCarouselRequest
  ): Promise<StoreCarouselResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: StoreCarouselResponse = await addStoreCarousel(payload);

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
        "Failed to create store carousel";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createStoreCarousel,
    loading,
    data,
    error,
  };
};

export const useUpdateStoreCarousel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreCarouselResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const editStoreCarousel = async (
    id: string,
    payload: StoreCarouselRequest
  ): Promise<StoreCarouselResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await updateStoreCarousel(id, payload);

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
        "Failed to update store carousel";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    editStoreCarousel,
    loading,
    data,
    error,
  };
};

export const useDeleteStoreCarousel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreCarouselDelResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const removeStoreCarousel = async (
    id: string
  ): Promise<StoreCarouselDelResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res: StoreCarouselDelResponse = await deleteStoreCarousel(id);

      // API-level failure handling
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
        "Failed to delete store carousel";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    removeStoreCarousel,
    loading,
    data,
    error,
  };
};
