export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: CartItemData;
}

export interface CartItemData {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}