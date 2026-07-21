export interface AdminStoreSettingsResponse {
    success: boolean;
    message: string;
    data: StoreSettingsData;
}

export interface StoreSettingsData {
    id: string;
    totalRevenue: number;
    withdrawAmount: number;
    withdrawNote: string;
    deliveryFee: number;
    freeDeliveryAbove: number;
    minimumOrderAmount: number;
    packagingFee: number;
    platformFee: number;
    gstPercentage: number;
    codEnabled: boolean;
    codFee: number;
    onlinePaymentEnabled: boolean;
    bankName: string;
    accountHolderName: string;
    bankAccountNumber: string;
    ifscCode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}