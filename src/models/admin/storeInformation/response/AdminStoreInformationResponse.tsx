export interface AdminStoreInformationResponse {
    success: boolean;
    message: string;
    data: StoreInformation;
}

export interface StoreInformation {
    id: string;
    storeId: string;
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    youtubeUrl: string;
    linkedinUrl: string;
    whatsappNumber: string;
    privacyPolicy: string;
    refundPolicy: string;
    shippingPolicy: string;
    termsAndConditions: string;
    supportEmail: string;
    supportPhone: string;
    supportAddress: string;
    footerDescription: string;
    storeAddress: string;
    storeLandmark: string;
    storeCity: string;
    storeState: string;
    storeCountry: string;
    storePincode: string;
    googleMapLink: string;
    createdAt: string;
    updatedAt: string;
}