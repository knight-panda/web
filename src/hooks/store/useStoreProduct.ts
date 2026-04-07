import { useState } from "react";
import {
  getStoreProducts,
  addStoreProduct,
  updateStoreProduct,
  deleteStoreProduct,
  uploadProductImages,
} from "../../api/store/storeProductApi";
import type { StoreProductResponse } from "../../models/store/carousel/response/StoreProductResponse";
import type { StoreProductRequest } from "../../models/store/carousel/request/StoreProductRequest";

/* ================= GET STORE HOOK ================= */
export const useGetStoreProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreProductResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStoreProducts = async (): Promise<StoreProductResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await getStoreProducts();

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
        "Failed to fetch products";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchStoreProducts, loading, data, error };
};

export const useAddStoreProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreProductResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createStoreProduct = async (
    payload: StoreProductRequest
  ): Promise<StoreProductResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await addStoreProduct(payload);

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
        "Failed to create product";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createStoreProduct, loading, data, error };
};

export const useUpdateStoreProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreProductResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const editStoreProduct = async (
    id: string,
    payload: StoreProductRequest
  ): Promise<StoreProductResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await updateStoreProduct(id, payload);

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
        "Failed to update product";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { editStoreProduct, loading, data, error };
};

export const useDeleteStoreProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StoreProductResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const removeStoreProduct = async (
    id: string
  ): Promise<StoreProductResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await deleteStoreProduct(id);

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
        "Failed to delete product";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { removeStoreProduct, loading, data, error };
};

export const useUploadProductImages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      setLoading(true);
      setError(null);

      if (!files || files.length === 0) {
        throw new Error("No files selected");
      }

      const res = await uploadProductImages(files);

      if (!Array.isArray(res)) {
        throw new Error("Invalid response format");
      }

      setData(res);

      return res;

    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Image upload failed";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImages,
    loading,
    data,
    error,
  };
};