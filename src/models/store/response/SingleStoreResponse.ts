import type { AdminDataResponse } from "../../admin/auth/response/AdminDataResponse";

export interface SingleStoreResponse {
  success: boolean;
  message: string;
  data: Store;
}

export interface Store {
  id: string;
  storeName: string;
  storeDescription: string;
  storeSlug: string;

  logoUrl: string;
  faviconUrl: string;
  domain: string;
  subdomain: string;

  currency: string;
  timezone: string;

  primaryColor: string;
  secondaryColor: string;
  themeName: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  adminData: AdminDataResponse;
}