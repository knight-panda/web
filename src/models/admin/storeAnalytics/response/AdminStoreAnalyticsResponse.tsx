export interface AdminStoreAnalyticsResponse {
    success: boolean;
    message: string;
    data: DailyStoreAnalyticsModel[];
}


export interface DailyStoreAnalyticsModel {
    dailyAnalyticsId: string;
    storeId: string;

    date: string;

    visitors: number;
    orders: number;
    customers: number;

    addToCart: number;
    productViews: number;

    revenue: number;
    profit: number;

    createdAt: string;
    updatedAt: string;
}