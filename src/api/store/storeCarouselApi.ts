import type { StoreCarouselResponse } from "../../models/store/carousel/response/StoreCarouselResponse";
import type { StoreRequest } from "../../models/store/request/StoreResponse";
import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import apiClient from "../apiClient";

// GET Store API
export const getStoreCarousel = async (): Promise<StoreCarouselResponse> => {
  const response = await apiClient.get("/store-carousels");
  return response.data;
};

// Create Store API
export const createStoreCarousel = async (
  payload: StoreRequest
): Promise<SingleStoreResponse> => {
  const response = await apiClient.post("/store-carousels", payload);
  return response.data;
};