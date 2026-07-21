import type { StoreCarouselRequest } from "../../models/store/carousel/request/StoreCarouselRequest";
import type { StoreCarouselDelResponse } from "../../models/store/carousel/response/StoreCarouselDelResponse";
import type { StoreCarouselResponse } from "../../models/store/carousel/response/StoreCarouselResponse";
import apiClient from "../apiClient";

// GET Store API
export const getStoreCarousel = async (): Promise<StoreCarouselResponse> => {
  const response = await apiClient.get("/store-carousels");
  return response.data;
};

// Create Store API
export const addStoreCarousel = async (
  payload: StoreCarouselRequest
): Promise<StoreCarouselResponse> => {
  const response = await apiClient.post("/store-carousels", payload);
  return response.data;
};

// UPDATE Store Carousel API
export const updateStoreCarousel = async (
  id: string,
  payload: StoreCarouselRequest
): Promise<StoreCarouselResponse> => {
  const response = await apiClient.put(`/store-carousels/${id}`, payload);
  return response.data;
};

// DELETE Store Carousel API
export const deleteStoreCarousel = async (
  id: string
): Promise<StoreCarouselDelResponse> => {
  const response = await apiClient.delete(`/store-carousels/${id}`);
  return response.data;
};