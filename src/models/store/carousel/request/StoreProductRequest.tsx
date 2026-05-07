export interface StoreProductRequest {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  maxOrderQuantity: number;
  imageThumbnail: string;
  imageUrls: string[];
  tags: string[];
}