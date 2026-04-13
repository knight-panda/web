import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import type { PublicCarouselsResponse } from "../../models/user/public/response/PublicCarouselsResponse";
import type { PublicProductsResponse } from "../../models/user/public/response/PublicProductsResponse";
import apiClient from "../apiClient";

// GET Store API
export const getSinglePublicStore = async (
  storeSlug: string
): Promise<SingleStoreResponse> => {
  const response = await apiClient.get(`/public/store/${storeSlug}`);
  return response.data;
};

// GET Store Carousel API
export const getPublicCarousel = async (
  storeId: string
): Promise<PublicCarouselsResponse> => {
  const response = await apiClient.get(`/public/store-carousels/${storeId}`);
  return response.data;
};

// GET Store Product API
export const getPublicProduct = async (
  storeId: string
): Promise<PublicProductsResponse> => {
  const response = await apiClient.get(`/public/store-products/${storeId}`);
  return response.data;
};