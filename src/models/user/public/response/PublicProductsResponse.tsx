export interface PublicProductsResponse {
    success: boolean;
    message: string;
    data: Product[];
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  maxOrderQuantity: number;
  categoryId: string | null;
  imageThumbnail: string;
  imageUrls: string[];
  tags: string[];
  rating: number | null;
  reviewCount: number | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}