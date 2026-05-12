export interface UserOrderItemModel {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discountPrice: number;
  quantity: number;
  totalPrice: number;
  size: string | null;
  color: string | null;
}