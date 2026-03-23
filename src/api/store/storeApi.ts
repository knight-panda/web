import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import apiClient from "../apiClient";

// ✅ GET Store API
export const getSingleStore = async (): Promise<SingleStoreResponse> => {
  const response = await apiClient.get("/store");
  return response.data;
};