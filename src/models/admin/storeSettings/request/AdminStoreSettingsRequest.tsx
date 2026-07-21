export interface AdminStoreSettingsRequest {
    deliveryFee: number;
    freeDeliveryAbove: number;
    minimumOrderAmount: number;
    packagingFee: number;
    gstPercentage: number;
    codEnabled: boolean;
    codFee: number;
    onlinePaymentEnabled: boolean;
    bankName: string;
    accountHolderName: string;
    bankAccountNumber: string;
    ifscCode: string;
    isActive: boolean;
}