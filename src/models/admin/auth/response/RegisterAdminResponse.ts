export interface RegisterAdminResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    phone: string;
  };
}