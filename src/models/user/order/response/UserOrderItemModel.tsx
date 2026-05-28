export interface UserOrderItemModel {
  // PRODUCT
  productId: string;
  productName: string;
  productImage: string;
  // VARIANT
  variantId: string;
  variantName: string;
  unitValue: number | null;
  unitType: string | null;
  sku: string | null;
  size: string | null;
  color: string | null;
  // PRICE
  productPrice: number;
  discountPrice: number;
  quantity: number;
  totalPrice: number;
  // STOCK
  maxOrderQuantity: number | null;
}