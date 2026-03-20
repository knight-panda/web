export interface AdminData {
  token: string;
  adminId: string;
  email: string;
  name: string;
}

export interface VerifyAdminResponse {
  success: boolean;
  message: string;
  data: AdminData;
}