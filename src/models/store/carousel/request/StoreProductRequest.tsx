export interface StoreProductRequest {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  maxOrderStock: number;
  imageThumbnail: string;
  imageUrls: string[];
  tags: string[];
}