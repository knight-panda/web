export interface AdminStoreDomainResponse {
    success: boolean;
    message: string;
    data: StoreDomainData;
}

export interface StoreDomainData {
    storeId: string;
    storeName: string;
    storeDescription: string;
    domain: string;
    subdomain: string;
    logoUrl: string;
    faviconUrl: string;
    primaryColor: string;
    secondaryColor: string;
    isActive: boolean;
}