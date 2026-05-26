export interface UserProductDetailsResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  category: string;
  categoryId: string | null;
  imageThumbnail: string;
  imageUrls: string[];
  tags: string[];
  rating: number | null;
  reviewCount: number | null;
  variants: ProductVariant[];
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  variantId: string;
  variantName: string;
  size?: string;
  color?: string;
  unitValue?: number;
  unitType?: string;
  sku: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  cartQuantity: number;
  maxOrderQuantity: number;
  createdAt: string;
}