import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import apiClient from "../apiClient";

// ✅ GET Store API
export const getSinglePublicStore = async (
  storeSlug: string
): Promise<SingleStoreResponse> => {
  const response = await apiClient.get(`/public/store/${storeSlug}`);
  return response.data;
};