export interface CartItem {
  cartId: string;
  productId: string;
  variantId: string;
  productName: string;
  productImage: string;
  variantName: string;
  size?: string;
  color?: string;
  unitValue?: number;
  unitType?: string;
  productPrice: number;
  discountPrice: number;
  quantity: number;
  totalPrice: number;
  productStock: number;
  productMaxOrderStock: number;
}