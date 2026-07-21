
export interface StoreCarouselResponse {
    success: boolean;
    message: string;
    data: StoreCarousel;
}

export interface StoreCarousel {
    id: string;
    storeId: string;
    title: string | null;
    imageUrl: string;
    redirectType: string | null;
    redirectId: string | null;
    redirectUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}