export interface StoreProductRequest {
  name: string;
  description: string;
  category: string;
  categoryId: string;
  imageThumbnail: string;
  imageUrls: string[];
  tags: string[];
  variants: StoreProductVariantRequest[];
}

export interface StoreProductVariantRequest {
  variantName: string;
  size?: string;
  color?: string;
  unitValue?: number;
  unitType?: string;
  sku: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  maxOrderQuantity: number;
}