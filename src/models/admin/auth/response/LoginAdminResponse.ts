export interface LoginAdminResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    phone: string;
  };
}