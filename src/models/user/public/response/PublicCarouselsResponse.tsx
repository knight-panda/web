export interface PublicCarouselsResponse {
    success: boolean;
    message: string;
    data: PublicCarousels[];
}

export interface PublicCarousels {
  imageUrl: string;
}