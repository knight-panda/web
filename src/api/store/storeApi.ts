import type { StoreRequest } from "../../models/store/request/StoreResponse";
import type { SingleStoreResponse } from "../../models/store/response/SingleStoreResponse";
import apiClient from "../apiClient";

// ✅ GET Store API
export const getSingleStore = async (): Promise<SingleStoreResponse> => {
  const response = await apiClient.get("/store");
  return response.data;
};

// ✅ Create Store API
export const createAdminStore = async (
  payload: StoreRequest
): Promise<SingleStoreResponse> => {
  const response = await apiClient.post("/store", payload);
  return response.data;
};