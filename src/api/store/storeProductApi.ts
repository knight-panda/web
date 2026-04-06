import type { StoreProductRequest } from "../../models/store/carousel/request/StoreProductRequest";
import type { StoreProductResponse } from "../../models/store/carousel/response/StoreProductResponse";
import apiClient from "../apiClient";

// GET Store API
export const getStoreProducts = async (): Promise<StoreProductResponse> => {
  const response = await apiClient.get("/store-products");
  return response.data;
};

// Create Store API
export const addStoreProduct = async (
  payload: StoreProductRequest
): Promise<StoreProductResponse> => {
  const response = await apiClient.post("/store-products", payload);
  return response.data;
};

// UPDATE Store Carousel API
export const updateStoreProduct = async (
  id: string,
  payload: StoreProductRequest
): Promise<StoreProductResponse> => {
  const response = await apiClient.put(`/store-products/${id}`, payload);
  return response.data;
};

// DELETE Store Carousel API
export const deleteStoreProduct = async (
  id: string
): Promise<StoreProductResponse> => {
  const response = await apiClient.delete(`/store-products/${id}`);
  return response.data;
};